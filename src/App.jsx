import { useEffect } from "react"
import { AuthProvider, useAuth } from "./AuthContext"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Servicos from "./pages/Servicos"
import Racas from "./pages/Racas"
import Depoimentos from "./pages/Depoimentos"
import Contato from "./pages/Contato"
import Conta from "./pages/Conta"
import Painel from "./pages/Painel"
import { TITLES, useRoute } from "./router"

const PAGES = {
  inicio: Home,
  servicos: Servicos,
  racas: Racas,
  depoimentos: Depoimentos,
  contato: Contato,
  conta: Conta,
  painel: Painel,
}

function Shell() {
  const route = useRoute()
  const { user } = useAuth()
  const Page = PAGES[route] || Home

  useEffect(() => {
    document.title = TITLES[route] || TITLES.inicio
  }, [route])

  useEffect(() => {
    const els = document.querySelectorAll(".reveal")
    if (!els.length) return undefined
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [route, user])

  return (
    <div className="app">
      <Nav route={route} />
      <main className="page" key={route}>
        <Page />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  )
}
