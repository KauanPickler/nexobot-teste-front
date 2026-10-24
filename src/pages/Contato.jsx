import { useState } from "react"
import Icon from "../Icons"

const INFO = [
  { icon: "mapPin", title: "Endereço", value: "Av. dos Cachorros, 120 — Centro" },
  { icon: "phone", title: "Telefone", value: "(47) 99999-0000" },
  { icon: "mail", title: "E-mail", value: "contato@pataamiga.com.br" },
  { icon: "clock", title: "Horário", value: "Seg a Sáb, 8h às 19h" },
]

export default function Contato() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", pet: "", service: "Banho & Tosa" })

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setForm({ name: "", phone: "", pet: "", service: "Banho & Tosa" })
  }

  return (
    <>
      <section className="page-head">
        <div className="page-head-inner reveal">
          <span className="kicker">CONTATO</span>
          <h1>Vamos agendar o próximo mimo</h1>
          <p className="section-sub">
            Preencha o formulário e a nossa equipe confirma o horário pelo WhatsApp em poucos
            minutos.
          </p>
        </div>
      </section>

      <section className="section contact-grid">
        <div className="contact-info reveal">
          <h2>Fale com a PataAmiga</h2>
          <p className="section-sub">
            Atendimento humano, resposta rápida e agenda aberta de segunda a sábado.
          </p>

          <div className="info-list">
            {INFO.map((i) => (
              <div className="info-item" key={i.title}>
                <span className="info-icon">
                  <Icon name={i.icon} size={20} />
                </span>
                <div>
                  <strong>{i.title}</strong>
                  <span>{i.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-channels">
            <a className="btn btn-primary" href="#/contato">
              <Icon name="whatsapp" size={18} /> Chamar no WhatsApp
            </a>
            <a className="btn btn-outline" href="#/conta">
              <Icon name="user" size={17} /> Criar conta
            </a>
          </div>
        </div>

        <form className="contact-card reveal" onSubmit={handleSubmit}>
          <h3>Agendar serviço</h3>

          {sent && (
            <div className="signup-alert signup-ok">
              Pedido enviado. Vamos confirmar o horário pelo WhatsApp.
            </div>
          )}

          <label className="field">
            <span>Seu nome</span>
            <input
              type="text"
              placeholder="Ex: Maria Silva"
              value={form.name}
              onChange={update("name")}
              required
            />
          </label>

          <label className="field">
            <span>WhatsApp</span>
            <input
              type="tel"
              placeholder="(00) 00000-0000"
              value={form.phone}
              onChange={update("phone")}
              required
            />
          </label>

          <label className="field">
            <span>Nome do pet</span>
            <input
              type="text"
              placeholder="Ex: Thor"
              value={form.pet}
              onChange={update("pet")}
            />
          </label>

          <label className="field">
            <span>Serviço desejado</span>
            <select value={form.service} onChange={update("service")}>
              <option>Banho & Tosa</option>
              <option>Clínica Veterinária</option>
              <option>Nutrição Premium</option>
              <option>Creche & Daycare</option>
              <option>Leva & Traz</option>
              <option>Adestramento</option>
            </select>
          </label>

          <button className="btn btn-primary signup-submit" type="submit">
            <Icon name="send" size={17} /> Enviar pedido
          </button>
        </form>
      </section>
    </>
  )
}
