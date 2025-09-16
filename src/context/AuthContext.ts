import { createContext } from "react"

import type { User } from "@/types/auth.types"

type AuthContextType = {
  user: User
  setUser: (user: User) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)