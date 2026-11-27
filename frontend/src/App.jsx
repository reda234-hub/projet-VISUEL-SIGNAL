import { Routes, Route, Link, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import Devis from "./pages/Devis";
import Enseignes from "./pages/Enseignes";
import Service from "./pages/Service";
import Realisations, { RealisationDetail } from "./pages/Realisations";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";

function PageIntrouvable() {
  return (
    <section className="section">
      <div className="container r-vide">
        <h1>Cette page n'existe pas</h1>
        <p className="muted">Le lien est peut-être ancien. Repartez de l'accueil.</p>
        <Link to="/" className="btn btn--accent">Retour à l'accueil</Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/devis" element={<Devis />} />
          <Route path="/enseignes" element={<Navigate to="/enseignes/lumineuses" replace />} />
          <Route path="/enseignes/:type" element={<Enseignes />} />
          <Route path="/habillage-facades" element={<Service slug="habillage-facades" />} />
          <Route path="/signaletique" element={<Navigate to="/signaletique/plv-ilv" replace />} />
          <Route path="/signaletique/plv-ilv" element={<Service slug="plv-ilv" />} />
          <Route path="/signaletique/flocage-vehicules" element={<Service slug="flocage-vehicules" />} />
          <Route path="/signaletique/vitrophanie" element={<Service slug="vitrophanie" />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/realisations/:slug" element={<RealisationDetail />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Navigate to="/" replace />} />
          <Route path="*" element={<PageIntrouvable />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
