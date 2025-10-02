import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRadioLookup } from "@/hooks/useRadioLookup"
import {
  Command,
  CommandInput,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Virtuoso } from 'react-virtuoso'
import { useRadioContext } from "@/hooks/useRadioContext"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const RadioLookupCombobox = () => {

  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")

  const { mode, setStationQuery } = useRadioContext()
  
  const handleSelect = (name: string) => {
    setValue(name)
    setOpen(false)
    setStationQuery(name) //* Pass selection up
  }

  useEffect(() => {
    setValue("")
  }, [mode])

  const [searchQuery, setSearchQuery] = useState<string>("")

  const { items, loading } = useRadioLookup(mode, searchQuery)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[12.5rem] justify-between p-2 text-radio-text bg-[#241e21]/85 hover:bg-[#2b2427] ring-1 ring-radio-text",
            // Default: raised
            "shadow-[2px_2px_4px_rgba(0,0,0,0.6),-2px_-2px_4px_rgba(255,255,255,0.15)]",
            "border-t-[1px] border-l-[1px] border-t-[#00000066] border-l-[#00000066]",
            "border-b-[1px] border-r-[1px] border-b-[#ffffff33] border-r-[#ffffff33]",
            // Active: pressed
            open &&
            "shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.2)] \
           border-t-[#ffffff33] border-l-[#ffffff33] \
           border-b-[#00000066] border-r-[#00000066]"
          )}
        >
          <p className="truncate">
            {value || `Select a ${mode}`}
          </p>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 border-radio-text shadow-[2px_2px_6px_rgba(0,0,0,0.6),-2px_-2px_6px_rgba(255,255,255,0.05)]">
        <Command className="flex flex-col h-60 bg-[#241e21] 
          shadow-[2px_2px_6px_rgba(0,0,0,0.6),-2px_-2px_6px_rgba(255,255,255,0.05)]">
          <CommandInput
            placeholder={`Search ${mode}...`}
            value={searchQuery}
            onValueChange={(value) => {
              console.log("Input changed:", value)
              setSearchQuery(value);
            }}
            className="flex-shrink-0 placeholder:text-radio-text text-radio-text"
          />

          {loading && (
            <div className="p-2 text-sm text-muted-foreground flex-shrink-0">
              Searching...
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="p-2 text-sm text-muted-foreground flex-shrink-0">
              No {mode} found.
            </div>
          )}

          {items.length > 0 && (
            <Virtuoso
              data={items}
              totalCount={items.length}
              role="list"
              className="flex-1"
              itemContent={(index, item) => (
                <button
                  key={`${item.name}-${item.stationcount}-${index}`}
                  role="option"
                  aria-selected={value === item.name}
                  className={cn(
                    "flex w-full items-center px-2 py-1.5 text-sm text-left",
                    "hover:bg-accent focus:bg-accent focus:outline-none",
                    "cursor-pointer transition-colors hover:bg-[#925a4a]",
                    "aria-selected:bg-[#925a4a] aria-selected:text-[#18171d]"
                  )}
                  onClick={() => handleSelect(item.name)}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4 flex-shrink-0",
                      value === item.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="text-radio-text">
                    {item.name} ({item.stationcount})
                  </span>
                </button>
              )}
            />
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default RadioLookupCombobox