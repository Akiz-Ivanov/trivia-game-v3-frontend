import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useRadioContext } from "@/hooks/useRadioContext"
import StationList from "./StationList"
import RadioLookupCombobox from "./RadioLookupCombobox"
import RadioSearchInput from "./RadioSearchInput"
import birdsSvg from "@/assets/svgs/birds.svg"

type RadioDrawerProps = {
  openDrawer: boolean
  openScreen: boolean
}

const RadioDrawer = ({ openDrawer, openScreen }: RadioDrawerProps) => {

  const { mode } = useRadioContext()

  return (
    <div
      className={
        cn(
          "drawer-wrapper -z-1 absolute top-0 left-0 w-full h-18 bg-radio-texture-color will-change-transform",
          "transition-transform duration-500 ease-out rounded-lg sm:bottom-3 sm:left-0 sm:top-auto",
          {
            "translate-y-0 translate-x-0 sm:translate-y-0": !openDrawer,
            "-translate-y-15 sm:translate-y-0 sm:-translate-x-full": openDrawer,
          }
        )}
    >
      <div
        className="drawer w-full h-full pl-2 pr-4 py-2 bg-cover rounded-sm
        flex flex-col justify-start sm:justify-center items-center gap-2 bg-repeat
        bg-[repeating-linear-gradient(135deg,var(--radio-texture-color)_0px,var(--radio-texture-color-dark)_2px)]"
        style={{
          backgroundImage: `url(${birdsSvg}), var(--radio-texture)`,
          backgroundSize: "cover, 200px, 100px",
        }}
        aria-hidden={!openDrawer}
        inert={!openDrawer}
      >
        {mode === "country" || mode === "tag" ? (
          <RadioLookupCombobox />
        ) : mode === "search" ? (
          <RadioSearchInput />
        ) : null 
        }
      </div>
      
      {/* 3D Screen with Framer Motion */}
      <div
        className="absolute left-1.5 right-1.5 sm:left-1 sm:right-3 bottom-full -z-3 bg-transparent"
        style={{
          perspective: "1000px"
        }}
      >
        
        <AnimatePresence>
          {openScreen && (
            <motion.div
              className={cn("w-full p-1.5 -z-2 rounded-tl-2xl rounded-tr-2xl",
                "transition-transform duration-500 ease-out will-change-transform",
                "shadow-[inset_0_2px_6px_rgba(255,255,255,0.3),inset_0_-2px_2px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.5)]",
              )}
              style={{
                perspective: "1000px",
                backgroundImage: "var(--radio-texture)",
                transformStyle: "preserve-3d",
              }}
              initial={{ rotateX: 90, opacity: 1, y: 50, transformOrigin: "bottom center" }}
              animate={{ rotateX: 0, y: 0 }}
              exit={{ rotateX: 90, y: 50 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 80,
                mass: 1.2,
                duration: 1
              }}
              onAnimationComplete={() => {
                //* Notify StationList when animation finishes to rerender Virtuoso
                window.dispatchEvent(new CustomEvent('screenAnimationComplete'))
              }}
            >
              <StationList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default RadioDrawer