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
        "outline-1 outline-[#e8a948] rounded-none px-1.5 h-5.5 text-sm bg-transparent radio-utility-btn",
        "inline-flex items-center justify-center",
        isPressed &&
        "bg-[radial-gradient(circle_at_50%_50%,_#ffe680_0%,_#ffca3a_50%,_#e8a948_100%)] " +
        "shadow-[0_0_10px_rgba(255,200,50,0.8),_0_0_20px_rgba(255,200,50,0.5)] text-black",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default UtilityButton