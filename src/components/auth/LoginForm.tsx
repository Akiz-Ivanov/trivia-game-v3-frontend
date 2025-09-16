import { useState } from "react"
import RegularButton from "../common/RegularButton"
import loginService from "@/services/loginService"
import useAuth from "@/hooks/useAuth"
import { toast } from "sonner"
import { TriangleAlert, Eye, EyeOff, KeyRound, User2, LogIn } from "lucide-react"
import { Input } from "@/components/ui/input"

import type { User } from "@/types/auth.types"
import type { AuthMode } from "@/components/auth/AuthDialog"

type LoginFormProps = {
  onClose: () => void
  onSwitch: (m: AuthMode) => void
}

const LoginForm = ({
  onClose,
  onSwitch
}: LoginFormProps) => {

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { setUser } = useAuth()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!login.trim() || !password.trim()) {
      setError("Both fields are required")
      return
    }

    try {
      const user: Exclude<User, null> = await loginService.login({
        login, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)
      setLogin("")
      setPassword("")
      onClose()
      toast.success(
        <div className="flex items-center gap-2">
          <span className="font-bold">Welcome back, {user.username || user.email}!</span>
        </div>, {
        style: {
          fontWeight: 700,
          fontSize: "1rem",
          border: "2px solid var(--chart-3)"
        },
      })
      setError(null)
    } catch (err) {
      if (err instanceof Error) setError(err.message)
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="login"
        >
          Username or Email
        </label>

        <div className="relative group">
          <User2 className="absolute left-2.5 top-1/2 -translate-y-1/2 text-chart-3 w-4 h-4 pointer-events-none group-focus-within:text-chart-2" />
          <Input
            id="login"
            type="text"
            placeholder="example@gmail.com/John123"
            value={login}
            onChange={({ target }) => {
              setLogin(target.value)
              if (error) setError(null)
            }}
            className="placeholder:italic placeholder:text-gray-600 py-5 border-border border-2 rounded-sm w-full pl-8"
          />
        </div>

      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
        >
          Password
        </label>

        <div className="relative w-full group">
          <KeyRound className="absolute left-2.5 top-1/2 -translate-y-1/2 text-chart-3 w-4 h-4 pointer-events-none group-focus-within:text-chart-2" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password123"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value)
              if (error) setError(null)
            }}
            className="placeholder:text-gray-600 placeholder:italic py-5 border-border border-2 rounded-sm pl-8 pr-10 w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white rounded-full"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {error && (
          <p className="text-destructive text-sm text-center flex justify-center items-center gap-1">
            <TriangleAlert className="size-4" /> {error === "Invalid login credentials" ? "Oops! That login didn’t work. Please check your details." : error}
          </p>
        )}

        <RegularButton
          type="submit"
          className={`login-btn inline-flex items-center justify-center gap-1 rounded-[1.5rem] mt-3 px-12 py-3 
                    text-white shadow-[0_4px_20px_rgba(166,119,227,0.4)] transition-all duration-300 ease
                    bg-gradient-to-br from-[#6e8efb] to-[#a777e3] text-[1.2rem] will-change-transform
                    hover:from-[#7aa2ff] hover:to-[#c187f2] hover:shadow-[0_6px_25px_rgba(166,119,227,0.6)] hover:-translate-y-1 font-bold
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00c3ffcc] focus-visible:shadow-[0_0_0_4px_rgba(0,195,255,0.3)]
                    active:scale-95 active:shadow-[0_3px_10px_rgba(166,119,227,0.3)] w-fit self-center
                    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
                    ${error ? " ring-2 ring-destructive ring-offset-2 ring-offset-background" : ""}`}
        >
          Login 
          <LogIn size={20} />
        </RegularButton>
      </div>

      <p className="text-15-16 text-center">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={() => onSwitch?.("register")}
          className="text-chart-3 hover:underline items-center inline-flex gap-1"
        >
          <span>Register</span>
        </button>
      </p>
    </form>
  )
}

export default LoginForm