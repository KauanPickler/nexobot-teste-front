import Icon from "../Icons"

const HIGHLIGHTS = [
  {
    icon: "bath",
    title: "Banho & Tosa",
    desc: "Produtos hipoalergênicos, secagem suave e muito carinho em cada detalhe.",
  },
  {
    icon: "health",
    title: "Clínica Veterinária",
    desc: "Consultas, exames e vacinas com equipe especializada e plantão 24h.",
  },
  {
    icon: "bone",
    title: "Nutrição Premium",
    desc: "Rações e petiscos selecionados para cada fase da vida do seu cão.",
  },
]

const STATS = [
  { num: "12k+", label: "Cães felizes" },
  { num: "8", label: "Anos de história" },
  { num: "45", label: "Profissionais" },
  { num: "4.9", label: "Avaliação média" },
]

const STEPS = [
  { icon: "clipboard", title: "Crie sua conta", desc: "Cadastro rápido com nome, e-mail e telefone." },
  { icon: "calendar", title: "Escolha o horário", desc: "Agendamento online, sem fila e sem espera." },
  { icon: "truck", title: "A gente busca", desc: "Leva e traz com conforto e segurança." },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-inner">
          <span className="badge">
            <Icon name="shield" size={15} /> Cuidado completo para o seu melhor amigo
          </span>
          <h1>
            Todo cão merece
            <br />
            <span className="grad-text">amor, banho e carinho.</span>
          </h1>
          <p className="hero-sub">
            Banho e tosa, clínica veterinária, creche e nutrição premium em um só lugar. Cuidamos
            do seu pet como se fosse nosso.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#/contato">
              <Icon name="calendar" size={18} /> Agendar agora
            </a>
            <a className="btn btn-ghost" href="#/servicos">
              Ver serviços <Icon name="arrowRight" size={17} />
            </a>
          </div>

          <div className="hero-pills">
            <span>
              <Icon name="check" size={15} /> Primeira visita com 20% off
            </span>
            <span>
              <Icon name="check" size={15} /> Leva e traz incluso
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head reveal">
          <span className="kicker">O QUE FAZEMOS</span>
          <h2>
            Mimos de gente grande
            <br />
            para cães de todo tamanho
          </h2>
          <p className="section-sub">
            Três pilares de cuidado, uma equipe apaixonada por pets.
          </p>
        </div>
        <div className="grid grid-3">
          {HIGHLIGHTS.map((h) => (
            <article className="card reveal" key={h.title}>
              <div className="card-icon">
                <Icon name={h.icon} size={26} />
              </div>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
            </article>
          ))}
        </div>
        <div className="section-cta reveal">
          <a className="btn btn-outline" href="#/servicos">
            Ver todos os serviços <Icon name="arrowRight" size={17} />
          </a>
        </div>
      </section>

      <section className="stats">
        {STATS.map((s) => (
          <div className="stat reveal" key={s.label}>
            <strong>{s.num}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-head reveal">
          <span className="kicker">COMO FUNCIONA</span>
          <h2>Simples do começo ao fim</h2>
        </div>
        <div className="grid grid-3">
          {STEPS.map((s, i) => (
            <article className="step reveal" key={s.title}>
              <span className="step-num">0{i + 1}</span>
              <div className="step-icon">
                <Icon name={s.icon} size={24} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="promo">
        <div className="promo-inner reveal">
          <div className="promo-icon">
            <Icon name="gift" size={28} />
          </div>
          <div>
            <h2>Clube PataAmiga</h2>
            <p>
              Tutor cadastrado ganha <strong>20% de desconto</strong> na primeira visita e
              promoções exclusivas todo mês.
            </p>
          </div>
          <a className="btn btn-primary" href="#/conta">
            Criar minha conta
          </a>
        </div>
      </section>

      <section className="cta">
        <div className="cta-inner reveal">
          <div className="cta-icon">
            <Icon name="paw" size={30} filled />
          </div>
          <h2>Agende o primeiro banho do seu cão</h2>
          <p>
            Primeira consulta com <strong>20% de desconto</strong>. Venha fazer parte da matilha.
          </p>
          <div className="cta-actions">
            <a className="btn btn-primary" href="#/contato">
              Quero agendar
            </a>
            <a className="btn btn-ghost" href="#/servicos">
              Conhecer serviços
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
