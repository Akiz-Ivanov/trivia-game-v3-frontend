import type { Station } from "@/types/radio.types"
import { getWithRetry } from './radioApiClient'


//*====== Fetch by tag ======
const getStationsByTag = (tag: string, limit?: number, signal?: AbortSignal) => {

  if (!tag || tag.trim() === '') {
  console.log('Empty search term, returning empty results')
  return Promise.resolve([])
}

  return getWithRetry<Station[]>(`/stations/bytag/${encodeURIComponent(tag)}`, {
    params: {
      order: "clickcount",
      hidebroken: true,
      reverse: true,
      ...(limit !== undefined ? { limit } : {})
    },
    signal
  })
}

//*====== Fetch by country ======
const getStationsByCountry = (country: string, limit?: number, signal?: AbortSignal) => {

  if (!country || country.trim() === '') {
  console.log('Empty search term, returning empty results')
  return Promise.resolve([])
}

  return getWithRetry<Station[]>(`/stations/bycountry/${encodeURIComponent(country)}`, {
    params: {
      order: "clickcount",
      hidebroken: true,
      reverse: true,
      ...(limit !== undefined ? { limit } : {})
    },
    signal
  })
}

//*====== Fetch most popular globally by clicks ======
const getStationsByClicks = (limit?: number, signal?: AbortSignal) => (
  getWithRetry<Station[]>("/stations/topclick", {
    params: {
      hidebroken: true,
      reverse: true,
      ...(limit !== undefined ? { limit } : {})
    },
    signal
  })
)

//*====== Fetch most popular globally by votes ======
const getStationsByVotes = (limit?: number, signal?: AbortSignal) => (
  getWithRetry<Station[]>("/stations/topvote", {
    params: {
      hidebroken: true,
      reverse: true,
      ...(limit !== undefined ? { limit } : {})
    },
    signal
  })
)

//*====== Fetch by custom search (tag + country + name) ======
const getStationByName = (search: string, limit?: number, signal?: AbortSignal) => {
  //* Validate search term - return empty array for empty searches
  if (!search || search.trim() === '') {
    console.log('Empty search term, returning empty results')
    return Promise.resolve([])
  }

  return getWithRetry<Station[]>(`/stations/byname/${encodeURIComponent(search)}`, {
    params: {
      ...(limit !== undefined ? { limit } : {})
    },
    signal
  })
}

export {
  getStationsByTag,
  getStationsByCountry,
  getStationsByClicks,
  getStationsByVotes,
  getStationByName
}