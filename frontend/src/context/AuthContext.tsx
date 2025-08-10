import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'

export type User = {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

type AuthContextValue = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (payload: { token: string; user: User }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // Hydrate from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')
    if (storedToken) setToken(storedToken)
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  const login = ({ token, user }: { token: string; user: User }) => {
    setToken(token)
    setUser(user)
    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user', JSON.stringify(user))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  }), [user, token])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}



