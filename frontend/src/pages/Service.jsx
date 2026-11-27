import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight, PushPin } from "@phosphor-icons/react";
import { SERVICES } from "../data/services";
import { Reveal, useInView } from "../components/motion";
import { Note, Scribble, Tirage } from "../components/human";
import { CtaBand } from "../components/CtaBand";

export default function Service({ slug }) {
  const page = SERVICES[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (page) document.title = `${page.nom}, Visuel Signal`;
  }, [page]);

  if (!page) return <Navigate to="/" replace />;

  const autres = Object.values(SERVICES).filter((s) => s.slug !== slug);
  const [debut, accent, fin] = page.titre;

  return (
    <div key={slug}>
      <div className="breadcrumb container">
        <Link to="/">Accueil</Link> <span>›</span> {page.nom}
      </div>

      {/* Hero : texte à gauche, tirages photo à droite */}
      <section className="s-hero">
        <div className="container s-hero__grid">
          <div className="s-hero__texte">
            <h1>
              {debut} <Scribble>{accent}</Scribble> {fin}
            </h1>
            <p className="a-hero__lead">{page.lead}</p>
            <div className="hero__ctas">
              <Link to="/devis#formulaire-devis" className="btn btn--accent">
                Demander un devis <ArrowRight size={18} weight="bold" className="btn__arrow" />
              </Link>
              <a href="#prestations" className="btn btn--outline">Ce qu'on propose</a>
            </div>
            <Note className="s-hero__note" fleche="aucune">{page.note}</Note>
          </div>
          <div className="s-hero__tirages">
            <Tirage src={page.photos[0].src} legende={page.photos[0].legende} rotation={2.5} className="s-tirage-1" eager />
            <Tirage src={page.photos[1].src} legende={page.photos[1].legende} rotation={-5} className="s-tirage-2" eager />
          </div>
        </div>
      </section>

      {/* Prestations : grande photo + liste */}
      <section className="section" id="prestations">
        <div className="container presta">
          <Reveal from="left" className="presta__photo">
            <img src={page.photos[2].src} alt={page.photos[2].legende} loading="lazy" />
          </Reveal>
          <div className="presta__liste">
            <Reveal><h2>Ce qu'on propose</h2></Reveal>
            {page.prestations.map((p, i) => (
              <Reveal key={p.titre} delay={i * 80} className="presta__item">
                <h3>{p.titre}</h3>
                <p>{p.texte}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Etapes etapes={page.etapes} />

      {/* Bon à savoir : notes épinglées */}
      <section className="section section--soft">
        <div className="container">
          <Reveal><h2 className="center-sm">Bon à savoir</h2></Reveal>
          <div className="postits">
            {page.aSavoir.map((t, i) => (
              <Reveal key={t} delay={i * 120} className={`postit postit--${i + 1}`}>
                <PushPin className="postit__punaise" size={22} weight="fill" aria-hidden="true" />
                <p>{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Autres services */}
      <section className="section autres">
        <div className="container">
          <Reveal><h2>On fait aussi</h2></Reveal>
          <div className="autres__liste">
            {autres.map((s, i) => (
              <Reveal key={s.slug} delay={i * 90}>
                <Link to={s.slug === "habillage-facades" ? "/habillage-facades" : `/signaletique/${s.slug}`} className="autre">
                  <img src={s.photos[0].src} alt="" loading="lazy" />
                  <span>{s.nom}</span>
                  <ArrowRight size={18} weight="bold" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand to="/devis#formulaire-devis" titre={`${page.nom} : on vous fait un devis.`} />
    </div>
  );
}

/** Étapes reliées par un trait de feutre qui se dessine. */
function Etapes({ etapes }) {
  const [ref, visible] = useInView({ threshold: 0.3 });
  return (
    <section className="section etapes-wrap">
      <div className="container">
        <Reveal><h2>Comment ça se passe</h2></Reveal>
        <ol ref={ref} className={`etapes ${visible ? "is-visible" : ""}`}>
          <svg className="etapes__trait" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
            <path d="M10 22c80-14 160 10 240-2s160-16 250 0 170 14 250-2 160-10 240 4" />
          </svg>
          {etapes.map(([titre, texte], i) => (
            <li key={titre} style={{ "--i": i }}>
              <span className="etapes__rond">{i + 1}</span>
              <h3>{titre}</h3>
              <p>{texte}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
