import { forwardRef, type Ref, type ButtonHTMLAttributes } from "react"
import { Button } from "@/components/ui/button"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

//* ====== RegularButton with optional ref ======
const RegularButton = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, type = "button", ...props }, ref: Ref<HTMLButtonElement>) => {
        return (
            <Button
                type={type}
                ref={ref}
                {...props}
            >
                {children}
            </Button>
        )
    }
)

RegularButton.displayName = "RegularButton"

export default RegularButton