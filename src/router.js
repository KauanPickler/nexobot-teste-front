import { useEffect, useState } from "react"

export const ROUTES = {
  inicio: { label: "Início", path: "#/inicio" },
  servicos: { label: "Serviços", path: "#/servicos" },
  racas: { label: "Raças", path: "#/racas" },
  depoimentos: { label: "Depoimentos", path: "#/depoimentos" },
  contato: { label: "Contato", path: "#/contato" },
  conta: { label: "Minha conta", path: "#/conta" },
  painel: { label: "Meu painel", path: "#/painel" },
}

export const NAV_KEYS = ["inicio", "servicos", "racas", "depoimentos", "contato"]

export const TITLES = {
  inicio: "PataAmiga — Cuidado completo para o seu cão",
  servicos: "Serviços — PataAmiga",
  racas: "Raças e perfis — PataAmiga",
  depoimentos: "Depoimentos — PataAmiga",
  contato: "Contato — PataAmiga",
  conta: "Minha conta — PataAmiga",
  painel: "Meu painel — PataAmiga",
}

export function currentRoute() {
  const raw = String(window.location.hash || "").replace(/^#\/?/, "").split("?")[0]
  return ROUTES[raw] ? raw : "inicio"
}

export function go(route) {
  const target = "#/" + (ROUTES[route] ? route : "inicio")
  if (window.location.hash !== target) window.location.hash = target
}

export function useRoute() {
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const onChange = () => setRoute(currentRoute())
    window.addEventListener("hashchange", onChange)
    if (!window.location.hash) window.location.replace("#/inicio")
    return () => window.removeEventListener("hashchange", onChange)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  return route
}
