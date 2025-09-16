import { getWithRetry } from './radioApiClient'

export interface LookupItem {
  name: string
  stationcount: number
}

const getCountries = async (): Promise<LookupItem[]> => {
  return getWithRetry("/countries", {
    params: {
      order: "stationcount",
      reverse: true,
      hidebroken: true,
    },
  })
}

const getTags = async (limit?: number, query?: string): Promise<LookupItem[]> => {
  const endpoint = query 
  ? `/tags/${encodeURIComponent(query)}` 
  : "/tags"

  return getWithRetry(endpoint, {
    params: {
      order: "stationcount",
      reverse: true,
      hidebroken: true,
      ...(limit !== undefined ? { limit } : {})
    },
  })
}

export {
  getCountries,
  getTags,
}