import { useState } from "react"

const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "")

const EMPTY = { name: "", email: "", phone: "", password: "", password_confirmation: "" }

function maskPhone(value) {
  const d = value.replace(/\D/g, "").slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export default function Cadastro() {
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
      const res = await fetch(`${API_BASE}/${isCadastro ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        if (data.errors) setErrors(Object.values(data.errors).flat())
        else setErrors([data.message || "Não foi possível concluir. Tente novamente."])
        return
      }

      setOk(
        isCadastro
          ? `Conta criada com sucesso, ${data.user.name}! 🐾 Já pode agendar com desconto.`
          : `Bem-vindo de volta, ${data.user.name}! 🐾`
      )
      setForm(EMPTY)
    } catch {
      setErrors(["Falha de conexão com o servidor. Tente novamente."])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="cadastro" className="section section-signup">
      <div className="signup">
        <div className="signup-info reveal">
          <span className="kicker">ÁREA DO TUTOR</span>
          <h2>{isCadastro ? "Crie sua conta na PataAmiga" : "Entre na sua conta"}</h2>
          <p className="section-sub">
            {isCadastro
              ? "Cadastre-se para agendar banhos, acompanhar a rotina do seu cão e receber promoções exclusivas da matilha."
              : "Use o e-mail e a senha do seu cadastro para continuar."}
          </p>
          <ul className="signup-perks">
            <li>🛁 Agendamento online de banho e tosa</li>
            <li>📋 Histórico e carteira de vacinação do pet</li>
            <li>🎁 Descontos exclusivos para tutores cadastrados</li>
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
              <strong>Ops, confira os campos:</strong>
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
              <input
                type="text"
                placeholder="Ex: Maria Silva"
                value={form.name}
                onChange={update("name")}
                required
              />
            </label>
          )}

          <label className="field">
            <span>E-mail</span>
            <input
              type="email"
              placeholder="voce@email.com"
              value={form.email}
              onChange={update("email")}
              required
            />
          </label>

          {isCadastro && (
            <label className="field">
              <span>Telefone / WhatsApp</span>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: maskPhone(e.target.value) }))}
                required
              />
            </label>
          )}

          <label className="field">
            <span>Senha</span>
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={update("password")}
              required
            />
          </label>

          {isCadastro && (
            <label className="field">
              <span>Confirmar senha</span>
              <input
                type="password"
                placeholder="Repita a senha"
                value={form.password_confirmation}
                onChange={update("password_confirmation")}
                required
              />
            </label>
          )}

          <button className="btn btn-primary signup-submit" type="submit" disabled={loading}>
            {loading ? "Enviando..." : isCadastro ? "Criar minha conta 🐾" : "Entrar"}
          </button>

          <p className="signup-foot">
            {isCadastro ? "Já tem conta? " : "Ainda não tem conta? "}
            <button
              type="button"
              onClick={() => switchMode(isCadastro ? "login" : "cadastro")}
            >
              {isCadastro ? "Fazer login" : "Criar agora"}
            </button>
          </p>
        </form>
      </div>
    </section>
  )
}
