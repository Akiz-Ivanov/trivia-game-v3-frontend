import { passwordStrength } from "check-password-strength"
import { cn } from "@/lib/utils"

type PassStrengthBar = {
  password: string
}

const PassStrengthBar = ({ password }: PassStrengthBar) => {

  const result = passwordStrength(password)
  const widthMap: Record<string, number> = {
    "Too weak": 25,
    "Weak": 50,
    "Medium": 75,
    "Strong": 100
  }
  const width = widthMap[result.value] ?? 0

  return (
    <div className="w-2/5 flex flex-row justify-center items-center gap-2">
      <p className="text-15-16">
        {result.value}
      </p>
      <div className="h-2 bg-gray-400 rounded flex-1">
        <div
          className={cn("h-2 rounded transition-all duration-500 ease-in-out",
            width && {
              "bg-destructive": width <= 25,
              "bg-orange-400": width > 25 && width <= 50,
              "bg-yellow-400": width > 50 && width <= 75,
              "bg-chart-3": width > 75
            }
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export default PassStrengthBar