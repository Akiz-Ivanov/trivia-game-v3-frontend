import { useEffect } from "react"
import { AuthContext } from "./AuthContext"
import loginService from "../services/loginService"
import type { User } from "../types/auth.types"
import useLocalStorageState from "@/hooks/useLocalStorageState"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useLocalStorageState<User>("loggedUser", null)
  
  //* Set token when user changes
  useEffect(() => {
    loginService.setToken(user?.token ?? null)
  }, [user])
  
  //* Logout
  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}