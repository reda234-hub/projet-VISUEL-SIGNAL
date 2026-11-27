import { Link } from "react-router-dom";
import { PhoneIcon, TELEPHONE, TELEPHONE_HREF } from "./Header";
import { Reveal } from "./motion";
import { PHOTO_CTA } from "../data/demo";

/** Lien vers le formulaire : ancre simple sur la page devis, sinon navigation vers /devis. */
function LienDevis({ to, className, children, ...rest }) {
  if (to.startsWith("#")) {
    return <a href={to} className={className} {...rest}>{children}</a>;
  }
  return <Link to={to} className={className} {...rest}>{children}</Link>;
}

export function CtaBand({ to = "#formulaire-devis", titre = "Devis rapide et 100% gratuit !" }) {
  return (
    <section className="cta" style={{ "--cta-photo": `url(${PHOTO_CTA})` }}>
      <div className="cta__glow" aria-hidden="true" />
      <Reveal className="container cta__inner">
        <div>
          <h2>{titre}</h2>
          <ul className="cta__steps">
            <li><b>01</b> Étude</li>
            <li><b>02</b> BAT</li>
            <li><b>03</b> Fabrication</li>
            <li><b>04</b> Pose</li>
          </ul>
        </div>
        <div className="cta__actions">
          <LienDevis to={to} className="btn btn--accent">Demander un devis</LienDevis>
          <a href={TELEPHONE_HREF} className="btn btn--ghost"><PhoneIcon /> {TELEPHONE}</a>
        </div>
      </Reveal>
    </section>
  );
}
