import { useEffect, useState } from "react";
import { Link, Navigate, NavLink, useParams } from "react-router-dom";
import { ENSEIGNES } from "../data/enseignes";
import { CtaBand } from "../components/CtaBand";
import { Reveal, useInView, useTilt } from "../components/motion";
import { Lightbulb, TextAa } from "@phosphor-icons/react";
import { Scribble } from "../components/human";

export default function Enseignes() {
  const { type } = useParams();
  const page = ENSEIGNES[type];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (page) document.title = `${page.nom}, Visuel Signal`;
  }, [page]);

  if (!page) return <Navigate to="/enseignes/lumineuses" replace />;

  const autre = ENSEIGNES[type === "lumineuses" ? "non-lumineuses" : "lumineuses"];
  const lienDevis = `/devis?eclairage=${page.eclairage}#formulaire-devis`;

  // key={type} : on remonte toute la page quand on passe d'un type à l'autre, pour rejouer les animations
  return (
    <div key={type} className={`ens ens--${type}`}>
      <div className="breadcrumb container">
        <Link to="/">Accueil</Link> <span>›</span> Enseignes <span>›</span> {page.court}
      </div>

      <Hero page={page} lienDevis={lienDevis} />
      <Avantages page={page} />
      <Types page={page} />
      <Options page={page} />
      <Faq page={page} />
      <AutreType autre={autre} />
      <CtaBand to={lienDevis} titre={`Votre ${page.singulier} : devis gratuit !`} />
    </div>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero({ page, lienDevis }) {
  const tiltRef = useTilt(8);
  const [a, b, c] = page.titre;

  return (
    <section className="hero ens-hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <nav className="ens-switch" aria-label="Type d'enseigne">
            {Object.values(ENSEIGNES).map((e) => (
              <NavLink key={e.slug} to={`/enseignes/${e.slug}`} className="ens-switch__item">
                {e.slug === "lumineuses" ? <Lightbulb size={16} weight="duotone" /> : <TextAa size={16} weight="duotone" />}
                {e.court}
              </NavLink>
            ))}
          </nav>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>
            {a} <Scribble>{b}</Scribble> {c}
          </h1>
          <p className="hero__lead">{page.lead}</p>
          <ul className="check-list check-list--dark">
            {page.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <div className="hero__ctas">
            <Link to={lienDevis} className="btn btn--accent">
              Demander un devis <span className="btn__arrow">→</span>
            </Link>
            <a href="#types" className="btn btn--outline">Voir les modèles</a>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="tilt" ref={tiltRef}>
            <div className="facade facade--photo">
              <img src={page.photo} alt="" className="facade__photo" fetchPriority="high" />
              <div className="facade__shade" />
              <div className="facade__glare" />
            </div>
          </div>
          <p className="hero__caption">Photo de test : remplacez-la par une de vos réalisations</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Avantages */

function Avantages({ page }) {
  return (
    <section className="ens-avantages">
      <div className="container ens-avantages__grid">
        {page.avantages.map((av, i) => (
          <Reveal key={av.titre} delay={i * 120} className="ens-avantage">
            <span className="ens-avantage__icon">{av.icon}</span>
            <div>
              <h3>{av.titre}</h3>
              <p>{av.texte}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Types */

function Types({ page }) {
  return (
    <section className="section" id="types">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Nos modèles</p>
          <h2>Quel type d'{page.singulier} choisir ?</h2>
          <p className="muted">
            Chaque enseigne est fabriquée sur mesure à partir de votre logo et des dimensions de votre façade.
          </p>
        </Reveal>

        <div className="ens-types">
          {page.types.map((t, i) => (
            <Reveal key={t.titre} delay={(i % 3) * 120}>
              <article className="ens-type">
                <div className="ens-type__img">
                  <img src={t.photo} alt={t.titre} loading="lazy" />
                  <span className="ens-type__num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="ens-type__body">
                  <h3>{t.titre}</h3>
                  <p>{t.texte}</p>
                  <ul className="ens-tags">
                    {t.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <p className="ens-type__ideal">
                    <b>Idéal pour :</b> {t.ideal}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Options */

function Options({ page }) {
  const [ref, visible] = useInView({ threshold: 0.2 });
  return (
    <section className="section ens-options">
      <div className="container ens-options__grid">
        <Reveal from="left" className="ens-options__intro">
          <p className="eyebrow eyebrow--light">Sur mesure</p>
          <h2>{page.options.titre}</h2>
          <div className="ens-regle">
            <h3>⚖ Réglementation</h3>
            <p>{page.reglementation}</p>
          </div>
        </Reveal>
        <ul ref={ref} className={`ens-options__list ${visible ? "is-visible" : ""}`}>
          {page.options.items.map(([titre, texte], i) => (
            <li key={titre} style={{ "--i": i }}>
              <span className="ens-options__check">✓</span>
              <div>
                <b>{titre}</b>
                <span>{texte}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- FAQ */

function Faq({ page }) {
  const [ouvert, setOuvert] = useState(0);
  return (
    <section className="section">
      <div className="container ens-faq">
        <Reveal className="section__head">
          <p className="eyebrow">Questions fréquentes</p>
          <h2>Vos questions sur les {page.nom.toLowerCase()}</h2>
          <Link to="/faq" className="btn btn--outline">Toute la FAQ</Link>
        </Reveal>
        <div className="accordion">
          {page.faq.map(([q, r], i) => {
            const actif = ouvert === i;
            return (
              <Reveal key={q} delay={i * 90} className={`accordion__item ${actif ? "is-open" : ""}`}>
                <button
                  className="accordion__q"
                  aria-expanded={actif}
                  onClick={() => setOuvert(actif ? -1 : i)}
                >
                  {q}
                  <span className="accordion__icon" aria-hidden="true">+</span>
                </button>
                <div className="accordion__a">
                  <div><p>{r}</p></div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Lien vers l'autre type */

function AutreType({ autre }) {
  return (
    <section className="section section--soft ens-autre-wrap">
      <div className="container">
        <Reveal>
          <Link to={`/enseignes/${autre.slug}`} className="ens-autre">
            <img src={autre.photo} alt="" loading="lazy" />
            <div className="ens-autre__body">
              <p className="eyebrow eyebrow--light">Découvrez aussi</p>
              <h2>{autre.nom}</h2>
              <p>{autre.lead}</p>
              <span className="btn btn--accent">Voir les {autre.court.toLowerCase()} <span className="btn__arrow">→</span></span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
