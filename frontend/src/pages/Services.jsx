import { useEffect, useState } from "react";
import { getServices } from "../api/client";

export default function Services() {
  const [services, setServices] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch(() => setErreur("Impossible de charger les services."))
      .finally(() => setChargement(false));
  }, []);

  if (chargement) return <p>Chargement...</p>;
  if (erreur) return <p>{erreur}</p>;

  return (
    <section>
      <h1>Nos services</h1>
      {services.map((s) => (
        <article key={s.id}>
          {s.image && <img src={s.image} alt={s.nom} width="300" />}
          <h2>{s.nom}</h2>
          <p>{s.description}</p>
        </article>
      ))}
    </section>
  );
}