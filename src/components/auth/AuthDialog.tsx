import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
// import VerifyForm from "./VerifyForm"
import { LogIn, UserRoundPlus } from "lucide-react"

export type AuthMode = "login" | "register" | "verify"

type AuthDialogProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {

  const [mode, setMode] = useState<AuthMode>("login")

  const isControlled = open !== undefined && onOpenChange !== undefined

  useEffect(() => {
    if (open) {
      setMode("login")
    }
  }, [open])

  const handleClose = () => {
    if (!isControlled) return
    onOpenChange(false)
    setMode("login")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!isControlled && (
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label="Open login form"
            className="absolute top-4 right-4 z-50 rounded-full"
          >
            Login/Register
          </button>
        </DialogTrigger>)}
      <DialogContent className="py-9">
        {mode === "register" && <UserRoundPlus size={18} className="absolute top-4 left-4 text-chart-3" />}
        {mode === "login" && <LogIn size={18} className="absolute top-4 left-4 text-chart-3" />} 
        <DialogHeader>
          <DialogTitle className="text-center text-18-22 leading-0">
            {mode === "login" ? "Login"
              : mode === "register" ? "Register"
                : "Verify"}
          </DialogTitle>
          <DialogDescription className="text-center text-sm italic mb-2" >
            {mode === "login" ? "Log in to your account"
              : mode === "register" ? "Create a new account"
                : "Verify your email"}
          </DialogDescription>
        </DialogHeader>
        {mode === "login" && (
          <LoginForm 
            onClose={handleClose} 
            onSwitch={(m: AuthMode) => setMode(m)}
          />
        )}
        {mode === "register" && (
          <RegisterForm onSwitch={(m: AuthMode) => setMode(m)} />
        )}
        {/* {mode === "verify" && <VerifyScreen />} */}
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog