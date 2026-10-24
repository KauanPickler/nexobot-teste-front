import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { apiFetch, clearSession, getStoredUser, getToken, saveSession } from "./api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)
  const [token, setToken] = useState(getToken)
  const [checking, setChecking] = useState(Boolean(getToken()))

  const apply = useCallback((nextToken, nextUser) => {
    saveSession(nextToken || "", nextUser || null)
    setToken(nextToken || null)
    setUser(nextUser || null)
  }, [])

  useEffect(() => {
    let alive = true
    if (!getToken()) {
      setChecking(false)
      return undefined
    }
    apiFetch("/me", { auth: true })
      .then(({ ok, data }) => {
        if (!alive) return
        if (ok && data.user) {
          saveSession(getToken(), data.user)
          setUser(data.user)
          setToken(getToken())
        } else {
          clearSession()
          setUser(null)
          setToken(null)
        }
      })
      .catch(() => {
        /* mantem sessao local em caso de rede */
      })
      .finally(() => {
        if (alive) setChecking(false)
      })
    return () => {
      alive = false
    }
  }, [])

  const login = useCallback(
    async (payload) => {
      const { ok, data, status } = await apiFetch("/login", { method: "POST", body: payload })
      if (!ok) return { ok: false, data, status }
      apply(data.token, data.user)
      return { ok: true, data }
    },
    [apply]
  )

  const register = useCallback(
    async (payload) => {
      const { ok, data, status } = await apiFetch("/register", { method: "POST", body: payload })
      if (!ok) return { ok: false, data, status }
      apply(data.token, data.user)
      return { ok: true, data }
    },
    [apply]
  )

  const logout = useCallback(async () => {
    try {
      await apiFetch("/logout", { method: "POST", auth: true })
    } catch {
      /* ignora falha de rede no logout */
    }
    clearSession()
    setUser(null)
    setToken(null)
  }, [])

  const value = { user, token, checking, login, register, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth precisa estar dentro de AuthProvider")
  return ctx
}
