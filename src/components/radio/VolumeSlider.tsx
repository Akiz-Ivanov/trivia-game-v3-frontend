import { Slider } from "@/components/ui/slider"

type VolumeSliderProps = {
  volume: number
  onSetVolume: (value: number) => void
}

const VolumeSlider = ({ volume, onSetVolume }: VolumeSliderProps) => {
  return (
    <div className="flex flex-col gap-2.5">

      {/* Volume label */}
      <div className="step-scale">
        <span className="label leading-1.5">MIN</span>
        <div className="scale-bar"></div>
        <span className="label leading-1.5">MAX</span>
      </div>

      {/* Volume slider */}
      {/* <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => onSetVolume(parseFloat(e.target.value))}
        className="w-full mt-2 px-3.5"
        list="marks"
      /> */}

      <Slider
        defaultValue={[50]}
        min={0}
        max={100}
        step={1}
        value={[Math.round(volume * 100)]}
        onValueChange={(value) => onSetVolume(value[0] / 100)}
        className="w-[85%] mx-auto mt-2 shadow-[-2px_2px_4px_0px_#0c0c0c_inset] cursor-pointer"
      />

    </div>
  )
}
export default VolumeSlider