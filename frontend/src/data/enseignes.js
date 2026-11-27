// Contenu des pages « Enseignes lumineuses » et « Enseignes non lumineuses ».
// Les photos sont des photos de TEST (Unsplash, libres de droits) : remplacez-les par vos réalisations.

const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;

export const ENSEIGNES = {
  lumineuses: {
    slug: "lumineuses",
    nom: "Enseignes lumineuses",
    court: "Lumineuses",
    singulier: "enseigne lumineuse",
    eclairage: "led",
    eyebrow: "Visible de jour comme de nuit",
    titre: ["Enseignes", "lumineuses", "sur mesure"],
    lead:
      "Lettres boîtiers LED, caissons, néons ou enseignes drapeau : votre commerce reste visible après la tombée de la nuit, avec une consommation maîtrisée grâce aux LED.",
    points: ["Éclairage LED longue durée", "Fabrication dans notre atelier", "Pose et raccordement électrique"],
    photo: img("1604638823265-1cabe872a94a", 1200),
    avantages: [
      { icon: "◐", titre: "Visibilité 24 h/24", texte: "Votre enseigne attire l'œil en soirée et par temps gris, là où une enseigne classique disparaît." },
      { icon: "⚡", titre: "Basse consommation", texte: "Nos modules LED consomment bien moins que les anciens néons ou tubes fluorescents." },
      { icon: "◆", titre: "Image haut de gamme", texte: "Un éclairage bien maîtrisé valorise votre marque et donne une impression de qualité." },
    ],
    types: [
      {
        titre: "Lettres boîtiers lumineuses",
        texte: "Lettres en relief en aluminium ou PVC, face en plexiglas diffusant, éclairées par LED intégrées. Le grand classique des façades commerciales.",
        tags: ["Alu", "Plexiglas", "LED"],
        ideal: "Boutiques, restaurants, agences",
        photo: img("1612655139962-075de01a4de4"),
      },
      {
        titre: "Lettres rétroéclairées",
        texte: "La lumière est projetée vers le mur derrière les lettres et crée un halo élégant. Effet très chic, idéal sur pierre ou bardage.",
        tags: ["Alu", "Inox", "LED arrière"],
        ideal: "Hôtels, instituts, cabinets",
        photo: img("1699452861070-1517da66762e"),
      },
      {
        titre: "Caissons lumineux",
        texte: "Un boîtier éclairé de l'intérieur avec une face imprimée ou découpée. Solution économique et très lisible pour un logo complet.",
        tags: ["Alu", "Toile ou plexi", "LED"],
        ideal: "Commerces de proximité, franchises",
        photo: img("1792069773296-45c1522d3f54"),
      },
      {
        titre: "Enseignes drapeau lumineuses",
        texte: "Fixée perpendiculairement à la façade, elle est visible par les passants des deux côtés de la rue. Simple ou double face.",
        tags: ["Double face", "LED", "Potence"],
        ideal: "Rues commerçantes, pharmacies, bars",
        photo: img("1721761961411-8d9a578eb246"),
      },
      {
        titre: "Néons LED flexibles",
        texte: "L'effet néon vintage avec la technologie LED : plus solide, moins énergivore, et entièrement personnalisable en forme et en couleur.",
        tags: ["Néon LED", "Multicolore", "Intérieur / extérieur"],
        ideal: "Bars, coffee shops, vitrines",
        photo: img("1543332164-6e82f355badc"),
      },
      {
        titre: "Lettres à bulbes / effet spectacle",
        texte: "Des lettres équipées d'ampoules apparentes pour un rendu rétro, façade de cinéma ou de salle de spectacle. Très forte présence visuelle.",
        tags: ["Ampoules LED", "Acier peint", "Sur mesure"],
        ideal: "Événementiel, salles, restaurants à thème",
        photo: img("1564415899387-db4ccff0827b"),
      },
    ],
    options: {
      titre: "Options d'éclairage",
      items: [
        ["Éclairage frontal", "La face des lettres s'illumine : lisibilité maximale."],
        ["Éclairage arrière (halo)", "La lumière se diffuse sur le mur : effet élégant et discret."],
        ["Éclairage mixte", "Face et halo combinés pour un rendu très lumineux."],
        ["Choix des couleurs", "Blanc chaud, blanc froid, couleurs RVB ou couleurs de votre charte."],
        ["Programmateur horaire", "Allumage et extinction automatiques selon vos horaires."],
        ["Variateur / détecteur", "Adaptez l'intensité selon la luminosité ambiante."],
      ],
    },
    reglementation:
      "Une enseigne lumineuse doit respecter le règlement local de publicité de votre commune. Elle doit aussi être éteinte entre 1 h et 6 h du matin quand votre activité est fermée. Une autorisation de la mairie est souvent nécessaire : nous vous aidons à monter le dossier.",
    faq: [
      ["Combien coûte une enseigne lumineuse ?", "Le prix dépend de la taille, du nombre de lettres, du type d'éclairage et de la pose. Chaque projet étant sur mesure, nous établissons un devis gratuit après étude de votre façade."],
      ["Combien consomme une enseigne LED ?", "Très peu : quelques dizaines de watts pour une enseigne de commerce standard. Avec un programmateur horaire, le coût annuel reste très faible."],
      ["Quelle est la durée de vie des LED ?", "Les modules LED professionnels ont une durée de vie de l'ordre de 50 000 heures, soit plus de 10 ans d'utilisation normale."],
      ["Vous occupez-vous du raccordement électrique ?", "Oui, nos poseurs installent l'enseigne et la raccordent à l'alimentation prévue. Il faut simplement une arrivée électrique à proximité."],
    ],
  },

  "non-lumineuses": {
    slug: "non-lumineuses",
    nom: "Enseignes non lumineuses",
    court: "Non lumineuses",
    singulier: "enseigne non lumineuse",
    eclairage: "aucun",
    eyebrow: "Sobre, durable, économique",
    titre: ["Enseignes", "non lumineuses", "en relief ou à plat"],
    lead:
      "Lettres découpées, lettres 3D, panneaux et enseignes drapeau : une signalétique élégante, sans entretien ni consommation électrique, adaptée à tous les budgets.",
    points: ["Aucun frais d'électricité", "Matériaux résistants aux intempéries", "Large choix de finitions"],
    photo: img("1576501161309-37635f837061", 1200),
    avantages: [
      { icon: "€", titre: "Budget maîtrisé", texte: "Pas d'électronique ni de raccordement : l'enseigne non lumineuse est la solution la plus économique." },
      { icon: "♺", titre: "Zéro entretien", texte: "Pas d'ampoule à changer, pas de panne : votre enseigne reste impeccable pendant des années." },
      { icon: "✦", titre: "Finitions variées", texte: "Bois, métal brossé, laiton, couleurs de votre charte : chaque matière donne un style différent." },
    ],
    types: [
      {
        titre: "Lettres découpées en relief",
        texte: "Lettres et logo découpés à la commande numérique puis fixés à distance du mur. Un relief net qui joue avec les ombres.",
        tags: ["PVC", "Alu composite", "Plexiglas"],
        ideal: "Boutiques, bureaux, cabinets",
        photo: img("1502739423516-a7da6332f56f"),
      },
      {
        titre: "Lettres métal 3D",
        texte: "Lettres en inox, laiton ou aluminium brossé, embouties ou soudées. Un rendu premium et intemporel, très résistant.",
        tags: ["Inox", "Laiton", "Alu brossé"],
        ideal: "Hôtels, professions libérales, sièges",
        photo: img("1791718594082-70a976c64bf1"),
      },
      {
        titre: "Panneaux et bandeaux",
        texte: "Panneau en aluminium composite (type Dibond) imprimé ou habillé de lettres adhésives, posé en bandeau sur la façade.",
        tags: ["Dibond", "Impression UV", "Adhésif"],
        ideal: "Commerces, artisans, chantiers",
        photo: img("1753826201488-4bb916446360"),
      },
      {
        titre: "Enseignes drapeau",
        texte: "Visible de loin dans la rue, l'enseigne drapeau non lumineuse se décline en métal, bois ou composite, sur potence décorative.",
        tags: ["Potence", "Double face", "Bois / métal"],
        ideal: "Centres-villes, rues piétonnes",
        photo: img("1727767579145-75908780ba04"),
      },
      {
        titre: "Enseignes en bois",
        texte: "Bois massif gravé, peint ou sculpté pour une identité chaleureuse et artisanale. Traitement extérieur longue durée.",
        tags: ["Bois massif", "Gravure", "Peinture"],
        ideal: "Cafés, boulangeries, artisans",
        photo: img("1789671201318-8aee06994b96"),
      },
      {
        titre: "Vitrophanie et lettrage vitrine",
        texte: "Adhésifs découpés ou imprimés posés sur votre vitrine : horaires, logo, informations. Rapide à poser et facile à changer.",
        tags: ["Adhésif", "Dépoli", "Microperforé"],
        ideal: "Tous commerces, compléments d'enseigne",
        photo: img("1783749046993-205c0f5446a0"),
      },
    ],
    options: {
      titre: "Matériaux et finitions",
      items: [
        ["PVC expansé", "Léger et économique, idéal pour les lettres découpées."],
        ["Aluminium composite", "Rigide et durable, parfait pour panneaux et bandeaux."],
        ["Plexiglas", "Aspect brillant, nombreuses couleurs, effet haut de gamme."],
        ["Inox et laiton", "Finition métal brossé ou poli, rendu premium."],
        ["Bois traité", "Chaleureux et authentique, traité pour l'extérieur."],
        ["Fixation à distance", "Entretoises pour décoller les lettres du mur et créer un relief."],
      ],
    },
    reglementation:
      "Même sans éclairage, une enseigne doit respecter le règlement local de publicité. Dans les secteurs protégés (centre historique, abords de monuments), l'avis de l'Architecte des Bâtiments de France peut être demandé. Nous vous accompagnons dans ces démarches.",
    faq: [
      ["Une enseigne non lumineuse reste-t-elle visible le soir ?", "Elle profite de l'éclairage public et de celui de votre vitrine. Pour plus de visibilité, nous pouvons ajouter des spots extérieurs orientés vers l'enseigne."],
      ["Quel matériau choisir ?", "Le PVC convient aux petits budgets, l'aluminium composite aux grandes surfaces, le métal et le bois à une image haut de gamme. Nous vous conseillons selon votre façade et votre style."],
      ["Combien de temps dure une enseigne non lumineuse ?", "Avec des matériaux extérieurs de qualité, comptez de nombreuses années sans entretien particulier, hors nettoyage."],
      ["Peut-on la faire évoluer en enseigne lumineuse plus tard ?", "Oui : des spots peuvent être ajoutés à tout moment. Pour des lettres rétroéclairées, mieux vaut le prévoir dès la fabrication."],
    ],
  },
};
