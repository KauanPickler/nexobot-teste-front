const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "")
const TOKEN_KEY = "pataamiga.token"
const USER_KEY = "pataamiga.user"

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveSession(token, user) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch {
    /* storage indisponivel */
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {
    /* storage indisponivel */
  }
}

export async function apiFetch(path, options = {}) {
  const { method = "GET", body, auth = false } = options
  const headers = { Accept: "application/json" }
  if (body !== undefined) headers["Content-Type"] = "application/json"
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = "Bearer " + token
  }

  const res = await fetch(API_BASE + path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data }
}

export function errorsFrom(data) {
  if (data && data.errors) return Object.values(data.errors).flat()
  if (data && data.message) return [data.message]
  return ["Não foi possível concluir. Tente novamente."]
}

export function maskPhone(value) {
  const d = String(value || "").replace(/\D/g, "").slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return "(" + d.slice(0, 2) + ") " + d.slice(2)
  if (d.length <= 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6)
  return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7)
}

export function firstName(name) {
  return String(name || "").trim().split(/\s+/)[0] || "Tutor"
}

export function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return "PA"
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase()
}
