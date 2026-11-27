import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, X, MapPin, PushPin, SquaresFour, HandGrabbing, Sparkle, DiceFive,
} from "@phosphor-icons/react";
import { getRealisation, getRealisations } from "../api/client";
import { DEMO_REALISATIONS, UTILISER_DEMO } from "../data/demo";
import { Reveal, useInView } from "../components/motion";
import { Note, Scribble } from "../components/human";
import { CtaBand } from "../components/CtaBand";

const liste = (data) => (Array.isArray(data) ? data : data?.results ?? []);

// Regroupe les prestations en grandes familles pour garder des filtres lisibles.
export function famille(service = "") {
  const s = service.toLowerCase();
  if (/flocage|véhicule|vehicule|covering/.test(s)) return "Flocage";
  if (/vitro|vitrine|adhésif|adhesif/.test(s)) return "Vitrophanie";
  if (/plv|ilv|kakémono|totem/.test(s)) return "PLV";
  if (/façade|facade|habillage|bardage/.test(s)) return "Façades";
  return "Enseignes";
}

// Annotations manuscrites du projet à la une (uniquement pour la photo de test).
// Positions en % de l'image : à adapter quand vous mettrez votre propre photo.
const ANNOTATIONS_DEMO = {
  "demo-1": [
    { x: 58, y: 30, texte: "plexi bleu découpé", cote: "droite" },
    { x: 30, y: 74, texte: "lettrage 3D en relief", cote: "gauche" },
    { x: 72, y: 82, texte: "fixation invisible", cote: "droite" },
  ],
};

// Petit générateur pseudo-aléatoire : le « désordre » du mur est le même à chaque visite.
const hasard = (n) => {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

/* ---------------------------------------------------------------- Page */

export default function Realisations() {
  const [items, setItems] = useState(null);
  const [filtre, setFiltre] = useState("Tout");
  // Sur téléphone, on démarre en grille : déplacer des photos au doigt gênerait le défilement.
  const [vue, setVue] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches ? "grille" : "mur"
  ); // "mur" | "grille"
  const [ouverte, setOuverte] = useState(null);
  const [melange, setMelange] = useState(0);

  useEffect(() => {
    document.title = "Nos réalisations, Visuel Signal";
    window.scrollTo(0, 0);
    getRealisations()
      .then((data) => {
        const l = liste(data);
        setItems(l.length || !UTILISER_DEMO ? l : DEMO_REALISATIONS);
      })
      .catch(() => setItems(UTILISER_DEMO ? DEMO_REALISATIONS : []));
  }, []);

  const familles = useMemo(() => {
    const compte = new Map();
    (items ?? []).forEach((r) => {
      const f = famille(r.service);
      compte.set(f, (compte.get(f) ?? 0) + 1);
    });
    return [["Tout", items?.length ?? 0], ...compte];
  }, [items]);

  const visibles = (items ?? []).filter((r) => filtre === "Tout" || famille(r.service) === filtre);
  const vedette = (items ?? []).find((r) => r.en_vedette) ?? items?.[0];

  return (
    <>
      <section className="rx-head">
        <div className="container rx-head__grid">
          <div>
            <div className="breadcrumb"><Link to="/">Accueil</Link> <span>›</span> Réalisations</div>
            <h1>Des enseignes <Scribble>posées</Scribble>, pas des maquettes.</h1>
            <p className="a-hero__lead">
              Voici le mur de l'atelier : on y épingle les photos de nos chantiers une fois la pose terminée.
            </p>
          </div>
          {items?.length > 0 && (
            <p className="rx-compteur" aria-label={`${items.length} chantiers`}>
              <span className="rx-compteur__num">{items.length}</span>
              <span className="rx-compteur__txt">chantiers<br />épinglés</span>
            </p>
          )}
        </div>

      </section>

      {items?.length > 0 && (
        <Etabli
          familles={familles}
          filtre={filtre}
          onFiltre={setFiltre}
          vue={vue}
          onVue={setVue}
          nbVisibles={visibles.length}
          melange={melange}
          onMelanger={() => setMelange((m) => m + 1)}
        />
      )}

      <section className="rx-contenu">
        <div className="container">
          {items === null && <div className="rx-mur rx-mur--chargement" aria-label="Chargement" />}

          {items?.length === 0 && (
            <div className="r-vide">
              <h2>Le mur est encore vide</h2>
              <p>Ajoutez vos chantiers dans l'administration Django, ils seront épinglés ici.</p>
            </div>
          )}

          {visibles.length > 0 && vue === "mur" && (
            <Mur key={`${filtre}-${melange}`} items={visibles} melange={melange} onOuvrir={setOuverte} />
          )}
          {visibles.length > 0 && vue === "grille" && (
            <Grille key={filtre} items={visibles} onOuvrir={setOuverte} />
          )}
        </div>
      </section>

      {vedette && <ALaUne projet={vedette} />}

      {ouverte !== null && visibles[ouverte] && (
        <Visionneuse items={visibles} index={ouverte} onChange={setOuverte} onClose={() => setOuverte(null)} />
      )}

      <CtaBand to="/devis#formulaire-devis" titre="Votre façade pourrait être la prochaine sur le mur." />
    </>
  );
}

/* ---------------------------------------------------------------- L'établi (barre d'outils) */

const COULEURS_RUBAN = ["#f3e6c4", "#ffd9c7", "#d9ecdf", "#dfe7f5", "#f6dcea", "#efe3b8"];

function Etabli({ familles, filtre, onFiltre, vue, onVue, nbVisibles, melange, onMelanger }) {
  const [refBarre, colle] = useCollee();

  return (
    <div ref={refBarre} className={`etabli ${colle ? "is-stuck" : ""}`}>
      <div className="container etabli__inner">
        <div className="etabli__rubans" role="tablist" aria-label="Filtrer par métier">
          {familles.map(([f, n], i) => (
            <button
              key={f}
              role="tab"
              aria-selected={filtre === f}
              className={`ruban ${filtre === f ? "is-active" : ""}`}
              style={{
                "--ruban": COULEURS_RUBAN[i % COULEURS_RUBAN.length],
                "--rr": `${(hasard(i + 3) - 0.5) * 6}deg`,
              }}
              onClick={() => onFiltre(f)}
            >
              <span className="ruban__txt">{f}</span>
              <span className="ruban__pastille">{n}</span>
            </button>
          ))}
        </div>

        <div className="etabli__outils">
          <p className="etabli__resultat" aria-live="polite" key={`${filtre}-${nbVisibles}`}>
            <strong>{nbVisibles}</strong> {nbVisibles > 1 ? "photos" : "photo"}
          </p>

          {vue === "mur" && (
            <button className="de" onClick={onMelanger} aria-label="Remélanger les photos" title="Remélanger">
              <DiceFive key={melange} className={melange ? "de__icone is-rolling" : "de__icone"} size={26} weight="duotone" />
              <span>Remélanger</span>
            </button>
          )}

          <button
            className={`levier levier--${vue}`}
            role="switch"
            aria-checked={vue === "grille"}
            aria-label={vue === "mur" ? "Affichage mur, passer en grille" : "Affichage grille, passer en mur"}
            onClick={() => onVue(vue === "mur" ? "grille" : "mur")}
          >
            <span className={`levier__label ${vue === "mur" ? "is-on" : ""}`}><PushPin size={16} weight="duotone" /> Mur</span>
            <span className="levier__rail"><span className="levier__bouton" /></span>
            <span className={`levier__label ${vue === "grille" ? "is-on" : ""}`}><SquaresFour size={16} weight="duotone" /> Grille</span>
          </button>
        </div>
      </div>

      {vue === "mur" && (
        <div className="container">
          <Note fleche="aucune" className="etabli__astuce">
            <HandGrabbing size={20} weight="duotone" /> attrapez une photo pour la déplacer
          </Note>
        </div>
      )}
      <span className="etabli__regle" aria-hidden="true" />
    </div>
  );
}

/** true quand la barre est collée sous le menu (repère placé juste au-dessus d'elle). */
function useCollee() {
  const ref = useRef(null);
  const [colle, setColle] = useState(false);
  useEffect(() => {
    const barre = ref.current;
    if (!barre || !("IntersectionObserver" in window)) return;
    const repere = document.createElement("div");
    repere.style.height = "1px";
    barre.before(repere);
    const hauteurMenu = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 110;
    const obs = new IntersectionObserver(([e]) => setColle(!e.isIntersecting && e.boundingClientRect.top < hauteurMenu), {
      rootMargin: `-${hauteurMenu}px 0px 0px 0px`,
    });
    obs.observe(repere);
    return () => {
      obs.disconnect();
      repere.remove();
    };
  }, []);
  return [ref, colle];
}

/* ---------------------------------------------------------------- Le mur */

function Mur({ items, melange, onOuvrir }) {
  const [colonnes, setColonnes] = useState(4);
  const [decalages, setDecalages] = useState({}); // id -> {x, y} ajoutés par l'utilisateur
  const [ordre, setOrdre] = useState({}); // id -> z-index
  const zMax = useRef(10);
  const [refVue, visible] = useInView({ threshold: 0.05 });

  // Nombre de colonnes selon la largeur, sans écouter le défilement
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const maj = () => setColonnes(mq.matches ? 3 : 4);
    maj();
    mq.addEventListener("change", maj);
    return () => mq.removeEventListener("change", maj);
  }, []);

  const HAUTEUR_RANG = 300;
  const rangs = Math.ceil(items.length / colonnes);

  const positions = useMemo(
    () =>
      items.map((r, i) => {
        const col = i % colonnes;
        const rang = Math.floor(i / colonnes);
        const g = i + melange * 17;
        return {
          col,
          jitter: hasard(g) * 26, // décalage horizontal en px, borné pour rester dans le panneau
          top: rang * HAUTEUR_RANG + 30 + hasard(g + 3) * 60 + (col % 2 ? 40 : 0),
          r: (hasard(g + 7) - 0.5) * 14,
          epingle: hasard(g + 11) > 0.5,
        };
      }),
    [items, colonnes, melange]
  );

  const devant = (id) => {
    zMax.current += 1;
    setOrdre((o) => ({ ...o, [id]: zMax.current }));
  };

  return (
    <div className="rx-mur-wrap">
      <div
        ref={refVue}
        className={`rx-mur ${visible ? "is-visible" : ""}`}
        style={{ height: rangs * HAUTEUR_RANG + 140 }}
      >
        {items.map((r, i) => (
          <Epingle
            key={r.id}
            r={r}
            pos={positions[i]}
            index={i}
            decalage={decalages[r.id]}
            z={ordre[r.id]}
            colonnes={colonnes}
            onDebut={() => devant(r.id)}
            onFin={(d) => setDecalages((o) => ({ ...o, [r.id]: d }))}
            onClic={() => onOuvrir(i)}
          />
        ))}
      </div>
    </div>
  );
}

/** Une photo épinglée, déplaçable à la souris ou au doigt. */
function Epingle({ r, pos, index, decalage = { x: 0, y: 0 }, z, colonnes, onDebut, onFin, onClic }) {
  const el = useRef(null);
  const drag = useRef(null);

  const applique = useCallback((x, y, actif) => {
    if (!el.current) return;
    el.current.style.setProperty("--dx", `${x}px`);
    el.current.style.setProperty("--dy", `${y}px`);
    el.current.classList.toggle("is-dragging", actif);
  }, []);

  useEffect(() => applique(decalage.x, decalage.y, false), [decalage.x, decalage.y, applique]);

  const down = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    el.current.setPointerCapture(e.pointerId);
    drag.current = { sx: e.clientX, sy: e.clientY, x0: decalage.x, y0: decalage.y, bouge: false };
    onDebut();
  };
  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (Math.abs(dx) + Math.abs(dy) > 5) d.bouge = true;
    if (d.bouge) applique(d.x0 + dx, d.y0 + dy, true);
  };
  const up = (e) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.bouge) {
      applique(d.x0, d.y0, false);
      onClic();
      return;
    }
    const x = d.x0 + e.clientX - d.sx;
    const y = d.y0 + e.clientY - d.sy;
    applique(x, y, false);
    onFin({ x, y });
  };

  return (
    <figure
      ref={el}
      className="rx-photo"
      style={{
        // 24 px de marge de chaque côté du panneau, puis une colonne par photo
        left: `calc(24px + ${pos.col} * (100% - 48px) / ${colonnes} + ${pos.jitter}px)`,
        top: pos.top,
        width: `calc((100% - 48px) / ${colonnes} - 34px)`,
        zIndex: z ?? 1,
        "--r": `${pos.r}deg`,
        "--i": index,
      }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onClic())}
      tabIndex={0}
      role="button"
      aria-label={`${r.titre}. Appuyez sur Entrée pour agrandir.`}
    >
      {pos.epingle
        ? <PushPin className="rx-photo__punaise" size={26} weight="fill" aria-hidden="true" />
        : <span className="tirage__scotch" aria-hidden="true" />}
      <img src={r.image_principale} alt="" draggable="false" loading="lazy" />
      <figcaption>
        <strong>{r.titre}</strong>
        <span>{[r.service, r.ville].filter(Boolean).join(", ")}</span>
      </figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------- Vue grille */

function Grille({ items, onOuvrir }) {
  return (
    <div className="r-galerie rx-grille">
      {items.map((r, i) => (
        <Reveal key={r.id} delay={(i % 3) * 80} className="r-carte">
          <button className="r-carte__btn" onClick={() => onOuvrir(i)} aria-label={`Agrandir : ${r.titre}`}>
            <img src={r.image_principale} alt={r.titre} loading="lazy" />
          </button>
          <div className="r-carte__info">
            <h3>{r.titre}</h3>
            <p>{[r.service, r.ville].filter(Boolean).join(", ")}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- Projet à la une */

function ALaUne({ projet }) {
  const notes = ANNOTATIONS_DEMO[projet.slug] ?? [];
  const [ref, visible] = useInView({ threshold: 0.35 });

  return (
    <section className="section rx-une">
      <div className="container rx-une__grid">
        <div ref={ref} className={`rx-une__photo ${visible ? "is-visible" : ""}`}>
          <img src={projet.image_principale.replace(/w=\d+/, "w=1400")} alt={projet.titre} loading="lazy" />
          {notes.map((n, i) => (
            <span
              key={n.texte}
              className={`rx-annot rx-annot--${n.cote}`}
              style={{ left: `${n.x}%`, top: `${n.y}%`, "--i": i }}
            >
              <span className="rx-annot__point" />
              <span className="rx-annot__texte">{n.texte}</span>
            </span>
          ))}
        </div>
        <Reveal from="right" className="rx-une__texte">
          <p className="rx-une__badge"><Sparkle size={16} weight="fill" /> À la une</p>
          <h2>{projet.titre}</h2>
          <ul className="r-detail__meta">
            {projet.service && <li>{projet.service}</li>}
            {projet.ville && <li><MapPin size={16} weight="bold" /> {projet.ville}</li>}
          </ul>
          <p>
            {projet.description ||
              "Un projet complet : relevé de la façade, maquette validée sur photo, fabrication à l'atelier puis pose par notre équipe."}
          </p>
          <Link to={`/realisations/${projet.slug}`} className="btn btn--dark">
            Voir le projet <ArrowRight size={18} weight="bold" className="btn__arrow" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** Visionneuse plein écran : flèches du clavier, Échap pour fermer. */
function Visionneuse({ items, index, onChange, onClose }) {
  const r = items[index];
  const fermerRef = useRef(null);
  const prec = () => onChange((index - 1 + items.length) % items.length);
  const suiv = () => onChange((index + 1) % items.length);

  useEffect(() => {
    fermerRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onChange, onClose]);

  return (
    <div className="visio" role="dialog" aria-modal="true" aria-label={r.titre} onClick={onClose}>
      <figure className="visio__figure" onClick={(e) => e.stopPropagation()} key={r.id}>
        <img src={r.image_principale.replace(/w=\d+/, "w=1600")} alt={r.titre} />
        <figcaption>
          <strong>{r.titre}</strong>
          <span>{[r.service, r.ville].filter(Boolean).join(", ")}</span>
          {!String(r.id).startsWith("d") && (
            <Link to={`/realisations/${r.slug}`}>Voir le projet</Link>
          )}
        </figcaption>
      </figure>
      <button className="visio__btn visio__btn--prec" onClick={(e) => { e.stopPropagation(); prec(); }} aria-label="Photo précédente">
        <ArrowLeft size={22} weight="bold" />
      </button>
      <button className="visio__btn visio__btn--suiv" onClick={(e) => { e.stopPropagation(); suiv(); }} aria-label="Photo suivante">
        <ArrowRight size={22} weight="bold" />
      </button>
      <button ref={fermerRef} className="visio__btn visio__fermer" onClick={onClose} aria-label="Fermer">
        <X size={22} weight="bold" />
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------- Détail d'un projet */

export function RealisationDetail() {
  const { slug } = useParams();
  const [projet, setProjet] = useState(undefined); // undefined = chargement, null = introuvable

  useEffect(() => {
    window.scrollTo(0, 0);
    const demo = DEMO_REALISATIONS.find((r) => r.slug === slug);
    if (demo) {
      setProjet({ ...demo, photos: [] });
      return;
    }
    getRealisation(slug)
      .then((p) => {
        setProjet(p);
        document.title = `${p.titre}, Visuel Signal`;
      })
      .catch(() => setProjet(null));
  }, [slug]);

  if (projet === undefined) {
    return <div className="container section"><div className="r-carte r-carte--squelette r-detail__squelette" /></div>;
  }
  if (projet === null) {
    return (
      <div className="container section r-vide">
        <h1>Projet introuvable</h1>
        <Link to="/realisations" className="btn btn--outline">Retour aux réalisations</Link>
      </div>
    );
  }

  return (
    <>
      <section className="section r-detail">
        <div className="container r-detail__grid">
          <div>
            <div className="breadcrumb">
              <Link to="/">Accueil</Link> <span>›</span> <Link to="/realisations">Réalisations</Link> <span>›</span> {projet.titre}
            </div>
            <h1>{projet.titre}</h1>
            <ul className="r-detail__meta">
              {projet.service && <li>{projet.service}</li>}
              {projet.ville && <li><MapPin size={16} weight="bold" /> {projet.ville}</li>}
              {projet.client && <li>Client : {projet.client}</li>}
              {projet.date_realisation && <li>{new Date(projet.date_realisation).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</li>}
            </ul>
            {projet.description ? <p className="a-hero__lead">{projet.description}</p> : (
              <Note fleche="aucune">description à ajouter dans l'admin</Note>
            )}
            <Link to="/devis#formulaire-devis" className="btn btn--accent">Demander un devis</Link>
          </div>
          <img className="r-detail__img" src={projet.image_principale} alt={projet.titre} />
        </div>
        {projet.photos?.length > 0 && (
          <div className="container r-galerie r-detail__photos">
            {projet.photos.map((ph) => (
              <figure key={ph.id} className="r-carte">
                <img src={ph.image} alt={ph.legende || projet.titre} loading="lazy" />
                {ph.legende && <figcaption className="r-carte__info"><p>{ph.legende}</p></figcaption>}
              </figure>
            ))}
          </div>
        )}
      </section>
      <CtaBand to="/devis#formulaire-devis" titre="Un projet similaire ? Parlons-en." />
    </>
  );
}
