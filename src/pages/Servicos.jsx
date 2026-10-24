import Icon from "../Icons"

const SERVICES = [
  {
    icon: "bath",
    title: "Banho & Tosa",
    desc: "Banho relaxante com produtos hipoalergênicos, tosa na tesoura ou máquina e finalização com perfume pet.",
    price: "a partir de R$ 59",
    tags: ["Hipoalergênico", "Secagem suave", "Tosa higiênica"],
  },
  {
    icon: "health",
    title: "Clínica Veterinária",
    desc: "Consultas, exames laboratoriais, vacinas e acompanhamento contínuo com plantão de emergência 24h.",
    price: "consulta R$ 120",
    tags: ["Plantão 24h", "Vacinas", "Exames"],
  },
  {
    icon: "bone",
    title: "Nutrição Premium",
    desc: "Rações, petiscos naturais e plano alimentar personalizado conforme porte, idade e rotina do pet.",
    price: "plano sob medida",
    tags: ["Natural", "Sem transgênico", "Sob medida"],
  },
  {
    icon: "ball",
    title: "Creche & Daycare",
    desc: "Diversão monitorada, socialização e atividades guiadas todos os dias da semana, com relatório diário.",
    price: "diária R$ 75",
    tags: ["Monitorado", "Relatório", "Grupos por porte"],
  },
  {
    icon: "truck",
    title: "Leva & Traz",
    desc: "Buscamos e devolvemos o seu pet com veículo adaptado, cinto de segurança e motorista treinado.",
    price: "grátis na assinatura",
    tags: ["Veículo adaptado", "Seguro", "Pontual"],
  },
  {
    icon: "graduation",
    title: "Adestramento",
    desc: "Educação positiva para um cão obediente e equilibrado: comandos básicos, socialização e comportamento.",
    price: "aula R$ 95",
    tags: ["Reforço positivo", "Individual", "Em grupo"],
  },
]

const PLANS = [
  { name: "Avulso", price: "R$ 0", note: "pague por uso", items: ["Agendamento online", "Histórico do pet", "Suporte no WhatsApp"] },
  {
    name: "Clube Mensal",
    price: "R$ 189",
    note: "por mês",
    featured: true,
    items: ["4 banhos por mês", "Leva e traz grátis", "10% off na clínica", "Prioridade na agenda"],
  },
  { name: "Clube Família", price: "R$ 279", note: "até 2 cães", items: ["8 banhos por mês", "Leva e traz grátis", "15% off na clínica", "Fotos e relatório diário"] },
]

export default function Servicos() {
  return (
    <>
      <section className="page-head">
        <div className="page-head-inner reveal">
          <span className="kicker">NOSSOS SERVIÇOS</span>
          <h1>Cuidado sob medida para cada fase da vida</h1>
          <p className="section-sub">
            Estrutura completa, equipe especializada e carinho de sobra. Escolha o que o seu cão
            precisa hoje.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="grid grid-3">
          {SERVICES.map((s) => (
            <article className="card card-service reveal" key={s.title}>
              <div className="card-icon">
                <Icon name={s.icon} size={26} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="chips">
                {s.tags.map((t) => (
                  <span className="chip" key={t}>
                    <Icon name="tag" size={13} /> {t}
                  </span>
                ))}
              </div>
              <div className="card-foot">
                <strong>{s.price}</strong>
                <a className="btn btn-primary btn-sm" href="#/contato">
                  Agendar
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-head reveal">
          <span className="kicker">PLANOS</span>
          <h2>Assine e economize o ano todo</h2>
        </div>
        <div className="grid grid-3">
          {PLANS.map((p) => (
            <article className={"plan reveal" + (p.featured ? " is-featured" : "")} key={p.name}>
              {p.featured && <span className="plan-flag">Mais escolhido</span>}
              <h3>{p.name}</h3>
              <div className="plan-price">
                <strong>{p.price}</strong>
                <small>{p.note}</small>
              </div>
              <ul>
                {p.items.map((i) => (
                  <li key={i}>
                    <Icon name="check" size={16} /> {i}
                  </li>
                ))}
              </ul>
              <a className={"btn " + (p.featured ? "btn-primary" : "btn-outline")} href="#/conta">
                Começar agora
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-inner reveal">
          <div className="cta-icon">
            <Icon name="calendar" size={28} />
          </div>
          <h2>Ficou na dúvida de qual serviço escolher?</h2>
          <p>Nossa equipe monta o pacote ideal para o seu pet em poucos minutos.</p>
          <div className="cta-actions">
            <a className="btn btn-primary" href="#/contato">
              Falar com a equipe
            </a>
            <a className="btn btn-ghost" href="#/racas">
              Ver cuidados por raça
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
