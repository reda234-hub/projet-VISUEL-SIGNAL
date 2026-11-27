import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, Storefront, Car, Signpost, Article, TextAa } from "@phosphor-icons/react";
import { Reveal } from "../components/motion";
import { Note, Scribble, Tirage } from "../components/human";
import { CtaBand } from "../components/CtaBand";
import RealisationsMosaic from "../components/RealisationsMosaic";
import Methode from "../components/Methode";
import { ENSEIGNES } from "../data/enseignes";
import { PHOTO_ATELIER, PHOTO_OUTILS, SERVICES } from "../data/services";

const METIERS = [
  { to: "/enseignes/lumineuses", titre: "Enseignes lumineuses", texte: "Lettres LED, caissons, néons, drapeaux.", photo: ENSEIGNES.lumineuses.types[0].photo, Icon: Lightbulb },
  { to: "/habillage-facades", titre: "Habillage de façades", texte: "Bandeaux, bardage, stores.", photo: SERVICES["habillage-facades"].photos[0].src, Icon: Storefront },
  { to: "/enseignes/non-lumineuses", titre: "Enseignes non lumineuses", texte: "Lettres découpées, métal, bois.", photo: ENSEIGNES["non-lumineuses"].types[0].photo, Icon: TextAa },
  { to: "/signaletique/flocage-vehicules", titre: "Flocage véhicules", texte: "Du lettrage au covering complet.", photo: SERVICES["flocage-vehicules"].photos[0].src, Icon: Car },
  { to: "/signaletique/vitrophanie", titre: "Vitrophanie", texte: "Vitrines, dépoli, décors.", photo: SERVICES.vitrophanie.photos[0].src, Icon: Article },
  { to: "/signaletique/plv-ilv", titre: "PLV et ILV", texte: "Kakémonos, totems, présentoirs.", photo: SERVICES["plv-ilv"].photos[0].src, Icon: Signpost },
];

export default function Accueil() {
  useEffect(() => {
    document.title = "Visuel Signal, enseignes et signalétique sur mesure";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AccueilHero />
      <Metiers />
      <MotAtelier />
      <section className="accueil-reals">
        <RealisationsMosaic />
      </section>
      <Methode />
      <CtaBand to="/devis#formulaire-devis" titre="Un projet d'enseigne ? Parlons-en." />
    </>
  );
}

function AccueilHero() {
  return (
    <section className="a-hero">
      <div className="container a-hero__grid">
        <div className="a-hero__texte">
          <h1>
            On fabrique les enseignes qui font <Scribble>entrer</Scribble> vos clients.
          </h1>
          <p className="a-hero__lead">
            Dessinées avec vous, fabriquées dans notre atelier, posées par notre équipe.
          </p>
          <div className="hero__ctas">
            <Link to="/devis#formulaire-devis" className="btn btn--accent">
              Demander un devis <ArrowRight size={18} weight="bold" className="btn__arrow" />
            </Link>
            <Link to="/realisations" className="btn btn--outline">Voir nos réalisations</Link>
          </div>
        </div>

        <div className="a-hero__collage" aria-label="Quelques réalisations">
          <Tirage src={ENSEIGNES.lumineuses.photo} legende="Lettres boîtiers, posées de nuit" rotation={-4} className="collage-1" eager />
          <Tirage src={SERVICES.vitrophanie.photos[0].src} legende="Dorure sur vitrine" rotation={5} className="collage-2" eager />
          <Tirage src={PHOTO_OUTILS} legende="À l'atelier" rotation={-2} className="collage-3" />
          <Note className="a-hero__note" fleche="bas">tout est fait ici,<br />pas de sous-traitance</Note>
        </div>
      </div>
    </section>
  );
}

function Metiers() {
  return (
    <section className="section metiers">
      <div className="container">
        <Reveal className="metiers__head">
          <h2>Ce qu'on fabrique</h2>
          <Note fleche="aucune" className="metiers__note">cliquez pour voir le détail</Note>
        </Reveal>
        <div className="metiers__grid">
          {METIERS.map((m, i) => (
            <Reveal key={m.to} delay={(i % 3) * 90} className={`metier metier--${i + 1}`}>
              <Link to={m.to} className="metier__lien">
                <img src={m.photo} alt="" loading="lazy" />
                <span className="metier__voile" />
                <span className="metier__icone"><m.Icon size={22} weight="duotone" /></span>
                <span className="metier__texte">
                  <strong>{m.titre}</strong>
                  <span>{m.texte}</span>
                </span>
                <ArrowRight className="metier__fleche" size={20} weight="bold" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MotAtelier() {
  return (
    <section className="section mot">
      <div className="container mot__grid">
        <Reveal from="left" className="mot__photo">
          <Tirage src={PHOTO_ATELIER} legende="Un mardi matin à l'atelier" rotation={-3} />
        </Reveal>
        <Reveal from="right" className="mot__lettre">
          <h2>Un seul interlocuteur, du croquis à la pose</h2>
          <p>
            Quand vous nous appelez, c'est la personne qui suivra votre chantier qui décroche.
            On vient voir votre façade, on dessine une maquette sur une photo de votre commerce,
            et on ne lance la fabrication qu'une fois que vous avez validé.
          </p>
          <p>
            Les lettres sont découpées et assemblées chez nous, puis posées par notre propre
            équipe. Si quelque chose ne va pas, vous savez qui appeler.
          </p>
          <p className="mot__signature">L'équipe Visuel Signal</p>
        </Reveal>
      </div>
    </section>
  );
}
