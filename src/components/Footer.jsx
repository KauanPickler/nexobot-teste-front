import Icon from "../Icons"
import { NAV_KEYS, ROUTES } from "../router"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a className="logo" href="#/inicio">
            <span className="logo-badge">
              <Icon name="paw" size={17} filled />
            </span>
            <span className="logo-text light">
              Pata<em>Amiga</em>
            </span>
          </a>
          <p>
            Banho e tosa, clínica veterinária, creche e nutrição premium para o seu melhor
            amigo. Cuidado que abana o rabo.
          </p>
          <div className="footer-social">
            <a href="#/contato" aria-label="Instagram">
              <Icon name="instagram" size={18} />
            </a>
            <a href="#/contato" aria-label="WhatsApp">
              <Icon name="whatsapp" size={18} />
            </a>
            <a href="#/contato" aria-label="Telefone">
              <Icon name="phone" size={18} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Navegar</h4>
          {NAV_KEYS.map((key) => (
            <a key={key} href={ROUTES[key].path}>
              {ROUTES[key].label}
            </a>
          ))}
        </div>

        <div className="footer-col">
          <h4>Contato</h4>
          <span className="footer-line">
            <Icon name="mapPin" size={15} /> Av. dos Cachorros, 120 — Centro
          </span>
          <span className="footer-line">
            <Icon name="phone" size={15} /> (47) 99999-0000
          </span>
          <span className="footer-line">
            <Icon name="mail" size={15} /> contato@pataamiga.com.br
          </span>
          <span className="footer-line">
            <Icon name="clock" size={15} /> Seg a Sáb, 8h às 19h
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 PataAmiga — todos os direitos reservados</span>
        <span className="footer-credit">
          Feito com <Icon name="heart" size={14} filled /> pela A3P Programação
        </span>
      </div>
    </footer>
  )
}
