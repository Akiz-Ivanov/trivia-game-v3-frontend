import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { Howl } from "howler"
import {
  getStationsByTag,
  getStationsByCountry,
  getStationsByClicks,
  getStationByName,
} from "@/services/radioService"

import type { Station, UseRadioOptions } from "@/types/radio.types"
import useLocalStorageState from "./useLocalStorageState"

const useRadio = (options: UseRadioOptions = {}) => {
  const { mode = "popular", search = "", limit } = options

  const [stations, setStations] = useState<Station[]>([])
  const [currentStationId, setCurrentStationId] = useState<string | undefined>(undefined)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useLocalStorageState<number>("radio-volume", 0.5)
  const [currentStationInfo, setCurrentStationInfo] = useState<Station | null>(null)
  const [activeList, setActiveList] = useState<Station[]>(stations)
  const [activeListType, setActiveListType] = useState<'search' | 'favorites'>('search')

  const [fetchError, setFetchError] = useState<string | null>(null)
  const [howlError, setHowlError] = useState<string | null>(null)
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false)
  const [loadingHowl, setLoadingHowl] = useState<boolean>(false)

  const audioRef = useRef<Howl | null>(null)
  const audioRetryRef = useRef<boolean>(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const hasFetchedInitially = useRef<boolean>(false)
  const hasTriedFavoritesFallback = useRef<boolean>(false)

  const currentStation = useMemo(() =>
    stations.find(s => s.stationuuid === currentStationId) || currentStationInfo,
    [stations, currentStationId, currentStationInfo]
  )
  
  const currentStationUrl = useRef<string>("")

  const getFavoriteStations = useCallback((): Station[] => {
    try {
      const favorites = localStorage.getItem('radio-favorites') // Same key as your hook
      return favorites ? JSON.parse(favorites) : []
    } catch (error) {
      console.error('Failed to load favorites:', error)
      return []
    }
  }, [])
  
  //*====== Fetch stations ======
  useEffect(() => {
    // Skip fetching if mode is null and we've already fetched once
    if (!mode && hasFetchedInitially.current) return

    const fetchStations = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()
      const { signal } = abortControllerRef.current

      setLoadingFetch(true)
      setFetchError(null)
      hasTriedFavoritesFallback.current = false

      try {
        let data: Station[] = []
        switch (mode) {
          case "popular":
            data = await getStationsByClicks(limit, signal)
            break
          case "country":
            data = await getStationsByCountry(search, limit, signal)
            break
          case "tag":
            data = await getStationsByTag(search, limit, signal)
            break
          case "search":
            data = await getStationByName(search, limit, signal)
            break
          default:
            data = await getStationsByClicks(50, signal)
            break
        }

        if (!signal.aborted) {
          setStations(data)
          setActiveList(data)
          setActiveListType('search')
          hasFetchedInitially.current = true

          // If this is the first fetch, select the first station
          if (!currentStationId && data.length > 0) {
            setCurrentStationId(data[0].stationuuid)
            setCurrentStationInfo(data[0])
          }
        }
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          console.error("Failed to fetch stations:", err)
          if (!signal.aborted) {
            setFetchError("Failed to load stations")

            if (!hasTriedFavoritesFallback.current && !currentStationId) {
              hasTriedFavoritesFallback.current = true
              const favorites = getFavoriteStations()

              if (favorites.length > 0) {
                console.log("APIs failed, falling back to favorites")
                setStations(favorites)
                setCurrentStationId(favorites[0].stationuuid)
                setCurrentStationInfo(favorites[0])
                setActiveList(favorites)
                setActiveListType('favorites')
                setFetchError("Using your favorites (APIs unavailable)")
              }
            }
          }
        }
      } finally {
        if (!signal.aborted) setLoadingFetch(false)
      }
    }

    fetchStations()

    return () => abortControllerRef.current?.abort()
  }, [mode, search, limit])

  //*====== Handle station playback ======
  useEffect(() => {
    if (!currentStation) return

    // If already playing this station, skip
    if (currentStationUrl.current === currentStation.url_resolved) return

    currentStationUrl.current = currentStation.url_resolved

    // Clean up previous audio
    audioRef.current?.unload()

    setHowlError(null)
    setLoadingHowl(true)

    const howl = new Howl({
      src: [currentStation.url_resolved],
      html5: true,
      volume,
      preload: true,
      format: ["mp3", "aac", "ogg", "wav", "m3u8", "pls"],
      onload: () => {
        console.log("Station loaded:", currentStation.name)
        setLoadingHowl(false)
        if (isPlaying) {
          howl.play()   // Play as soon as it's ready
        }
      },
      onloaderror: (err) => {
        console.error("Howler load error:", err)
        setHowlError("Unable to load station.")
        setLoadingHowl(false)
      },
      onplayerror: (err) => {
        console.error("Howler play error:", err)
        setHowlError("Playback failed. Trying again.")
        setLoadingHowl(false)

        // Retry once after a short delay
        if (!audioRetryRef.current) {
          // First failure → retry
          setHowlError("Playback failed. Trying again.")
          audioRetryRef.current = true

          setTimeout(() => {
            audioRef.current?.play()
          }, 500)
        } else {
          // Second failure → final error
          setHowlError("Playback failed. Please try another station.")
          setLoadingHowl(false)
          audioRetryRef.current = false
        }
      },
    })

    audioRef.current = howl

    return () => {
      if (audioRef.current === howl) {
        howl.unload()
      }
    }
  }, [currentStation])

  useEffect(() => {
    audioRef.current?.volume(volume)
  }, [volume])

  //*====== Actions ======
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      // Pause if playing
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      /// Only play if the audio is loaded and ready
      if (audioRef.current.state() === 'loaded') {
        audioRef.current.play()
      }
      // If not loaded yet, the onload handler will play it automatically when ready
      setIsPlaying(true)
    }
  }, [isPlaying])

  const selectStation = useCallback((station: Station) => {
    setCurrentStationInfo(station)
    setCurrentStationId(station.stationuuid)
    setIsPlaying(true)
    audioRetryRef.current = false
  }, [])

  const nextStation = useCallback(() => {
    if (!currentStationId || activeList.length === 0) return
    const idx = activeList.findIndex(s => s.stationuuid === currentStationId)
    if (idx === -1) return
    const nextIdx = (idx + 1) % activeList.length
    selectStation(activeList[nextIdx])
  }, [activeList, currentStationId, selectStation])

  const prevStation = useCallback(() => {
    if (!currentStationId || activeList.length === 0) return
    const idx = activeList.findIndex(s => s.stationuuid === currentStationId)
    if (idx === -1) return
    const prevIdx = (idx - 1 + activeList.length) % activeList.length
    selectStation(activeList[prevIdx])
  }, [activeList, currentStationId, selectStation])

  return {
    stations,
    currentStation,
    isPlaying,
    togglePlay,
    nextStation,
    prevStation,
    selectStation,
    volume,
    setVolume,
    loadingFetch,
    loadingHowl,
    fetchError,
    howlError,
    activeList,
    activeListType,
    setActiveList: (list: Station[], type: 'search' | 'favorites') => {
      setActiveList(list)
      setActiveListType(type)
    },
  }
}

export default useRadio