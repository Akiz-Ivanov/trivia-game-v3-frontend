import { createContext } from "react"
import type { UseRadioReturn } from "@/types/radio.types"

export const RadioContext = createContext<UseRadioReturn | undefined>(undefined)

RadioContext.displayName = "RadioContext"