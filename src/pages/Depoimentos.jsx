import Icon from "../Icons"

const QUOTES = [
  {
    name: "Mariana Alves",
    pet: "Tutora do Thor",
    text: "O Thor volta do banho radiante. A equipe trata cada pet como se fosse da família. Recomendo demais.",
    rating: 5,
  },
  {
    name: "Rafael Souza",
    pet: "Tutor da Luna",
    text: "Melhor clínica da região. Atendimento rápido, carinhoso e com preço justo. Virei cliente fiel.",
    rating: 5,
  },
  {
    name: "Camila Dias",
    pet: "Tutora do Bidu",
    text: "A creche salvou minha rotina. O Bidu chega em casa cansado e muito feliz todos os dias.",
    rating: 5,
  },
  {
    name: "João Pedro Lima",
    pet: "Tutor do Max",
    text: "O leva e traz é pontual e o motorista trata o Max super bem. Ganhei tempo no dia a dia.",
    rating: 4,
  },
  {
    name: "Fernanda Rocha",
    pet: "Tutora da Nina",
    text: "O plano alimentar mudou a vida da Nina, que vivia com problema de pele. Equipe nota dez.",
    rating: 5,
  },
  {
    name: "Lucas Martins",
    pet: "Tutor do Bolt",
    text: "Adestramento com reforço positivo funcionou de verdade. Em um mês o Bolt já respondia aos comandos.",
    rating: 5,
  },
]

const SCORES = [
  { label: "Atendimento", value: 98 },
  { label: "Cuidado com o pet", value: 97 },
  { label: "Pontualidade", value: 94 },
  { label: "Preço justo", value: 92 },
]

function Stars({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" size={15} filled={i <= rating} />
      ))}
    </div>
  )
}

export default function Depoimentos() {
  return (
    <>
      <section className="page-head">
        <div className="page-head-inner reveal">
          <span className="kicker">DEPOIMENTOS</span>
          <h1>Quem ama, recomenda</h1>
          <p className="section-sub">
            Mais de 12 mil cães atendidos e uma média de 4.9 estrelas em avaliações de tutores.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="rating-box reveal">
          <div className="rating-score">
            <strong>4.9</strong>
            <Stars rating={5} />
            <span>baseado em 1.284 avaliações</span>
          </div>
          <div className="rating-bars">
            {SCORES.map((s) => (
              <div className="rating-row" key={s.label}>
                <span>{s.label}</span>
                <div className="rating-track">
                  <div className="rating-fill" style={{ width: s.value + "%" }} />
                </div>
                <strong>{s.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid grid-3">
          {QUOTES.map((q) => (
            <article className="quote reveal" key={q.name}>
              <Stars rating={q.rating} />
              <p>{q.text}</p>
              <div className="quote-author">
                <span className="avatar">
                  <Icon name="user" size={20} />
                </span>
                <div>
                  <strong>{q.name}</strong>
                  <small>{q.pet}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-inner reveal">
          <div className="cta-icon">
            <Icon name="message" size={28} />
          </div>
          <h2>Quer contar a sua história também?</h2>
          <p>Agende um serviço e depois mande a foto do seu pet sorrindo para a gente.</p>
          <div className="cta-actions">
            <a className="btn btn-primary" href="#/contato">
              Agendar serviço
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
