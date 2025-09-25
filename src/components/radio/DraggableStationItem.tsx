import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import StationItem from './StationItem'
import type { Station } from '@/types/radio.types'

// Reuse the same props as StationItem
type StationItemProps = {
  station: Station
  currentStation: Station | null
  isFavorite: (uuid: string) => boolean
  toggleFavorite: (station: Station) => void
  selectStation: (station: Station) => void
}

const DraggableStationItem = ({
  station,
  currentStation,
  isFavorite,
  toggleFavorite,
  selectStation,
}: StationItemProps) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: station.stationuuid })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative cursor-grab active:cursor-grabbing ${isDragging ? 'z-50' : ''}`}
    >
      
      {/* Station Item with left padding and pointer events handling */}
      <div
        onPointerDown={(e) => {
          // Allow star button clicks to work normally
          const target = e.target as HTMLElement
          if (target.closest('button')) {
            e.stopPropagation()
          }
        }}
      >
        <StationItem
          station={station}
          currentStation={currentStation}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          selectStation={selectStation}
        />
      </div>
    </div>
  )
}

export default DraggableStationItem