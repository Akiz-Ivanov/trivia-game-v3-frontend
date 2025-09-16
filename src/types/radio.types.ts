export type Mode = "tag" | "country" | "popular" | "search" | null

export interface Station {
  name: string;
  url_resolved: string;
  favicon: string;
  country: string;
  tags: string[];
  stationuuid: string;
}

export interface UseRadioOptions {
  mode?: Mode | null
  search?: string
  limit?: number
}

export type UseRadioReturn = {
  stations: Station[]
  currentStation: Station | null
  isPlaying: boolean
  togglePlay: () => void
  nextStation: () => void
  prevStation: () => void
  selectStation: (station: Station) => void
  volume: number
  setVolume: (v: number) => void
  loadingFetch: boolean
  loadingHowl: boolean
  fetchError: string | null
  howlError: string | null
  setActiveList: (list: Station[], type: 'search' | 'favorites') => void
  mode: Mode
  setMode: (mode: Mode) => void
  stationQuery: string
  setStationQuery: (query: string) => void
  limit: number | undefined
  setLimit: (limit: number | undefined) => void,
  favorites: Station[]
  toggleFavorite: (station: Station) => void
  isFavorite: (uuid: string) => boolean
  activeList: Station[]
  activeListType: 'search' | 'favorites'
}