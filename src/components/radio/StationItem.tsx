import { Star } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
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
  const isStationFavorite = isFavorite(station.stationuuid)

  const { name } = station

  return (
    <div role="listitem">

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
        aria-label={`Select station ${name}${isCurrent ? ' (currently playing)' : ''}`}
        className={cn("text-radio-accent bg-transparent p-1 mb-2 text-left",
          "w-full justify-between mb-1 h-auto flex",
          "text-sm font-medium shadow-sm cursor-pointer w-full",
          "hover:outline-1 hover:outline-radio-accent truncate relative pr-2 hover:bg-transparent",
          {
            "text-radio-accent/30": isCurrent
          }
        )}
      >
        {/* Station name */}
        <span className="text-left truncate flex-1" aria-hidden="true">
          {name}
        </span>

        {/* Favorite button */}
        <Button
          variant="ghost"
          className="w-fit h-fit p-0 hover:bg-transparent group"
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(station)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              e.stopPropagation()
              toggleFavorite(station)
            }
          }}
          aria-label={`${isStationFavorite ? 'Remove' : 'Add'} ${name} ${isStationFavorite ? 'from' : 'to'} favorites`}
          tabIndex={0}
        >
          <Star
            className={cn(
              "size-4",
              isStationFavorite
                ? "fill-radio-accent text-radio-accent"
                : "text-radio-glow"
            )}
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  )
}

export default StationItem