import { useAuth } from "../AuthContext"
import { firstName, initials, maskPhone } from "../api"
import Icon from "../Icons"

const SHORTCUTS = [
  { icon: "bath", title: "Banho & Tosa", desc: "Agende em 2 toques" },
  { icon: "health", title: "Veterinário", desc: "Consulta e vacinas" },
  { icon: "ball", title: "Creche", desc: "Diária monitorada" },
  { icon: "truck", title: "Leva & Traz", desc: "Buscamos seu pet" },
]

export default function Painel() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <section className="section">
        <div className="logged-card reveal">
          <div className="logged-avatar muted">
            <Icon name="lock" size={28} />
          </div>
          <h2>Você precisa entrar na sua conta</h2>
          <p className="section-sub">
            Crie uma conta ou faça login para ver o seu painel de tutor.
          </p>
          <div className="cta-actions">
            <a className="btn btn-primary" href="#/conta">
              Entrar ou criar conta
            </a>
            <a className="btn btn-ghost" href="#/inicio">
              Voltar ao início
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="painel-head">
        <div className="painel-head-inner reveal">
          <span className="painel-avatar">{initials(user.name)}</span>
          <div>
            <span className="kicker">MEU PAINEL</span>
            <h1>Olá, {firstName(user.name)}</h1>
            <p>Gerencie seus agendamentos e dados da conta.</p>
          </div>
          <button className="btn btn-outline btn-sm" type="button" onClick={logout}>
            <Icon name="logOut" size={16} /> Sair
          </button>
        </div>
      </section>

      <section className="section">
        <div className="panel-grid">
          <article className="panel-card reveal">
            <h3>
              <Icon name="user" size={18} /> Dados da conta
            </h3>
            <div className="panel-rows">
              <div className="panel-row">
                <span>Nome</span>
                <strong>{user.name}</strong>
              </div>
              <div className="panel-row">
                <span>E-mail</span>
                <strong>{user.email}</strong>
              </div>
              <div className="panel-row">
                <span>Telefone</span>
                <strong>{maskPhone(user.phone) || "não informado"}</strong>
              </div>
              <div className="panel-row">
                <span>Status</span>
                <strong className="ok-badge">
                  <Icon name="check" size={14} /> conta ativa
                </strong>
              </div>
            </div>
          </article>

          <article className="panel-card reveal">
            <h3>
              <Icon name="shield" size={18} /> Segurança
            </h3>
            <div className="panel-rows">
              <div className="panel-row">
                <span>Senha</span>
                <strong>protegida com hash</strong>
              </div>
              <div className="panel-row">
                <span>Sessão</span>
                <strong>token Bearer ativo</strong>
              </div>
              <div className="panel-row">
                <span>Servidor</span>
                <strong>API PataAmiga</strong>
              </div>
            </div>
            <p className="panel-note">
              Seus dados trafegam por HTTPS e a senha nunca é exibida de volta pela API.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-head reveal">
          <span className="kicker">AGENDAMENTO RÁPIDO</span>
          <h2>O que vamos fazer hoje?</h2>
        </div>
        <div className="grid grid-4">
          {SHORTCUTS.map((s) => (
            <a className="quick reveal" href="#/contato" key={s.title}>
              <span className="quick-icon">
                <Icon name={s.icon} size={22} />
              </span>
              <strong>{s.title}</strong>
              <small>{s.desc}</small>
              <Icon name="arrowRight" size={16} />
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
