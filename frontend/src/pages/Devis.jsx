import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CountUp, Reveal, useTilt } from "../components/motion";
import { CtaBand } from "../components/CtaBand";
import DevisForm from "../components/DevisForm";
import RealisationsMosaic from "../components/RealisationsMosaic";
import Methode from "../components/Methode";
import { PHOTO_HERO } from "../data/demo";
import { Scribble } from "../components/human";

export default function Devis() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <div className="breadcrumb container">
        <Link to="/">Accueil</Link> <span>›</span> Enseigne professionnelle
      </div>
      <Hero />
      <Marquee />
      <DevisForm />
      <Stats />
      <Atouts />
      <RealisationsMosaic />
      <Methode />
      <CtaBand />
    </>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero() {
  const points = [
    { icon: "✦", label: "Sur mesure" },
    { icon: "⚡", label: "Rapide" },
    { icon: "◆", label: "Qualité / Prix" },
    { icon: "★", label: "Savoir-faire atelier" },
  ];
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow">Créez votre enseigne sur mesure !</p>
          <h1>
            Faire réaliser une enseigne <Scribble>lumineuse</Scribble>, en relief ou en drapeau
          </h1>
          <p className="hero__lead">
            De la conception graphique à la pose, notre équipe fabrique votre enseigne dans
            notre atelier et l'installe sur votre façade.
          </p>
          <ul className="hero__points">
            {points.map((p, i) => (
              <li key={p.label} style={{ "--i": i }}>
                <span className="hero__icon">{p.icon}</span>
                {p.label}
              </li>
            ))}
          </ul>
          <div className="hero__ctas">
            <a href="#formulaire-devis" className="btn btn--accent">
              Demander un devis <span className="btn__arrow">→</span>
            </a>
            <Link to="/realisations" className="btn btn--outline">Nos réalisations</Link>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  const tiltRef = useTilt(10);
  const [texte, setTexte] = useState(0);
  const mots = ["VOTRE ENSEIGNE", "BOULANGERIE", "CAFÉ · BAR", "INSTITUT"];

  // Change le texte de l'enseigne toutes les 4,5 s
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTexte((t) => (t + 1) % mots.length), 4500);
    return () => clearInterval(id);
  }, [mots.length]);

  return (
    <div className="hero__visual" aria-hidden="true">
      <div className="tilt" ref={tiltRef}>
        <div className="facade facade--photo">
          <img src={PHOTO_HERO} alt="" className="facade__photo" fetchPriority="high" />
          <div className="facade__shade" />
          <div className="facade__glare" />
          <div className="neon-plate">
            <small>Aperçu de votre enseigne</small>
            <span className="facade__letters" key={texte}>
              {[...mots[texte]].map((c, i) => (
                <span key={i} style={{ "--i": i }}>{c === " " ? " " : c}</span>
              ))}
            </span>
          </div>
        </div>
        <div className="badge badge--a">
          <b>BAT</b> sous 48 h
        </div>
        <div className="badge badge--b">
          <span className="badge__dot" /> LED basse conso
        </div>
      </div>
      <p className="hero__caption">Photo de test : remplacez-la par une de vos réalisations</p>
    </div>
  );
}

/* ---------------------------------------------------------------- Bande défilante */

function Marquee() {
  const items = [
    "Enseignes lumineuses", "Lettres 3D", "Caissons LED", "Enseignes drapeau",
    "Habillage de façade", "Vitrophanie", "Totems", "Signalétique", "Flocage véhicules", "PLV",
  ];
  const ligne = (
    <div className="marquee__track">
      {items.map((t) => (
        <span key={t}>{t}<i>✦</i></span>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-hidden="true">
      {ligne}
      {ligne}
    </div>
  );
}

/* ---------------------------------------------------------------- Chiffres */

function Stats() {
  // ⚠️ Valeurs d'exemple : remplacez-les par vos vrais chiffres.
  const stats = [
    { to: 500, suffix: "+", label: "enseignes posées" },
    { to: 12, suffix: " ans", label: "d'expérience" },
    { to: 24, suffix: " h", label: "pour répondre à votre devis" },
    { to: 98, suffix: " %", label: "de clients satisfaits" },
  ];
  return (
    <section className="stats">
      <div className="container stats__grid">
        {stats.map((s, i) => (
          <Reveal key={s.label} className="stat" delay={i * 120}>
            <span className="stat__num"><CountUp to={s.to} suffix={s.suffix} /></span>
            <span className="stat__label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Atouts */

function Atouts() {
  const items = [
    { n: "01", titre: "Cabinet graphique", texte: "Nos graphistes conçoivent ou adaptent votre identité visuelle et réalisent la maquette de votre enseigne." },
    { n: "02", titre: "Conseils en marketing", texte: "Visibilité, lisibilité, réglementation locale : nous vous guidons vers la solution la plus efficace." },
    { n: "03", titre: "Fabrication en atelier", texte: "Découpe, lettrage, éclairage LED : votre enseigne est fabriquée dans notre atelier, sur mesure." },
    { n: "04", titre: "Livraison et pose", texte: "Nos poseurs installent votre enseigne en toute sécurité, dans le respect des normes en vigueur." },
  ];
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Nos savoir-faire</p>
          <h2>Un interlocuteur unique, de l'idée à la pose</h2>
        </Reveal>
        <div className="cards-4">
          {items.map((i, idx) => (
            <Reveal key={i.n} delay={idx * 110}>
            <article className="atout">
              <span className="atout__num">{i.n}</span>
              <h3>{i.titre}</h3>
              <p>{i.texte}</p>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
