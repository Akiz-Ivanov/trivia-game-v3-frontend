import { useCallback, useEffect, useMemo } from "react"
import useLocalStorageState from "@/hooks/useLocalStorageState"
import type { Station } from "@/types/radio.types"

const useFavoriteStations = () => {
 
  const [favorites, setFavorites] = useLocalStorageState<Station[]>("radio-favorites", [])

  const toggleFavorite = useCallback((station: Station) => {
    setFavorites(prev => {
      const exists = prev.find(s => s.stationuuid === station.stationuuid)
      return exists
        ? prev.filter(s => s.stationuuid !== station.stationuuid) // remove
        : [...prev, station]; // add
    });
  }, [setFavorites])

  const isFavorite = useCallback(
    (uuid: string) => favorites.some(s => s.stationuuid === uuid),
    [favorites]
  )

  const value = useMemo(() => ({
    favorites,
    toggleFavorite,
    isFavorite
  }), [favorites, toggleFavorite, isFavorite]); // Only change when these change

  useEffect(() => {
    console.log('Context value changed');
  }, [value])

  return value;
}

export default useFavoriteStations