import { Star } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
// import { useRadioContext } from "@/hooks/useRadioContext"
// import useFavoriteStations from "@/hooks/useFavoriteStations"
import type { Station } from "@/types/radio.types"

type StationItemProps = {
  station: Station
  currentStation: Station | null
  isFavorite: (uuid: string) => boolean
  toggleFavorite: (station: Station) => void
  selectStation: (station: Station) => void
}

const StationItem = ({ station, currentStation, isFavorite, toggleFavorite, selectStation }: StationItemProps) => {

  const isCurrent = currentStation?.stationuuid === station.stationuuid

  const { name, stationuuid } = station

  return (
    <div
      onClick={() => selectStation(station)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          selectStation(station)
        }
      }}
      aria-current={isCurrent ? "true" : undefined}
      className={cn("text-[#f2cc5b] bg-transparent p-1 mb-2 text-left",
        "w-full justify-between mb-1 h-auto flex",
        "text-sm font-medium shadow-sm cursor-pointer w-full",
        "hover:outline-1 hover:outline-[#e6b14d] truncate relative pr-2 hover:bg-transparent",
        {
          "text-[#f2cc5b]/30": isCurrent
        }
      )}
    >
      <span className="text-left truncate flex-1">
        {name}
      </span>

      <Button
        variant="ghost"
        // size="icon"
        className="w-fit h-fit p-0 hover:bg-transparent group"
        onClick={(e) => {
          e.stopPropagation()
          toggleFavorite(station)
        }}
      >
        <Star
          className={cn(
            "size-4",
            isFavorite(stationuuid)
              ? "fill-[#e6b14d] text-[#e6b14d]"
              : "text-amber-500/60"
          )}
        />
      </Button>
    </div>
  )
}

export default StationItem