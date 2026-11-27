// Contenu des pages de services (menu « Habillage de façades » et « Signalétique »).
// Photos de TEST (Unsplash, libres de droits) : remplacez-les par vos chantiers.

const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;

export const PHOTO_ATELIER = img("1785482465334-cb980df4980c", 900);
export const PHOTO_OUTILS = img("1599423793930-cc207c53f6d6", 700);

export const SERVICES = {
  "habillage-facades": {
    slug: "habillage-facades",
    nom: "Habillage de façades",
    menu: "Habillage de façades",
    titre: ["Une façade qui donne", "envie", "d'entrer"],
    lead:
      "Bardage, bandeaux, lambrequins et adhésifs grand format : on refait l'habit de votre commerce sans gros travaux.",
    note: "on prend les cotes sur place, gratuitement",
    photos: [
      { src: img("1769257911527-bdfd73b545cf", 1000), legende: "Bandeau et store assortis" },
      { src: img("1768612351259-74ed582fc3ef"), legende: "Entrée habillée bois et métal" },
      { src: img("1783741907429-7c483e1fdfaa"), legende: "Façade éclairée le soir" },
    ],
    prestations: [
      { titre: "Bandeaux de façade", texte: "Panneaux composite sur ossature alu, posés au-dessus de la vitrine pour accueillir l'enseigne." },
      { titre: "Bardage décoratif", texte: "Lames bois, composite ou métal perforé pour changer complètement l'aspect de la devanture." },
      { titre: "Lambrequins et stores", texte: "Le store imprimé à vos couleurs, qui fait aussi office d'enseigne." },
      { titre: "Covering grand format", texte: "Adhésif imprimé posé sur pilier, rideau métallique ou mur pignon." },
    ],
    etapes: [
      ["Relevé", "On mesure la façade et on prend des photos."],
      ["Maquette", "Vous voyez le rendu sur une photo de votre façade."],
      ["Fabrication", "Découpe et assemblage à l'atelier."],
      ["Pose", "Une à deux journées sur place selon la surface."],
    ],
    aSavoir: [
      "En copropriété, pensez à prévenir le syndic avant les travaux.",
      "Une déclaration préalable en mairie est souvent demandée pour modifier une façade.",
      "On peut garder votre enseigne actuelle et ne refaire que l'habillage.",
    ],
  },

  "plv-ilv": {
    slug: "plv-ilv",
    nom: "PLV et ILV",
    menu: "PLV / ILV",
    titre: ["Faire vendre", "dans", "le magasin"],
    lead:
      "Kakémonos, présentoirs, totems et signalétique intérieure : tout ce qui guide et informe vos clients une fois la porte passée.",
    note: "petites séries acceptées, dès 1 exemplaire",
    photos: [
      { src: img("1758520387635-d290a74d3aee", 1000), legende: "Vitrine mise en scène" },
      { src: img("1771033834141-023d630b3965"), legende: "Signalétique de rayons" },
      { src: img("1764795850443-c046dbe2660f"), legende: "Présentoir sur comptoir" },
    ],
    prestations: [
      { titre: "Kakémonos et roll-up", texte: "Légers, transportables, montés en 30 secondes. Pour le magasin comme pour les salons." },
      { titre: "Totems et présentoirs", texte: "Carton, PVC ou bois : on fabrique le support adapté à vos produits." },
      { titre: "Signalétique intérieure", texte: "Panneaux de rayon, fléchage, plaques de porte, affichage obligatoire." },
      { titre: "Stop-trottoirs", texte: "Le panneau posé devant la boutique, avec visuels interchangeables." },
    ],
    etapes: [
      ["Brief", "Vos produits, votre espace, votre budget."],
      ["Création", "Nos graphistes préparent les visuels."],
      ["Impression", "Impression et façonnage à l'atelier."],
      ["Livraison", "Livré monté, ou posé par nos soins."],
    ],
    aSavoir: [
      "Les visuels peuvent être changés à chaque saison sans refaire le support.",
      "Un stop-trottoir sur le domaine public demande une autorisation de la mairie.",
      "Envoyez-nous vos fichiers en PDF haute définition si vous avez déjà un graphiste.",
    ],
  },

  "flocage-vehicules": {
    slug: "flocage-vehicules",
    nom: "Flocage de véhicules",
    menu: "Flocage véhicules",
    titre: ["Votre utilitaire,", "votre meilleure", "pub"],
    lead:
      "Lettrage, marquage partiel ou covering complet : votre véhicule fait connaître votre activité à chaque trajet.",
    note: "pose en une journée, véhicule rendu le soir",
    photos: [
      { src: img("1646531840695-62810bcd1171", 1000), legende: "Pose d'un covering" },
      { src: img("1776847382348-56297f70bf6d"), legende: "Covering graphique" },
      { src: img("1779115643173-285b173348da"), legende: "Décors adhésifs couleur" },
    ],
    prestations: [
      { titre: "Lettrage simple", texte: "Nom, métier, téléphone et site en lettres adhésives découpées. Le plus économique." },
      { titre: "Marquage partiel", texte: "Portes, capot ou arrière imprimés en couleur, le reste de la carrosserie d'origine." },
      { titre: "Covering intégral", texte: "Tout le véhicule habillé d'un film imprimé ou coloré, qui protège aussi la peinture." },
      { titre: "Flotte d'entreprise", texte: "Un même marquage décliné sur tous vos véhicules, de la citadine au poids lourd." },
    ],
    etapes: [
      ["Modèle", "Vous nous donnez la marque et le modèle du véhicule."],
      ["Gabarit", "On place votre visuel sur le plan exact du véhicule."],
      ["Impression", "Film laminé pour tenir dans le temps."],
      ["Pose", "Dans notre atelier, à l'abri de la poussière."],
    ],
    aSavoir: [
      "Le film se retire sans abîmer la peinture d'origine, pratique pour un véhicule en leasing.",
      "Lavez le véhicule à la main les premières semaines après la pose.",
      "Un véhicule propre et sec la veille de la pose, c'est un marquage qui tient mieux.",
    ],
  },

  vitrophanie: {
    slug: "vitrophanie",
    nom: "Vitrophanie et adhésifs",
    menu: "Vitrophanie & adhésifs",
    titre: ["Votre vitrine", "parle", "pour vous"],
    lead:
      "Lettrage, horaires, dépoli, décors saisonniers : des adhésifs posés sur vos vitres, faciles à changer.",
    note: "lettrage doré à la main sur demande",
    photos: [
      { src: img("1793392638398-10bd06b46b5f", 1000), legende: "Lettrage doré sur vitrine" },
      { src: img("1769437541941-22aaaef1247c"), legende: "Message en adhésif blanc" },
      { src: img("1781617320905-5dca1a896208"), legende: "Nom de la brasserie sur la vitre" },
    ],
    prestations: [
      { titre: "Lettrage de vitrine", texte: "Nom, activité, horaires, réseaux sociaux. Lettres découpées dans la couleur de votre choix." },
      { titre: "Adhésif dépoli", texte: "Pour garder l'intimité d'un cabinet ou d'un bureau tout en laissant passer la lumière." },
      { titre: "Microperforé", texte: "Une image pleine vue de la rue, et une vitre qui reste transparente de l'intérieur." },
      { titre: "Décors saisonniers", texte: "Soldes, fêtes, nouvelle collection : un décor posé puis retiré sans trace." },
    ],
    etapes: [
      ["Photos", "Vous nous envoyez des photos de vos vitres."],
      ["Calepinage", "On place le texte et les visuels à la bonne échelle."],
      ["Découpe", "Découpe et impression à l'atelier."],
      ["Pose", "Pose rapide, souvent avant l'ouverture du magasin."],
    ],
    aSavoir: [
      "Nous posons aussi bien côté rue que côté intérieur, selon l'exposition.",
      "Un adhésif de qualité extérieure tient plusieurs années au soleil.",
      "Les horaires et mentions légales peuvent être changés seuls, sans refaire tout le décor.",
    ],
  },
};
