import { useState, useEffect, useRef } from "react"
import userService from "@/services/userService"

type AvailabilityCheck = {
  username?: string
  email?: string
}

const useAvailabilityCheck = ({ username, email }: AvailabilityCheck) => {
  const [available, setAvailable] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!username && !email) {
      setAvailable(null)
      return
    }

    //* Clear previous debounce
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      //* Abort previous request
      if (abortControllerRef.current) abortControllerRef.current.abort()
      const controller = new AbortController()
      abortControllerRef.current = controller

      setError(null)

      const params = new URLSearchParams()
      if (username) params.append("username", username)
      if (email) params.append("email", email)

      userService.checkUserAvailability({ username, email, signal: controller.signal })
        .then((data) => setAvailable(data.available))
        .catch((err) => {
          if (err.name !== "CanceledError" && err.name !== "AbortError") {
            setError(err.message || "Error checking availability")
          }
        })
    }, 500)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (abortControllerRef.current) abortControllerRef.current.abort()
    }
  }, [username, email])

  return { available, error }
}

export default useAvailabilityCheck