import { useEffect } from "react"

const NAV = [
  { label: "Início", href: "#home" },
  { label: "Serviços", href: "#servicos" },
  { label: "Raças", href: "#racas" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
]

const SERVICES = [
  { icon: "🛁", title: "Banho & Tosa", desc: "Seu melhor amigo cheiroso, com produtos hipoalergênicos e muito carinho." },
  { icon: "🏥", title: "Clínica Veterinária", desc: "Consultas, exames e vacinas com equipe especializada e atendimento 24h." },
  { icon: "🍖", title: "Nutrição Premium", desc: "Rações e petiscos selecionados para cada fase da vida do seu cão." },
  { icon: "🎾", title: "Creche & Daycare", desc: "Diversão monitorada e socialização todos os dias da semana." },
  { icon: "🚚", title: "Leva & Traz", desc: "Buscamos e devolvemos seu pet com todo conforto e segurança." },
  { icon: "🎓", title: "Adestramento", desc: "Educação positiva para um cão obediente, equilibrado e feliz." },
]

const BREEDS = [
  { emoji: "🐕", name: "Golden Retriever", tag: "Dócil & Companheiro", grad: "linear-gradient(135deg,#f6c453,#e89a3c)" },
  { emoji: "🐶", name: "Beagle", tag: "Curioso & Brincalhão", grad: "linear-gradient(135deg,#ff9a76,#ff6b6b)" },
  { emoji: "🐩", name: "Poodle", tag: "Inteligente & Elegante", grad: "linear-gradient(135deg,#8ec5fc,#5b8def)" },
  { emoji: "🦮", name: "Labrador", tag: "Leal & Ativo", grad: "linear-gradient(135deg,#a8e063,#56ab2f)" },
  { emoji: "🐕‍🦺", name: "Border Collie", tag: "Esperto & Ágil", grad: "linear-gradient(135deg,#c39bff,#7f53f7)" },
  { emoji: "🐾", name: "Shih Tzu", tag: "Fofinho & Tranquilo", grad: "linear-gradient(135deg,#ffb6c1,#ff7eb3)" },
]

const STATS = [
  { num: "12k+", label: "Cães felizes" },
  { num: "8", label: "Anos de história" },
  { num: "45", label: "Profissionais" },
  { num: "4.9", label: "Avaliação média" },
]

const TESTIMONIALS = [
  { name: "Mariana Alves", pet: "Tutora do Thor", text: "O Thor volta do banho radiante! A equipe trata cada pet como se fosse da família. Recomendo demais.", emoji: "🐾" },
  { name: "Rafael Souza", pet: "Tutor da Luna", text: "Melhor clínica da região. Atendimento rápido, carinhoso e com preço justo. Virei cliente fiel.", emoji: "❤️" },
  { name: "Camila Dias", pet: "Tutora do Bidu", text: "A creche salvou minha rotina! O Bidu chega em casa cansado e muito feliz todos os dias.", emoji: "⭐" },
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal")
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible")
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function App() {
  useReveal()

  return (
    <div className="app">
      <header className="nav">
        <a className="logo" href="#home">
          <span className="logo-paw">🐾</span> PataAmiga
        </a>
        <nav className="nav-links">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="btn btn-nav" href="#contato">Agendar</a>
      </header>

      <section id="home" className="hero">
        <div className="hero-bg" />
        <div className="paw paw-1">🐾</div>
        <div className="paw paw-2">🐾</div>
        <div className="paw paw-3">🦴</div>
        <div className="hero-inner">
          <span className="badge">🐶 Cuidado completo para o seu melhor amigo</span>
          <h1>
            Todo cão merece<br />
            <span className="grad-text">amor, banho e carinho.</span>
          </h1>
          <p className="hero-sub">
            Banho e tosa, clínica veterinária, creche e nutrição premium em um só lugar.
            Cuidamos do seu pet como se fosse nosso.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#contato">Agendar agora</a>
            <a className="btn btn-ghost" href="#servicos">Ver serviços</a>
          </div>
          <div className="hero-dogs">
            <span>🐕</span><span>🐩</span><span>🐶</span><span>🦮</span><span>🐕‍🦺</span>
          </div>
        </div>
      </section>

      <section id="servicos" className="section">
        <div className="section-head reveal">
          <span className="kicker">NOSSOS SERVIÇOS</span>
          <h2>Mimos de gente grande<br />para cães de todo tamanho</h2>
        </div>
        <div className="grid">
          {SERVICES.map((s) => (
            <article className="card reveal" key={s.title}>
              <div className="card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="racas" className="section section-alt">
        <div className="section-head reveal">
          <span className="kicker">CUIDADOS POR PERFIL</span>
          <h2>Toda raça tem seu jeitinho</h2>
          <p className="section-sub">Atendimento personalizado para cada porte, energia e personalidade.</p>
        </div>
        <div className="breeds">
          {BREEDS.map((b) => (
            <article className="breed reveal" key={b.name} style={{ background: b.grad }}>
              <div className="breed-emoji">{b.emoji}</div>
              <h3>{b.name}</h3>
              <span>{b.tag}</span>
            </article>
          ))}
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

      <section id="depoimentos" className="section">
        <div className="section-head reveal">
          <span className="kicker">DEPOIMENTOS</span>
          <h2>Quem ama, recomenda</h2>
        </div>
        <div className="grid">
          {TESTIMONIALS.map((t) => (
            <article className="quote reveal" key={t.name}>
              <div className="stars">★★★★★</div>
              <p>“{t.text}”</p>
              <div className="quote-author">
                <span className="avatar">{t.emoji}</span>
                <div>
                  <strong>{t.name}</strong>
                  <small>{t.pet}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contato" className="cta">
        <div className="cta-inner reveal">
          <div className="cta-emoji">🐾</div>
          <h2>Agende o primeiro banho do seu cão</h2>
          <p>Primeira consulta com <strong>20% de desconto</strong>. Vem fazer parte da matilha!</p>
          <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Seu nome" aria-label="Seu nome" />
            <input type="tel" placeholder="WhatsApp" aria-label="WhatsApp" />
            <button className="btn btn-primary" type="submit">Quero agendar</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <a className="logo" href="#home"><span className="logo-paw">🐾</span> PataAmiga</a>
          <nav className="footer-links">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 PataAmiga — Cuidado que abana o rabo 🐕</span>
          <span>Feito com ❤️ pela A3P Programação</span>
        </div>
      </footer>
    </div>
  )
}
