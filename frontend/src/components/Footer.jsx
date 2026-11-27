import { Link } from "react-router-dom";
import { TELEPHONE, TELEPHONE_HREF } from "./Header";

const ANNEE = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div>
          <Link to="/" className="logo logo--light">
            <span className="logo__mark">VS</span>
            <span className="logo__text">
              Visuel<strong>Signal</strong>
            </span>
          </Link>
          <p className="footer__intro">
            Conception, fabrication et pose d'enseignes, d'habillages de façade et de
            signalétique pour les commerces et les entreprises.
          </p>
          <p className="footer__main">À bientôt devant votre vitrine !</p>
        </div>

        <div>
          <h4>L'atelier</h4>
          <p>
            Adresse à compléter<br />
            <a href={TELEPHONE_HREF}>{TELEPHONE}</a><br />
            <a href="mailto:contact@visuel-signal.fr">contact@visuel-signal.fr</a>
          </p>
          <Link to="/contact" className="footer__lien-fort">Nous contacter</Link>
        </div>

        <div>
          <h4>Prestations</h4>
          <ul>
            <li><Link to="/enseignes/lumineuses">Enseignes lumineuses</Link></li>
            <li><Link to="/enseignes/non-lumineuses">Enseignes non lumineuses</Link></li>
            <li><Link to="/habillage-facades">Habillage de façades</Link></li>
            <li><Link to="/signaletique/plv-ilv">PLV / ILV</Link></li>
            <li><Link to="/signaletique/flocage-vehicules">Flocage véhicules</Link></li>
            <li><Link to="/signaletique/vitrophanie">Vitrophanie &amp; adhésifs</Link></li>
          </ul>
        </div>

        <div>
          <h4>Informations</h4>
          <ul>
            <li><Link to="/realisations">Réalisations</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/devis">Demander un devis</Link></li>
            <li><a href="#">Mentions légales</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">© {ANNEE} Visuel Signal. Tous droits réservés.</div>
      </div>
    </footer>
  );
}
