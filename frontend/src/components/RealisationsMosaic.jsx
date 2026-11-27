import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRealisations } from "../api/client";
import { Reveal } from "./motion";
import { DEMO_REALISATIONS, UTILISER_DEMO } from "../data/demo";

/* ---------------------------------------------------------------- Réalisations */

export default function RealisationsMosaic() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    getRealisations()
      .then((data) => {
        const liste = Array.isArray(data) ? data : data.results ?? [];
        setItems((liste.length || !UTILISER_DEMO ? liste : DEMO_REALISATIONS).slice(0, 8));
      })
      .catch(() => setItems(UTILISER_DEMO ? DEMO_REALISATIONS.slice(0, 8) : []));
  }, []);

  return (
    <section className="section section--soft">
      <div className="container">
        <Reveal className="section__head section__head--split">
          <div>
            <p className="eyebrow">Réalisations</p>
            <h2>Nos dernières enseignes posées</h2>
          </div>
          <Link to="/realisations" className="btn btn--outline">Voir toutes nos réalisations</Link>
        </Reveal>

        <div className="reals-grid">
          {items === null &&
            [0, 1, 2, 3].map((i) => <div key={i} className="real real--skeleton" />)}
          {items?.length === 0 && (
            <p className="muted">Nos réalisations seront bientôt présentées ici.</p>
          )}
          {items?.map((r, idx) => (
            <Reveal key={r.id} delay={idx * 110}>
            <Link to={`/realisations/${r.slug}`} className="real">
              <div className="real__img">
                {r.image_principale ? <img src={r.image_principale} alt={r.titre} loading="lazy" /> : <span>VS</span>}
              </div>
              <div className="real__body">
                <h3>{r.titre}</h3>
                <p>{[r.service, r.ville].filter(Boolean).join(" · ")}</p>
              </div>
              <span className="real__more">Voir le projet →</span>
            </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
