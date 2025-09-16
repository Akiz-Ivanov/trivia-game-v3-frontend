import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

interface CustomToasterProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
  duration?: number
  // add more props if needed
}

const Toaster = ({ ...props }: CustomToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"} // cast since sonner accepts these strings
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-border": "var(--chart-3)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }