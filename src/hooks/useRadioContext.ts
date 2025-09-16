import { useContext } from "react"
import { RadioContext } from "@/context/RadioContext"

export const useRadioContext = () => {
  const context = useContext(RadioContext)
  if (!context) throw new Error("useRadioContext must be used within a RadioProvider")
  return context
}