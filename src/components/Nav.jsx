import { useEffect, useRef, useState } from "react"
import Icon from "../Icons"
import { useAuth } from "../AuthContext"
import { NAV_KEYS, ROUTES } from "../router"
import { firstName, initials } from "../api"

export default function Nav({ route }) {
  const { user, checking, logout } = useAuth()
  const [openMenu, setOpenMenu] = useState(false)
  const [openUser, setOpenUser] = useState(false)
  const userRef = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (userRef.current && !userRef.current.contains(e.target)) setOpenUser(false)
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  useEffect(() => {
    setOpenMenu(false)
    setOpenUser(false)
  }, [route])

  async function handleLogout() {
    setOpenUser(false)
    setOpenMenu(false)
    await logout()
    window.location.hash = "#/inicio"
  }

  return (
    <header className="nav">
      <a className="logo" href="#/inicio" onClick={() => setOpenMenu(false)}>
        <span className="logo-badge">
          <Icon name="paw" size={17} filled />
        </span>
        <span className="logo-text">
          Pata<em>Amiga</em>
        </span>
      </a>

      <nav className={"nav-links" + (openMenu ? " is-open" : "")}>
        {NAV_KEYS.map((key) => (
          <a
            key={key}
            href={ROUTES[key].path}
            className={route === key ? "is-active" : ""}
            onClick={() => setOpenMenu(false)}
          >
            {ROUTES[key].label}
          </a>
        ))}

        <div className="nav-mobile-actions">
          {user ? (
            <>
              <a className="btn btn-outline btn-sm" href="#/painel">
                <Icon name="user" size={16} /> Meu painel
              </a>
              <button className="btn btn-dark btn-sm" type="button" onClick={handleLogout}>
                <Icon name="logOut" size={16} /> Sair
              </button>
            </>
          ) : (
            <>
              <a className="btn btn-outline btn-sm" href="#/conta">
                Entrar
              </a>
              <a className="btn btn-primary btn-sm" href="#/conta">
                Criar conta
              </a>
            </>
          )}
        </div>
      </nav>

      <div className="nav-actions">
        {checking ? (
          <span className="nav-loading" aria-label="Carregando sessão" />
        ) : user ? (
          <div className="account" ref={userRef}>
            <button
              type="button"
              className={"account-btn" + (openUser ? " is-open" : "")}
              onClick={() => setOpenUser((v) => !v)}
            >
              <span className="account-avatar">{initials(user.name)}</span>
              <span className="account-meta">
                <small>Conta logada</small>
                <strong>{firstName(user.name)}</strong>
              </span>
              <Icon name="chevronDown" size={15} />
            </button>

            {openUser && (
              <div className="account-menu">
                <div className="account-menu-head">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <a href="#/painel">
                  <Icon name="user" size={16} /> Meu painel
                </a>
                <a href="#/contato">
                  <Icon name="calendar" size={16} /> Agendar serviço
                </a>
                <button type="button" onClick={handleLogout}>
                  <Icon name="logOut" size={16} /> Sair da conta
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="nav-cta">
            <a className="btn btn-outline btn-sm" href="#/conta">
              Entrar
            </a>
            <a className="btn btn-primary btn-sm" href="#/conta">
              Criar conta
            </a>
          </div>
        )}

        <button
          type="button"
          className="nav-burger"
          onClick={() => setOpenMenu((v) => !v)}
          aria-label="Abrir menu"
        >
          <Icon name={openMenu ? "close" : "menu"} size={22} />
        </button>
      </div>
    </header>
  )
}
