import { useState, useMemo } from "react"
import type { ReactNode } from "react"
import { RadioContext } from "./RadioContext"
import useRadio from "@/hooks/useRadio"
import type { UseRadioReturn, Mode } from "@/types/radio.types"
import useFavoriteStations from "@/hooks/useFavoriteStations"

export const RadioProvider = ({ children }: { children: ReactNode }) => {

  const [mode, setMode] = useState<Mode>(null)
  const [stationQuery, setStationQuery] = useState<string>("")
  const [limit, setLimit] = useState<number | undefined>(undefined)

  const radio = useRadio({ mode, search: stationQuery, limit })

  const favoriteStations = useFavoriteStations()

  const { favorites, toggleFavorite, isFavorite } = favoriteStations

  const value: UseRadioReturn = useMemo(() => ({
    ...radio,
    mode,
    setMode,
    stationQuery,
    setStationQuery,
    limit,
    setLimit,
    favorites,
    toggleFavorite,
    isFavorite
  }), [radio, mode, stationQuery, limit])

  return (
    <RadioContext.Provider value={value}>
      {children}
    </RadioContext.Provider>
  )
}