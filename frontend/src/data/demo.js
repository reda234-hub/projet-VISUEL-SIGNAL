// ---------------------------------------------------------------------------
// Données de TEST : photos libres de droits Unsplash (https://unsplash.com/license)
// Elles s'affichent uniquement tant que l'API ne renvoie aucune réalisation.
// Dès que vous ajoutez de vraies réalisations dans l'admin Django, elles disparaissent.
// Pour les couper complètement : passez UTILISER_DEMO à false.
// ---------------------------------------------------------------------------

export const UTILISER_DEMO = true;

const unsplash = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;

export const PHOTO_HERO = unsplash("1577980158219-1d4fb3ec8378", 1200);

export const DEMO_REALISATIONS = [
  { id: "d1", slug: "demo-1", titre: "Enseigne « Open » lumineuse", service: "Enseigne lumineuse", ville: "Test", image_principale: unsplash("1472851294608-062f824d29cc") },
  { id: "d2", slug: "demo-2", titre: "Enseigne drapeau galerie", service: "Enseigne drapeau", ville: "Test", image_principale: unsplash("1754326450638-840ba690a379") },
  { id: "d3", slug: "demo-3", titre: "Caisson rétro bar à jus", service: "Caisson lumineux", ville: "Test", image_principale: unsplash("1771904867089-c783a6b7581f") },
  { id: "d4", slug: "demo-4", titre: "Néon LED salle de jeux", service: "Néon LED", ville: "Test", image_principale: unsplash("1546443046-ed1ce6ffd1ab") },
  { id: "d5", slug: "demo-5", titre: "Devanture fleuriste", service: "Habillage de façade", ville: "Test", image_principale: unsplash("1762424361024-766d1a44f54e") },
  { id: "d6", slug: "demo-6", titre: "Néon de vitrine bureaux", service: "Vitrophanie & néon", ville: "Test", image_principale: unsplash("1617575521317-d2974f3b56d2") },
  { id: "d7", slug: "demo-7", titre: "Lettrage boutique luminaires", service: "Lettres découpées", ville: "Test", image_principale: unsplash("1528698827591-e19ccd7bc23d") },
  { id: "d8", slug: "demo-8", titre: "Façade restaurant", service: "Enseigne bandeau", ville: "Test", image_principale: unsplash("1523368749929-6b2bf370dbf8") },
  { id: "d9", slug: "demo-9", titre: "Bandeau et store assortis", service: "Habillage de façade", ville: "Test", image_principale: unsplash("1769257911527-bdfd73b545cf") },
  { id: "d10", slug: "demo-10", titre: "Pose d'un covering", service: "Flocage véhicule", ville: "Test", image_principale: unsplash("1646531840695-62810bcd1171") },
  { id: "d11", slug: "demo-11", titre: "Lettrage doré sur vitrine", service: "Vitrophanie", ville: "Test", image_principale: unsplash("1793392638398-10bd06b46b5f") },
  { id: "d12", slug: "demo-12", titre: "Vitrine mise en scène", service: "PLV", ville: "Test", image_principale: unsplash("1758520387635-d290a74d3aee") },
  { id: "d13", slug: "demo-13", titre: "Lettres découpées « Studio »", service: "Enseigne non lumineuse", ville: "Test", image_principale: unsplash("1502739423516-a7da6332f56f") },
  { id: "d14", slug: "demo-14", titre: "Caisson « Coffee »", service: "Enseigne lumineuse", ville: "Test", image_principale: unsplash("1792069773296-45c1522d3f54") },
];

export const PHOTO_CTA = unsplash("1496449903678-68ddcb189a24", 1600);
