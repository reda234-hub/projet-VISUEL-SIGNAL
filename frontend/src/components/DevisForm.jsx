import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { envoyerDevis, getServices } from "../api/client";
import { PhoneIcon, TELEPHONE, TELEPHONE_HREF } from "./Header";
import { Reveal } from "./motion";

const BESOINS = [
  { value: "enseigne", label: "Enseigne", pose: false },
  { value: "enseigne_pose", label: "Enseigne + Pose", pose: true },
  { value: "pose", label: "Seulement pose", pose: true },
  { value: "entretien", label: "Entretien", pose: false },
];

const ECLAIRAGES = [
  { value: "aucun", label: "Sans éclairage" },
  { value: "led", label: "LED" },
  { value: "neon", label: "Néon" },
  { value: "spot", label: "Spots extérieurs" },
];

const INITIAL = {
  nom: "",
  telephone: "",
  societe: "",
  email: "",
  besoin: "",
  service: "",
  texte: "",
  eclairage: "aucun",
  largeur_cm: "",
  hauteur_cm: "",
  ville: "",
  message: "",
  rgpd: false,
};

const MAX_FICHIER = 5 * 1024 * 1024;

/* ---------------------------------------------------------------- Form */

export default function DevisForm({ intro, titreId = "formulaire-devis" }) {
  const [params] = useSearchParams();
  const [form, setForm] = useState(() => {
    const ecl = params.get("eclairage");
    return ECLAIRAGES.some((e) => e.value === ecl) ? { ...INITIAL, eclairage: ecl, besoin: "enseigne_pose" } : INITIAL;
  });
  const [fichier, setFichier] = useState(null);
  const [services, setServices] = useState([]);
  const [erreurs, setErreurs] = useState({});
  const [etat, setEtat] = useState("idle"); // idle | envoi | succes | erreur
  const fileRef = useRef(null);

  useEffect(() => {
    getServices()
      .then((data) => setServices(Array.isArray(data) ? data : data.results ?? []))
      .catch(() => setServices([]));
  }, []);

  const besoin = BESOINS.find((b) => b.value === form.besoin);
  const avecEnseigne = form.besoin === "enseigne" || form.besoin === "enseigne_pose";

  const requis = [form.nom, form.telephone, form.email, form.besoin, form.ville, form.message, form.rgpd];
  const progression = Math.round((requis.filter((v) => (typeof v === "string" ? v.trim() : v)).length / requis.length) * 100);

  const maj = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErreurs((er) => ({ ...er, [name]: undefined }));
  };

  const choisirFichier = (e) => {
    const f = e.target.files?.[0] ?? null;
    if (f && f.size > MAX_FICHIER) {
      setErreurs((er) => ({ ...er, fichier: "Le fichier ne doit pas dépasser 5 Mo." }));
      e.target.value = "";
      setFichier(null);
      return;
    }
    setErreurs((er) => ({ ...er, fichier: undefined }));
    setFichier(f);
  };

  const valider = () => {
    const er = {};
    if (!form.nom.trim()) er.nom = "Veuillez indiquer votre nom.";
    if (!form.telephone.trim()) er.telephone = "Veuillez indiquer votre téléphone.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Adresse email invalide.";
    if (!form.besoin) er.besoin = "Sélectionnez votre besoin.";
    if (!form.ville.trim()) er.ville = "Indiquez votre localisation.";
    if (!form.message.trim()) er.message = "Décrivez votre projet en quelques mots.";
    if (!form.rgpd) er.rgpd = "Vous devez accepter le traitement de vos données.";
    return er;
  };

  const envoyer = async (e) => {
    e.preventDefault();
    const er = valider();
    setErreurs(er);
    if (Object.keys(er).length) return;

    const messageComplet = [
      `Besoin : ${besoin.label}`,
      avecEnseigne && form.texte.trim() ? `Texte à écrire : ${form.texte.trim()}` : null,
      "",
      form.message.trim(),
    ]
      .filter((l) => l !== null)
      .join("\n");

    const data = new FormData();
    data.append("nom", form.nom.trim());
    data.append("telephone", form.telephone.trim());
    data.append("societe", form.societe.trim());
    data.append("email", form.email.trim());
    data.append("ville", form.ville.trim());
    data.append("eclairage", form.eclairage);
    data.append("pose", besoin.pose ? "true" : "false");
    data.append("message", messageComplet);
    if (form.service) data.append("service", form.service);
    if (form.largeur_cm) data.append("largeur_cm", form.largeur_cm);
    if (form.hauteur_cm) data.append("hauteur_cm", form.hauteur_cm);
    if (fichier) data.append("fichier", fichier);

    setEtat("envoi");
    try {
      await envoyerDevis(data);
      setEtat("succes");
      setForm(INITIAL);
      setFichier(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      const apiErr = err.response?.data;
      if (apiErr && typeof apiErr === "object") {
        const mapped = {};
        for (const [k, v] of Object.entries(apiErr)) mapped[k] = Array.isArray(v) ? v.join(" ") : String(v);
        setErreurs(mapped);
      }
      setEtat("erreur");
    }
  };

  return (
    <section className="devis" id={titreId}>
      <div className="container devis__grid">
        <Reveal as="aside" from="left" className="devis__aside">
          {intro ?? (
            <>
          <p className="eyebrow eyebrow--light">Devis gratuit</p>
              <h2>Votre devis gratuit</h2>
              <p>
                Décrivez-nous votre projet : un conseiller vous recontacte rapidement avec une
                proposition chiffrée et une maquette (BAT).
              </p>
              <ul className="check-list">
                <li>Sans engagement</li>
                <li>Réponse sous 24 h</li>
                <li>Étude et conseil personnalisés</li>
              </ul>
              <a href={TELEPHONE_HREF} className="devis__phone">
                <PhoneIcon /> {TELEPHONE}
              </a>
            </>
          )}
        </Reveal>

        <Reveal from="right" delay={150} className="devis__card">
          {etat === "succes" ? (
            <div className="devis__success" role="status">
              <div className="confetti" aria-hidden="true">
                {Array.from({ length: 18 }, (_, i) => <i key={i} style={{ "--i": i }} />)}
              </div>
              <div className="devis__success-icon">✓</div>
              <h3>Merci, votre demande est envoyée !</h3>
              <p>Nous revenons vers vous sous 24 h ouvrées avec une proposition.</p>
              <button className="btn btn--dark" onClick={() => setEtat("idle")}>
                Faire une nouvelle demande
              </button>
            </div>
          ) : (
            <form onSubmit={envoyer} noValidate>
              <div className="progress" aria-label={`Formulaire complété à ${progression} %`}>
                <div className="progress__head">
                  <span>{progression === 100 ? "Prêt à envoyer !" : "Votre demande"}</span>
                  <b>{progression} %</b>
                </div>
                <div className="progress__bar">
                  <span style={{ width: `${progression}%` }} />
                </div>
              </div>
              <p className="form__note">
                Les champs indiqués par un astérisque (*) sont obligatoires
              </p>

              <div className="form__row">
                <Champ label="Nom *" name="nom" value={form.nom} onChange={maj} error={erreurs.nom} autoComplete="name" />
                <Champ label="Téléphone *" name="telephone" type="tel" value={form.telephone} onChange={maj} error={erreurs.telephone} autoComplete="tel" />
              </div>
              <div className="form__row">
                <Champ label="Entreprise" name="societe" value={form.societe} onChange={maj} error={erreurs.societe} autoComplete="organization" />
                <Champ label="Email *" name="email" type="email" value={form.email} onChange={maj} error={erreurs.email} autoComplete="email" />
              </div>

              <fieldset className="field">
                <legend>Besoin de *</legend>
                <div className="chips">
                  {BESOINS.map((b) => (
                    <label key={b.value} className={`chip ${form.besoin === b.value ? "is-active" : ""}`}>
                      <input type="radio" name="besoin" value={b.value} checked={form.besoin === b.value} onChange={maj} />
                      {b.label}
                    </label>
                  ))}
                </div>
                {erreurs.besoin && <span className="field__error">{erreurs.besoin}</span>}
              </fieldset>

              {avecEnseigne && (
                <Champ
                  label="Texte à écrire (si enseigne)"
                  name="texte"
                  value={form.texte}
                  onChange={maj}
                  placeholder="Ex. : BOULANGERIE DUPONT"
                />
              )}

              <div className="form__row">
                <div className="field">
                  <label htmlFor="service">Type de prestation</label>
                  <select id="service" name="service" value={form.service} onChange={maj}>
                    <option value="">Choisir une prestation</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.nom}</option>
                    ))}
                  </select>
                  {erreurs.service && <span className="field__error">{erreurs.service}</span>}
                </div>
                <div className="field">
                  <label htmlFor="eclairage">Éclairage</label>
                  <select id="eclairage" name="eclairage" value={form.eclairage} onChange={maj}>
                    {ECLAIRAGES.map((e) => (
                      <option key={e.value} value={e.value}>{e.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form__row form__row--3">
                <Champ label="Largeur (cm)" name="largeur_cm" type="number" min="0" value={form.largeur_cm} onChange={maj} error={erreurs.largeur_cm} />
                <Champ label="Hauteur (cm)" name="hauteur_cm" type="number" min="0" value={form.hauteur_cm} onChange={maj} error={erreurs.hauteur_cm} />
                <Champ label="Votre localisation *" name="ville" value={form.ville} onChange={maj} error={erreurs.ville} placeholder="Ville" autoComplete="address-level2" />
              </div>

              <div className="field">
                <label htmlFor="fichier">Votre logo, photo, fichier… (facultatif)</label>
                <label className={`dropzone ${fichier ? "has-file" : ""}`} htmlFor="fichier">
                  <span className="dropzone__icon">⇪</span>
                  {fichier ? fichier.name : "Cliquez pour ajouter un fichier (5 Mo max.)"}
                </label>
                <input id="fichier" ref={fileRef} type="file" className="sr-only" accept="image/*,.pdf,.ai,.eps,.svg" onChange={choisirFichier} />
                {erreurs.fichier && <span className="field__error">{erreurs.fichier}</span>}
              </div>

              <div className="field">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" rows="5" value={form.message} onChange={maj} aria-invalid={!!erreurs.message} placeholder="Décrivez votre projet, vos contraintes, vos délais…" />
                {erreurs.message && <span className="field__error">{erreurs.message}</span>}
              </div>

              <label className="consent">
                <input type="checkbox" name="rgpd" checked={form.rgpd} onChange={maj} />
                <span>
                  J'accepte que mes données soient utilisées pour traiter ma demande de devis,
                  conformément à la <a href="#">politique de confidentialité</a>. *
                </span>
              </label>
              {erreurs.rgpd && <span className="field__error">{erreurs.rgpd}</span>}

              {etat === "erreur" && (
                <p className="form__alert">
                  L'envoi a échoué. Vérifiez les champs ou appelez-nous au {TELEPHONE}.
                </p>
              )}

              <button type="submit" className="btn btn--accent btn--block" disabled={etat === "envoi"}>
                {etat === "envoi" ? "Envoi en cours…" : "Envoyer ma demande"}
              </button>

              <p className="form__reassure">
                <span>✓ Sans engagement</span>
                <span>✓ Réponse sous 24 h</span>
                <a href={TELEPHONE_HREF}>☎ {TELEPHONE}</a>
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Champ({ label, name, error, ...props }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} aria-invalid={!!error} {...props} />
      {error && <span className="field__error">{error}</span>}
    </div>
  );
}
