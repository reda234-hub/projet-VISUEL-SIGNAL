import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
import { getFaq } from "../api/client";
import { Reveal } from "../components/motion";
import { Note, Scribble } from "../components/human";
import { PhoneIcon, TELEPHONE, TELEPHONE_HREF } from "../components/Header";

// Questions affichées tant que la FAQ de l'admin Django est vide (mêmes catégories que le modèle Question).
const FAQ_PAR_DEFAUT = [
  { id: "f1", categorie: "devis", categorie_label: "Devis et tarifs", question: "Le devis est-il vraiment gratuit ?", reponse: "Oui. On se déplace pour voir la façade, on prépare une maquette et un chiffrage, sans engagement de votre part." },
  { id: "f2", categorie: "devis", categorie_label: "Devis et tarifs", question: "Sous combien de temps recevrai-je mon devis ?", reponse: "En général sous 24 à 48 h ouvrées après réception de vos informations et de photos de la façade." },
  { id: "f3", categorie: "fabrication", categorie_label: "Fabrication", question: "Quel est le délai de fabrication ?", reponse: "Comptez deux à quatre semaines après validation du BAT, selon la taille et la complexité de l'enseigne." },
  { id: "f4", categorie: "fabrication", categorie_label: "Fabrication", question: "Je n'ai pas de logo, pouvez-vous m'aider ?", reponse: "Oui, nos graphistes peuvent créer ou retravailler votre logo avant de concevoir l'enseigne." },
  { id: "f5", categorie: "pose", categorie_label: "Pose et installation", question: "Faut-il fermer le magasin pendant la pose ?", reponse: "Rarement. La plupart des poses se font en quelques heures, souvent tôt le matin ou en dehors des horaires d'ouverture." },
  { id: "f6", categorie: "pose", categorie_label: "Pose et installation", question: "Vous occupez-vous de retirer l'ancienne enseigne ?", reponse: "Oui, on dépose l'ancienne enseigne et on rebouche les trous de fixation avant d'installer la nouvelle." },
  { id: "f7", categorie: "reglementation", categorie_label: "Réglementation", question: "Faut-il une autorisation pour installer une enseigne ?", reponse: "Souvent oui. Selon votre commune, une demande d'autorisation est à déposer en mairie. On vous aide à préparer le dossier." },
  { id: "f8", categorie: "reglementation", categorie_label: "Réglementation", question: "Mon enseigne lumineuse doit-elle s'éteindre la nuit ?", reponse: "Oui : les enseignes lumineuses doivent être éteintes entre 1 h et 6 h du matin quand l'activité est terminée. Un programmateur s'en charge." },
  { id: "f9", categorie: "general", categorie_label: "Général", question: "Dans quelle zone intervenez-vous ?", reponse: "Indiquez-nous votre ville dans le formulaire de devis : on vous confirme rapidement si on peut se déplacer." },
];

export default function Faq() {
  const [questions, setQuestions] = useState(null);
  const [categorie, setCategorie] = useState("toutes");
  const [recherche, setRecherche] = useState("");
  const [ouverte, setOuverte] = useState(null);

  useEffect(() => {
    document.title = "Questions fréquentes, Visuel Signal";
    window.scrollTo(0, 0);
    getFaq()
      .then((data) => {
        const l = Array.isArray(data) ? data : data?.results ?? [];
        setQuestions(l.length ? l : FAQ_PAR_DEFAUT);
      })
      .catch(() => setQuestions(FAQ_PAR_DEFAUT));
  }, []);

  const categories = useMemo(() => {
    const map = new Map();
    (questions ?? []).forEach((q) => map.set(q.categorie, q.categorie_label || q.categorie));
    return [...map];
  }, [questions]);

  const terme = recherche.trim().toLowerCase();
  const visibles = (questions ?? []).filter(
    (q) =>
      (categorie === "toutes" || q.categorie === categorie) &&
      (!terme || `${q.question} ${q.reponse}`.toLowerCase().includes(terme))
  );

  return (
    <>
      <section className="r-head faq-head">
        <div className="container">
          <div className="breadcrumb"><Link to="/">Accueil</Link> <span>›</span> FAQ</div>
          <h1>Les questions qu'on nous pose <Scribble>souvent</Scribble></h1>
          <label className="faq-recherche">
            <MagnifyingGlass size={20} weight="bold" aria-hidden="true" />
            <span className="sr-only">Rechercher une question</span>
            <input
              type="search"
              placeholder="Rechercher : délai, autorisation, LED..."
              value={recherche}
              onChange={(e) => { setRecherche(e.target.value); setOuverte(null); }}
            />
          </label>
        </div>
      </section>

      <section className="section">
        <div className="container faq-page">
          <nav className="faq-cats" aria-label="Catégories">
            <button className={`faq-cat ${categorie === "toutes" ? "is-active" : ""}`} onClick={() => { setCategorie("toutes"); setOuverte(null); }}>
              Toutes
            </button>
            {categories.map(([val, label]) => (
              <button key={val} className={`faq-cat ${categorie === val ? "is-active" : ""}`} onClick={() => { setCategorie(val); setOuverte(null); }}>
                {label}
              </button>
            ))}
            <div className="faq-aide">
              <Note fleche="aucune">pas trouvé votre réponse ?</Note>
              <a href={TELEPHONE_HREF} className="btn btn--dark btn--sm"><PhoneIcon /> {TELEPHONE}</a>
            </div>
          </nav>

          <div className="accordion">
            {questions === null && [0, 1, 2, 3].map((i) => <div key={i} className="accordion__item faq-squelette" />)}
            {questions && visibles.length === 0 && (
              <p className="muted">Aucune question ne correspond à « {recherche} ».</p>
            )}
            {visibles.map((q, i) => {
              const actif = ouverte === q.id;
              return (
                <Reveal key={q.id} delay={Math.min(i, 5) * 60} className={`accordion__item ${actif ? "is-open" : ""}`}>
                  <button className="accordion__q" aria-expanded={actif} onClick={() => setOuverte(actif ? null : q.id)}>
                    <span>
                      <small className="faq-q__cat">{q.categorie_label}</small>
                      {q.question}
                    </span>
                    <span className="accordion__icon" aria-hidden="true"><Plus size={16} weight="bold" /></span>
                  </button>
                  <div className="accordion__a"><div><p>{q.reponse}</p></div></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
