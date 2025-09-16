import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { useRadioContext } from "@/hooks/useRadioContext"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const RadioSearchInput = () => {

  const [searchValue, setSearchValue] = useState("")

  const { setStationQuery } = useRadioContext()

  //*====== Live search (debounced) ======
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchValue.trim().length > 2) {
        setStationQuery(searchValue.trim())
      } else if (searchValue.trim().length === 0) {
        setStationQuery("")
      }
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchValue, setStationQuery])

  const clearSearch = () => setSearchValue("")

  return (
    <div className="flex gap-2 relative w-[12.5rem] mx-auto">
      <Input
        placeholder="Search station by name..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={cn(
          " justify-between p-2",
          "text-[#f1dab7] bg-[#241e21]/85 hover:bg-[#2b2427] ring-1 ring-[#f1dab7]",
          // Default: raised
          "shadow-[2px_2px_4px_rgba(0,0,0,0.6),-2px_-2px_4px_rgba(255,255,255,0.15)]",
          "border-t-[1px] border-l-[1px] border-t-[#00000066] border-l-[#00000066]",
          "border-b-[1px] border-r-[1px] border-b-[#ffffff33] border-r-[#ffffff33]",
          "focus-visible:border-[#f1dab7] focus-visible:bg-[#2b2427] text-sm",
          "focus-visible:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.2)]",
          "border-t-[#ffffff33] border-l-[#ffffff33]",
          "border-b-[#00000066] border-r-[#00000066]"
          // Active: pressed

        )}
      />
      {searchValue && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-0 top-1/2 -translate-y-1/2 pr-4 text-[#f1dab7] hover:text-gray-200"
          aria-label="Clear search"
        >
          <XIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default RadioSearchInput