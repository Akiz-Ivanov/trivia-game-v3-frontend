import { cn } from "@/lib/utils"

type UtilityButtonProps = {
  isPressed?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const UtilityButton = ({ children, isPressed, className, ...props }: UtilityButtonProps) => {
  return (
    <button
      type="button"
      aria-pressed={isPressed ? true : undefined}
      className={cn(
        "outline-1 outline-radio-glow rounded-none px-1.5 h-5.5 text-sm bg-transparent radio-utility-btn",
        "inline-flex items-center justify-center text-radio-glow radio-utility-btn",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default UtilityButton