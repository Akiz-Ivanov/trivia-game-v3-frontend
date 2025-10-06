import { forwardRef, type Ref, type ButtonHTMLAttributes } from "react"
import { Button } from "@/components/ui/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "focus:border-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-default disabled:opacity-50 disabled:transform-none disabled:shadow-none",
    {
        variants: {
            variant: {
                menu: "bg-gradient-to-br from-accent/70 to-primary/70 bg-origin-border will-change-transform transition-transform duration-200 ease-in-out hover:scale-[1.02] active:scale-95 active:shadow-[0_0_8px_rgba(0,195,255,0.2)]",
                "play-again": "gap-1 rounded-[1.5rem] mt-3 px-8 py-3 text-white shadow-[0_4px_20px_rgba(166,119,227,0.4)] transition-all duration-300 ease bg-gradient-to-br from-btn-playagain-from to-btn-playagain-to text-[1.2rem] will-change-transform hover:brightness-110 hover:shadow-[0_6px_25px_rgba(166,119,227,0.6)] hover:-translate-y-1 font-bold active:scale-95",
                purple: "bg-gradient-to-br from-[#6e8efb] to-[#a777e3] hover:from-[#7aa2ff] hover:to-[#c187f2] hover:shadow-[0_6px_25px_rgba(166,119,227,0.6)] hover:-translate-y-1 active:scale-95",
            },
        },
    }
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>

//* ====== RegularButton with optional ref ======
const RegularButton = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, type = "button", variant, className, ...props }, ref: Ref<HTMLButtonElement>) => {
        return (
            <Button
                type={type}
                ref={ref}
                className={cn(buttonVariants({ variant, className }))}
                {...props}
            >
                {children}
            </Button>
        )
    }
)

RegularButton.displayName = "RegularButton"

export default RegularButton