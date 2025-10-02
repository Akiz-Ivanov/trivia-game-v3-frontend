import type { Mode } from "@/types/radio.types"
import { useRadioContext } from "@/hooks/useRadioContext"
import { cn } from "@/lib/utils"

const modes: Mode[] = ["popular", "country", "tag", "search"]

const StationFilter = () => {

  const { mode, setMode } = useRadioContext()

  return (
    <div className="tuning-dial-wrapper transition-transform duration-500">
    <div className="tuning-dial flex justify-center items-center px-3 bg-black rounded-full divide-x divide-[#555] text-radio-light-sides shadow-[inset_0_2px_6px_rgba(255,255,255,0.3),0_-2px_6px_rgba(0,0,0,0.5)] h-6 relative overflow-hidden">
      {modes.map((m) => (
        <button
          key={m}
          aria-pressed={mode === m}
          onClick={() => setMode(m)}
          className={cn(
            "radio-toggle-btn flex-1 leading-2",
            mode === m && "active"
          )}
        >
          <p>{m?.toUpperCase()}</p>
        </button>
      ))}
    </div>
  </div>
  )
}

export default StationFilter