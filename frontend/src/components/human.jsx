// Petits éléments « faits main » : soulignement au feutre, note manuscrite, tirage photo scotché.
import { useInView } from "./motion";

/** Mot souligné d'un trait de feutre qui se dessine quand il apparaît. */
export function Scribble({ children }) {
  const [ref, visible] = useInView({ threshold: 0.6 });
  return (
    <span ref={ref} className={`scribble ${visible ? "is-drawn" : ""}`}>
      {children}
      <svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2 9.5c28-4.6 61-6.8 96-6.1 33 .6 66 2.6 99 5.4" />
        <path d="M14 12.2c40-2.8 92-3.6 150-1.3" className="scribble__second" />
      </svg>
    </span>
  );
}

/** Note manuscrite, avec une petite flèche optionnelle. */
export function Note({ children, fleche = "bas", className = "", style }) {
  return (
    <p className={`note-main note-main--${fleche} ${className}`} style={style}>
      {children}
      {fleche !== "aucune" && (
        <svg className="note-main__fleche" viewBox="0 0 60 50" aria-hidden="true">
          <path d="M6 6c10 22 22 32 44 36" />
          <path d="M38 34l12 8-14 3" />
        </svg>
      )}
    </p>
  );
}

/** Photo présentée comme un tirage papier scotché, légèrement de travers. */
export function Tirage({ src, legende, rotation = 0, className = "", eager = false }) {
  return (
    <figure className={`tirage ${className}`} style={{ "--r": `${rotation}deg` }}>
      <span className="tirage__scotch" aria-hidden="true" />
      <img src={src} alt={legende} loading={eager ? "eager" : "lazy"} />
      {legende && <figcaption>{legende}</figcaption>}
    </figure>
  );
}
