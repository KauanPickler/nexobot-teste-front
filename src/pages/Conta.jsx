import { useState } from "react"
import { go } from "../router"
import Icon from "../Icons"
import { useAuth } from "../AuthContext"
import { errorsFrom, maskPhone } from "../api"

const EMPTY = { name: "", email: "", phone: "", password: "", password_confirmation: "" }

const PERKS = [
  { icon: "calendar", text: "Agendamento online de banho e tosa" },
  { icon: "clipboard", text: "Histórico e carteira de vacinação do pet" },
  { icon: "gift", text: "Descontos exclusivos para tutores cadastrados" },
  { icon: "truck", text: "Leva e traz com prioridade na agenda" },
]

export default function Conta() {
  const { user, login, register, logout } = useAuth()
  const [mode, setMode] = useState("cadastro")
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState([])
  const [ok, setOk] = useState("")
  const [loading, setLoading] = useState(false)

  const isCadastro = mode === "cadastro"

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function switchMode(next) {
    setMode(next)
    setForm(EMPTY)
    setErrors([])
    setOk("")
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErrors([])
    setOk("")

    const payload = isCadastro
      ? { ...form, phone: form.phone.replace(/\D/g, "") }
      : { email: form.email, password: form.password }

    try {
      const result = isCadastro ? await register(payload) : await login(payload)

      if (!result.ok) {
        setErrors(errorsFrom(result.data))
        return
      }

      setForm(EMPTY)
      setOk(
        isCadastro
          ? "Conta criada com sucesso, " + result.data.user.name + "! Bem-vindo à matilha."
          : "Login realizado. Bem-vindo de volta, " + result.data.user.name + "!"
      )
      setTimeout(() => go("inicio"), 900)
    } catch {
      setErrors(["Falha de conexão com o servidor. Tente novamente."])
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <section className="section">
        <div className="logged-card reveal">
          <div className="logged-avatar">
            <Icon name="user" size={30} />
          </div>
          <h2>Você já está logado</h2>
          <p className="section-sub">
            {user.name} · {user.email}
          </p>
          <div className="cta-actions">
            <a className="btn btn-primary" href="#/painel">
              Ir para o meu painel
            </a>
            <button className="btn btn-outline" type="button" onClick={logout}>
              <Icon name="logOut" size={17} /> Sair da conta
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="signup">
        <div className="signup-info reveal">
          <span className="kicker">ÁREA DO TUTOR</span>
          <h2>{isCadastro ? "Crie sua conta na PataAmiga" : "Entre na sua conta"}</h2>
          <p className="section-sub">
            {isCadastro
              ? "Cadastre-se para agendar banhos, acompanhar a rotina do seu cão e receber promoções exclusivas."
              : "Use o e-mail e a senha do seu cadastro para continuar."}
          </p>
          <ul className="signup-perks">
            {PERKS.map((p) => (
              <li key={p.text}>
                <span className="perk-icon">
                  <Icon name={p.icon} size={17} />
                </span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>

        <form className="signup-card reveal" onSubmit={handleSubmit} noValidate>
          <div className="signup-tabs">
            <button
              type="button"
              className={isCadastro ? "is-active" : ""}
              onClick={() => switchMode("cadastro")}
            >
              Criar conta
            </button>
            <button
              type="button"
              className={!isCadastro ? "is-active" : ""}
              onClick={() => switchMode("login")}
            >
              Entrar
            </button>
          </div>

          {ok && <div className="signup-alert signup-ok">{ok}</div>}

          {errors.length > 0 && (
            <div className="signup-alert signup-error">
              <strong>Confira os campos:</strong>
              <ul>
                {errors.map((msg) => (
                  <li key={msg}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          {isCadastro && (
            <label className="field">
              <span>Nome completo</span>
              <div className="field-input">
                <Icon name="user" size={17} />
                <input
                  type="text"
                  placeholder="Ex: Maria Silva"
                  value={form.name}
                  onChange={update("name")}
                  required
                />
              </div>
            </label>
          )}

          <label className="field">
            <span>E-mail</span>
            <div className="field-input">
              <Icon name="mail" size={17} />
              <input
                type="email"
                placeholder="voce@email.com"
                value={form.email}
                onChange={update("email")}
                required
              />
            </div>
          </label>

          {isCadastro && (
            <label className="field">
              <span>Telefone / WhatsApp</span>
              <div className="field-input">
                <Icon name="whatsapp" size={17} />
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: maskPhone(e.target.value) }))}
                  required
                />
              </div>
            </label>
          )}

          <label className="field">
            <span>Senha</span>
            <div className="field-input">
              <Icon name="lock" size={17} />
              <input
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={update("password")}
                required
              />
            </div>
          </label>

          {isCadastro && (
            <label className="field">
              <span>Confirmar senha</span>
              <div className="field-input">
                <Icon name="lock" size={17} />
                <input
                  type="password"
                  placeholder="Repita a senha"
                  value={form.password_confirmation}
                  onChange={update("password_confirmation")}
                  required
                />
              </div>
            </label>
          )}

          <button className="btn btn-primary signup-submit" type="submit" disabled={loading}>
            {loading ? (
              "Enviando..."
            ) : (
              <>
                <Icon name={isCadastro ? "check" : "logOut"} size={17} />
                {isCadastro ? "Criar minha conta" : "Entrar"}
              </>
            )}
          </button>

          <p className="signup-foot">
            {isCadastro ? "Já tem conta? " : "Ainda não tem conta? "}
            <button type="button" onClick={() => switchMode(isCadastro ? "login" : "cadastro")}>
              {isCadastro ? "Fazer login" : "Criar agora"}
            </button>
          </p>
        </form>
      </div>
    </section>
  )
}
