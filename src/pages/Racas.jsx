import Icon from "../Icons"

const BREEDS = [
  { name: "Golden Retriever", tag: "Dócil & Companheiro", care: "Tosa higiênica", grad: "linear-gradient(135deg,#f6c453,#e8892c)" },
  { name: "Beagle", tag: "Curioso & Brincalhão", care: "Banho semanal", grad: "linear-gradient(135deg,#ff9a76,#e01b24)" },
  { name: "Poodle", tag: "Inteligente & Elegante", care: "Tosa na tesoura", grad: "linear-gradient(135deg,#8ec5fc,#4b6fe0)" },
  { name: "Labrador", tag: "Leal & Ativo", care: "Nutrição fitness", grad: "linear-gradient(135deg,#a8e063,#3f9142)" },
  { name: "Border Collie", tag: "Esperto & Ágil", care: "Adestramento", grad: "linear-gradient(135deg,#c39bff,#6a3de0)" },
  { name: "Shih Tzu", tag: "Fofinho & Tranquilo", care: "Cuidado ocular", grad: "linear-gradient(135deg,#ffb6c1,#e0186b)" },
  { name: "Bulldog Francês", tag: "Tranquilo & Afetuoso", care: "Pele e dobras", grad: "linear-gradient(135deg,#f9d976,#c9862c)" },
  { name: "Pinscher", tag: "Vivo & Corajoso", care: "Socialização", grad: "linear-gradient(135deg,#9aa6b2,#3c4a58)" },
]

const CARE = [
  { icon: "bath", title: "Porte pequeno", desc: "Banhos mais frequentes e tosa leve, com atenção especial à pele sensível." },
  { icon: "health", title: "Raças braquicefálicas", desc: "Cuidado redobrado na respiração e na temperatura durante o banho." },
  { icon: "graduation", title: "Cães de trabalho", desc: "Adestramento e atividade física para gastar energia de verdade." },
  { icon: "clipboard", title: "Filhotes", desc: "Protocolo de vacinas e socialização desde as primeiras semanas." },
]

export default function Racas() {
  return (
    <>
      <section className="page-head">
        <div className="page-head-inner reveal">
          <span className="kicker">CUIDADOS POR PERFIL</span>
          <h1>Toda raça tem o seu jeitinho</h1>
          <p className="section-sub">
            Atendimento personalizado para cada porte, energia e personalidade. Aqui vale muito
            mais que o tamanho.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="breeds">
          {BREEDS.map((b) => (
            <article className="breed reveal" key={b.name} style={{ background: b.grad }}>
              <div className="breed-icon">
                <Icon name="paw" size={30} filled />
              </div>
              <h3>{b.name}</h3>
              <span>{b.tag}</span>
              <span className="breed-care">
                <Icon name="sparkles" size={14} /> {b.care}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div className="section-head reveal">
          <span className="kicker">ATENÇÃO ESPECIAL</span>
          <h2>O que olhamos antes de começar</h2>
        </div>
        <div className="grid grid-2">
          {CARE.map((c) => (
            <article className="card card-row reveal" key={c.title}>
              <div className="card-icon">
                <Icon name={c.icon} size={24} />
              </div>
              <div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-inner reveal">
          <div className="cta-icon">
            <Icon name="heart" size={28} filled />
          </div>
          <h2>Seu cão é de raça ou SRD? A gente cuida igual</h2>
          <p>Agende uma avaliação gratuita e monte o plano de cuidado ideal.</p>
          <div className="cta-actions">
            <a className="btn btn-primary" href="#/contato">
              Agendar avaliação
            </a>
            <a className="btn btn-ghost" href="#/servicos">
              Ver serviços
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
