import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Article, CaretDown, Car, Lightbulb, List, Phone, Signpost, TextAa, X,
} from "@phosphor-icons/react";
import { useScrolled } from "./motion";

export const TELEPHONE = "04 00 00 00 00";
export const TELEPHONE_HREF = "tel:+33400000000";

const menu = [
  { to: "/", label: "Accueil" },
  {
    label: "Enseignes",
    to: "/enseignes/lumineuses",
    match: "/enseignes",
    children: [
      { to: "/enseignes/lumineuses", label: "Lumineuses", desc: "LED, caissons, néons, drapeaux", Icon: Lightbulb },
      { to: "/enseignes/non-lumineuses", label: "Non lumineuses", desc: "Lettres découpées, métal, bois", Icon: TextAa },
    ],
  },
  { to: "/habillage-facades", label: "Habillage de façades" },
  {
    label: "Signalétique",
    to: "/signaletique/plv-ilv",
    match: "/signaletique",
    children: [
      { to: "/signaletique/plv-ilv", label: "PLV / ILV", desc: "Kakémonos, totems, présentoirs", Icon: Signpost },
      { to: "/signaletique/flocage-vehicules", label: "Flocage véhicules", desc: "Lettrage et covering", Icon: Car },
      { to: "/signaletique/vitrophanie", label: "Vitrophanie & adhésifs", desc: "Vitrines, dépoli, décors", Icon: Article },
    ],
  },
  { to: "/realisations", label: "Réalisations", match: "/realisations" },
  { to: "/faq", label: "FAQ" },
];

export default function Header() {
  const [ouvert, setOuvert] = useState(false);
  const [sousMenu, setSousMenu] = useState(null); // sous-menu déplié sur mobile
  const scrolled = useScrolled(60);
  const { pathname } = useLocation();
  const refHeader = useRef(null);

  // Publie la hauteur du header dans --header-h (utilisée par les barres collantes)
  useEffect(() => {
    const el = refHeader.current;
    if (!el || !("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(([e]) => {
      document.documentElement.style.setProperty("--header-h", `${Math.round(e.borderBoxSize?.[0]?.blockSize ?? el.offsetHeight)}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // On referme le menu mobile à chaque changement de page
  useEffect(() => {
    setOuvert(false);
    setSousMenu(null);
  }, [pathname]);

  const estActif = (item) =>
    item.match ? pathname.startsWith(item.match) : pathname === item.to;

  return (
    <header ref={refHeader} className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="topbar">
        <div className="container topbar__inner">
          <span className="topbar__tagline">Enseignes et signalétique, fabriquées à l'atelier</span>
          <div className="topbar__actions">
            <a href={TELEPHONE_HREF} className="topbar__phone">
              <Phone size={16} weight="bold" /> {TELEPHONE}
            </a>
            <Link to="/devis#formulaire-devis" className="btn btn--accent btn--sm">
              Demander un devis
            </Link>
          </div>
        </div>
      </div>

      <div className="mainnav">
        <div className="container mainnav__inner">
          <Link to="/" className="logo">
            <span className="logo__mark">VS</span>
            <span className="logo__text">
              Visuel<strong>Signal</strong>
            </span>
          </Link>

          <button
            className="burger"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={ouvert}
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
          </button>

          <nav className={`menu ${ouvert ? "is-open" : ""}`} aria-label="Navigation principale">
            {menu.map((item) => (
              <div
                className={`menu__item ${item.children ? "has-children" : ""} ${sousMenu === item.label ? "is-expanded" : ""}`}
                key={item.label}
              >
                <NavLink to={item.to} end className={estActif(item) ? "active" : ""}>
                  {item.label}
                </NavLink>
                {item.children && (
                  <>
                    <button
                      className="menu__toggle"
                      aria-label={`Afficher le sous-menu ${item.label}`}
                      aria-expanded={sousMenu === item.label}
                      onClick={() => setSousMenu((s) => (s === item.label ? null : item.label))}
                    >
                      <CaretDown size={14} weight="bold" />
                    </button>
                    <div className="menu__dropdown">
                      {item.children.map((c) => (
                        <NavLink key={c.label} to={c.to} className="menu__sub">
                          <span className="menu__sub-icon"><c.Icon size={20} weight="duotone" /></span>
                          <span>
                            <strong>{c.label}</strong>
                            <small>{c.desc}</small>
                          </span>
                        </NavLink>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
            <NavLink to="/contact" className="btn btn--dark menu__cta">
              Contact
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function PhoneIcon() {
  return <Phone size={16} weight="bold" aria-hidden="true" />;
}
