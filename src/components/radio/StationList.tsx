import { Virtuoso } from 'react-virtuoso'
import { useRadioContext } from '@/hooks/useRadioContext'
import { cn } from "@/lib/utils"
import LoadingScreen from '../common/LoadingScreen'
import { Star } from 'lucide-react'
import StationItem from './StationItem'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from 'react'

const StationList = () => {

  const [virtuosoKey, setVirtuosoKey] = useState(0)

  useEffect(() => {
    const handleAnimationComplete = () => {
      setVirtuosoKey(prev => prev + 1)
    }

    window.addEventListener('screenAnimationComplete', handleAnimationComplete)

    return () => {
      window.removeEventListener('screenAnimationComplete', handleAnimationComplete)
    }
  }, [])

  const {
    stations,
    currentStation,
    loadingFetch,
    fetchError,
    selectStation,
    favorites,
    toggleFavorite,
    isFavorite,
    setActiveList,
  } = useRadioContext()

  //* Update active list when tab changes
  const handleTabChange = (value: string) => {
    if (value === 'search') {
      setActiveList(stations, 'search')
    } else {
      setActiveList(favorites, 'favorites')
    }
  }

  return (
    <div className="w-full h-58 bg-[#3b2e26] backdrop-blur-sm
      border-2 border-amber-400 rounded-xl  overflow-hidden 
      shadow-[inset_0_2px_6px_rgba(255,255,255,0.3),inset_0_-2px_2px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.5)]"
    >

      <Tabs defaultValue="search" className='w-full h-full' onValueChange={handleTabChange}>
        <TabsList className='w-full h-7 rounded-none p-0 bg-amber-900/80 border-b border-amber-600'>
          <TabsTrigger
            value="search"
            className={cn(
              "w-full h-full rounded-none text-xs font-medium transition-all relative",
              "data-[state=active]:bg-amber-800 data-[state=active]:text-amber-200",
              "data-[state=inactive]:bg-transparent data-[state=inactive]:text-amber-400 data-[state=inactive]:hover:text-amber-200",
              "border-r border-amber-600 last:border-r-0"
            )}
          >
            Search
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className={cn(
              "w-full h-full rounded-none text-xs font-medium transition-all",
              "data-[state=active]:bg-amber-800 data-[state=active]:text-amber-200",
              "data-[state=inactive]:bg-transparent data-[state=inactive]:text-amber-400 data-[state=inactive]:hover:text-amber-200",
              "border-r border-amber-600 last:border-r-0"
            )}
          >
            Favorites
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className='w-full h-full'>
          {/* List of stations */}
          {stations.length > 0 ? (
            <Virtuoso
              key={virtuosoKey}
              data={stations}
              style={{ height: "100%", margin: "0.25rem" }}
              initialTopMostItemIndex={0}
              role="list"
              aria-label={`Radio stations search results, ${stations.length} stations found`}
              itemContent={(index, station) => (
                <StationItem
                  key={`station.stationuuid-${index}`}
                  station={station}
                  currentStation={currentStation}
                  isFavorite={isFavorite}
                  toggleFavorite={toggleFavorite}
                  selectStation={selectStation}
                />
              )}
            />
          ) : (
            loadingFetch ? (
              <div
                role="status"
                aria-live="polite"
                className="h-full flex items-center justify-center"
              >
                <LoadingScreen />
                <span className="sr-only">Loading radio stations...</span>
              </div>
            ) : (
              fetchError ? (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="h-full flex items-center justify-center text-red-400 p-4 text-center text-base"
                >
                  {fetchError}
                </div>
              ) : (
                <div
                  role="status"
                  className="h-full flex items-center justify-center text-amber-400 p-4 text-center"
                >
                  No stations found. Try different search.
                </div>
              )
            )
          )
          }

        </TabsContent>
        <TabsContent value="favorites">
          {favorites.length > 0 ? (
            <Virtuoso
              data={favorites}
              style={{ height: "100%" }}
              role="list"
              aria-label={`Favorite radio stations, ${favorites.length} favorites`}
              itemContent={(index, station) => (
                <StationItem
                  key={`station.stationuuid-${index}`}
                  station={station}
                  currentStation={currentStation}
                  isFavorite={isFavorite}
                  toggleFavorite={toggleFavorite}
                  selectStation={selectStation}
                />
              )}
            />
          ) : (
            <div
              role="status"
              className="h-full p-4 flex flex-col items-center justify-center text-amber-400 gap-2 text-sm text-center"
            >
              <Star aria-hidden="true" size={18} />
              No favorites yet. Click the star icon next to any station to add it to favorites.
            </div>
          )
          }
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default StationList