import { BoomBox, PauseCircle, PlayCircle, StepBack, StepForward } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Loader2 } from "lucide-react"
import RadioDrawer from "./RadioDrawer"
import StationFilter from "./StationFilter"
import VolumeSlider from "./VolumeSlider"
import woodPattern from "@/assets/svgs/Wood.jpg"
import Marquee from "react-fast-marquee"
import { useRadioContext } from "@/hooks/useRadioContext"
import UtilityButton from "./UtilityButton"

const RadioWidget = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [openScreen, setOpenScreen] = useState<boolean>(false)
  const [openFavorites, setOpenFavorites] = useState<boolean>(false)

  const widgetRef = useRef<HTMLDivElement>(null)

  const {
    currentStation,
    isPlaying,
    togglePlay,
    nextStation,
    prevStation,
    volume,
    setVolume,
    loadingHowl,
    howlError,
    mode,
    stationQuery
  } = useRadioContext()

  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
  //       setIsOpen(false)
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside)
  //   return () => document.removeEventListener("mousedown", handleClickOutside)
  // }, [])

  useEffect(() => {
    if (mode) {
      setOpenDrawer(true)
    }
  }, [mode])

  useEffect(() => {
    if (stationQuery.length > 0) {
      setOpenScreen(true)
    } else if (stationQuery.length === 0) {
      setOpenScreen(false)
    }
  }, [stationQuery])

  const stationDisplay = loadingHowl ? `Starting playback.`
    : (howlError ? howlError : currentStation?.name || `No station selected. Loading popular stations.`)

  return (
    <div ref={widgetRef} className="fixed bottom-2 right-2 z-50">
      {isOpen ? (
        <div
          className="radio-wood-frame"
          style={{ backgroundImage: `url(${woodPattern})`, }}
        >
          <div className="radio-inner-trim">
            <div className="rounded-xl w-72 flex flex-col gap-4 shadow-inset p-1 relative bg-cover bg-center radio-bg">

              <RadioDrawer openDrawer={openDrawer} openScreen={openScreen} />

              {/* <RadioScreen openScreen={openScreen} /> */}

              {/* Top-half */}
              <div className="h-1/2 radio-top-half py-3.5 px-4 flex flex-col gap-3.5">

                <div className="flex flex-row justify-between px-1 gap-2 text-[#e8a948]">

                  <UtilityButton
                    onClick={() => setOpenDrawer(!openDrawer)}
                    isPressed={openDrawer}
                  >
                    Drawer
                  </UtilityButton>

                  <UtilityButton
                    onClick={() => {
                      setOpenScreen(!openScreen)
                      if (!openScreen) {
                        setOpenDrawer(true)
                      }
                    }}
                    isPressed={openScreen}
                  >
                    Stations
                  </UtilityButton>

                  <UtilityButton
                    onClick={() => setOpenFavorites(!openFavorites)}
                    isPressed={openFavorites}
                  >
                    Favorites
                  </UtilityButton>

                </div>

                <StationFilter />

                {/* Station name with scrolling text */}
                <div className="rounded-lg radio-station-name overflow-hidden">
                  <Marquee
                    speed={40}
                    pauseOnHover={true}
                    pauseOnClick={true}
                    className="text-sm station-name-text select-all"
                  >
                    {stationDisplay}
                  </Marquee>
                </div>
              </div>

              {/* Bottom half */}
              <div className="h-1/2 radio-panel pb-3 pt-5 px-8 flex flex-col gap-4">

                <VolumeSlider volume={volume} onSetVolume={(value) => setVolume(value)} />

                {/* Controls */}
                <div className="flex justify-between items-center gap-4 mt-2 px-4">
                  <button className="radio-btn rounded-full p-1.5" onClick={prevStation}>
                    <StepBack className="radio-btn-svg" />
                  </button>
                  <button className="radio-btn rounded-full p-1.5" onClick={togglePlay}>
                    {loadingHowl ? <Loader2 className="animate-spin text-[#fff] size-6" /> :
                      isPlaying ? <PauseCircle className="radio-btn-svg" /> : <PlayCircle className="radio-btn-svg" />
                    }
                  </button>
                  <button className="radio-btn rounded-full p-1.5" onClick={nextStation}>
                    <StepForward className="radio-btn-svg" />
                  </button>
                </div>

                {/* Decorative light */}
                <div className="border-light h-1 rounded-full mt-2 w-24 mx-auto" />

              </div>
            </div>
          </div>
        </div>
      ) : (
        // Collapsed icon as trigger
        <button
          onClick={() => setIsOpen(true)}
          className="shadow-lg m-3 size-fit"
        >
          <BoomBox className="size-8" />
        </button>
      )
      }
    </div >
  )
}

export default RadioWidget