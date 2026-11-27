import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";
import DevisForm from "../components/DevisForm";
import { Note, Scribble } from "../components/human";
import { TELEPHONE, TELEPHONE_HREF } from "../components/Header";

const EMAIL = "contact@visuel-signal.fr";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact, Visuel Signal";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="r-head contact-head">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Accueil</Link> <span>›</span> Contact</div>
          <h1>Un projet, une question ? <Scribble>Écrivez-nous.</Scribble></h1>
          <p className="a-hero__lead">Par téléphone, par mail ou avec le formulaire ci-dessous. On répond sous 24 h ouvrées.</p>

          <div className="contact-cartes">
            <a href={TELEPHONE_HREF} className="contact-carte">
              <Phone size={26} weight="duotone" />
              <span>Téléphone</span>
              <strong>{TELEPHONE}</strong>
            </a>
            <a href={`mailto:${EMAIL}`} className="contact-carte">
              <EnvelopeSimple size={26} weight="duotone" />
              <span>Email</span>
              <strong>{EMAIL}</strong>
            </a>
            <div className="contact-carte">
              <MapPin size={26} weight="duotone" />
              <span>Atelier</span>
              <strong>Adresse à compléter</strong>
            </div>
            <div className="contact-carte">
              <Clock size={26} weight="duotone" />
              <span>Horaires</span>
              <strong>Lun. au ven., 8 h à 18 h</strong>
            </div>
          </div>
        </div>
      </section>

      <DevisForm
        intro={
          <>
            <h2>Nous écrire</h2>
            <p>
              Décrivez votre besoin en quelques lignes. Une photo de votre façade nous aide
              beaucoup à vous répondre vite et juste.
            </p>
            <Note fleche="droite" className="contact-note">une photo prise au téléphone suffit</Note>
          </>
        }
      />
    </>
  );
}
