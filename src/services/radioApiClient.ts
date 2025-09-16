import axios from "axios"
import type { AxiosRequestConfig } from "axios"

// API endpoints
const DIRECT_API_BASE = "https://de1.api.radio-browser.info/json"
const BACKEND_API_BASE = "/api/radio"

// Shared global state
let useBackend = true
let lastHealthCheck = 0
const HEALTH_CHECK_TTL = 60 * 60 * 1000 // 1 hour

//*====== Health Check ======*
const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/radio/health', {
      signal: AbortSignal.timeout(3000)
    })
    return response.ok
  } catch (error) {
    console.log('Backend health check failed:', error)
    return false
  }
}

//*====== Get API Base ======*
const getApiBase = async (): Promise<string> => {
  const now = Date.now()

  if (useBackend && (now - lastHealthCheck > HEALTH_CHECK_TTL || lastHealthCheck === 0)) {
    const isBackendHealthy = await checkBackendHealth()
    useBackend = isBackendHealthy
    lastHealthCheck = now
  }

  return useBackend ? BACKEND_API_BASE : DIRECT_API_BASE
}

//*====== Helper with Retry & Fallback ======*
const getWithRetry = async <T>(
  endpoint: string,
  config?: AxiosRequestConfig,
  retries = 3,
  baseDelay = 1000
): Promise<T> => {
  try {
    const apiBase = await getApiBase()
    const res = await axios.get<T>(`${apiBase}${endpoint}`, {
      ...config,
      timeout: 8000
    })
    return res.data

  } catch (error: unknown) {
    // Handle cancelations
    if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') {
      throw error
    }

    //* Retry on rate limits (429) or server errors (5xx)
    if (retries > 0 && axios.isAxiosError(error)) {
      const status = error.response?.status
      if (status === 429 || (status && status >= 500)) {
        const delay = baseDelay * Math.pow(2, 3 - retries) //* Exponential: 1s, 2s, 4s
        console.log(`Retrying in ${delay}ms... (${retries} attempts left)`)
        await new Promise(resolve => setTimeout(resolve, delay))
        return getWithRetry<T>(endpoint, config, retries - 1, baseDelay)
      }
    }

    //* Fallback to direct API for network errors (no response)
    if (useBackend && axios.isAxiosError(error) && !error.response) {
      console.log('Switching to direct API after retries failed')
      useBackend = false
      return getWithRetry<T>(endpoint, config, retries, baseDelay)
    }

    throw error
  }
}

export { getWithRetry }