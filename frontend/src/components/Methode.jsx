import { Reveal, useInView } from "./motion";

/* ---------------------------------------------------------------- Méthode */

export default function Methode() {
  const [ref, visible] = useInView({ threshold: 0.3 });
  const etapes = [
    { titre: "Votre demande", texte: "Vous remplissez le formulaire ou nous appelez pour nous présenter votre projet." },
    { titre: "Devis et BAT", texte: "Nous vous adressons un devis détaillé et une maquette à valider (bon à tirer)." },
    { titre: "Fabrication", texte: "Après validation, votre enseigne est fabriquée dans notre atelier." },
    { titre: "Pose ou livraison", texte: "Nous posons votre enseigne ou vous la livrons, prête à installer." },
  ];
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Notre méthode</p>
          <h2>De votre demande à la pose</h2>
        </Reveal>
        <ol className={`steps ${visible ? "is-visible" : ""}`} ref={ref}>
          {etapes.map((e, i) => (
            <li key={e.titre} className="step" style={{ "--i": i }}>
              <span className="step__num">{i + 1}</span>
              <h3>{e.titre}</h3>
              <p>{e.texte}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
