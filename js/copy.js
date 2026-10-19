/* =========================================================================
   Tous les textes de l'application.
   Vouvoiement. Registre soignant, jamais infantilisant, jamais disproportionné.
   Vocabulaire interdit : test, niveau, score, échec, erreur, faux, raté.
   ========================================================================= */

export const VARIETES = {
  souvenirs: {
    id: "reine-marguerite",
    nom: "Reine-Marguerite",
    litho: "assets/litho/reine-marguerite.svg",
  },
  associations: {
    id: "pois-de-senteur",
    nom: "Pois de Senteur",
    litho: "assets/litho/pois-de-senteur.svg",
  },
  paires: {
    id: "lin-bleu",
    nom: "Lin Bleu",
    litho: "assets/litho/lin-bleu.svg",
  },
  recolte: {
    id: "souci",
    nom: "Souci des Jardins",
    litho: "assets/litho/souci.svg",
  },
};

/* Le dos du sachet : le cadrage médical, en langage de culture. ----------- */
export const MODE_DE_CULTURE = {
  souvenirs: {
    titre: "Mode de culture",
    corps:
      "Se souvenir à voix haute réveille la mémoire ancienne, celle que le temps abîme en dernier.",
    rassurance:
      "Rien à trouver, rien à réussir : ce que vous direz sera juste.",
  },
  associations: {
    titre: "Mode de culture",
    corps:
      "Relier une image à son nom entretient la plasticité de votre cerveau, sa capacité à refaire des liens.",
    rassurance:
      "Chaque tentative compte, même hésitante : c'est la recherche qui fait le travail.",
  },
  paires: {
    titre: "Mode de culture",
    corps:
      "Retrouver une paire mobilise votre attention et votre mémoire visuelle.",
    rassurance:
      "Prenez tout le temps que vous voulez : il n'y a aucun chronomètre.",
  },
};

export const DUREE = "Environ deux minutes.";

/* Renforcement positif — chaque effort en déclenche un. ------------------- */
export const ENCOURAGEMENTS = [
  "C'est bien. Votre cerveau vient de travailler.",
  "Voilà. C'est exactement le bon effort.",
  "Très bien. Continuons tranquillement.",
  "C'est fait. Vous avez cherché, et chercher suffit.",
  "Bien. Ce petit effort-là compte vraiment.",
  "Parfait. On avance doucement, c'est la bonne façon.",
];

/* Cachets à ratio variable — ornement, jamais progression. ---------------- */
export const CACHETS = [
  { motif: "abeille",  texte: "Une abeille s'est posée sur votre sachet." },
  { motif: "soleil",   texte: "Un beau soleil sur vos semis." },
  { motif: "arrosoir", texte: "Vos semis sont arrosés." },
  { motif: "graine",   texte: "Une graine de plus dans la réserve." },
  { motif: "pot",      texte: "Un nouveau pot pour le rebord de la fenêtre." },
  { motif: "feuille",  texte: "Une feuille toute neuve." },
];

/* Réminiscence — questions ouvertes. Aucune n'a de bonne réponse.
   La famille peut les remplacer dans les réglages.                         */
export const SOUVENIRS_DEMO = [
  "Quelle odeur vous ramène tout de suite à la cuisine de votre enfance ?",
  "Y avait-il un jardin près de chez vous quand vous étiez petite ? Qu'est-ce qui y poussait ?",
  "Quelle chanson connaissiez-vous par cœur à vingt ans ?",
  "Quel était le plat du dimanche, chez vous ?",
  "À quoi ressemblait la cour de votre première école ?",
  "Quel métier vouliez-vous faire quand vous étiez jeune fille ?",
  "Y a-t-il un vêtement que vous avez adoré porter ?",
  "Quelles fleurs aimiez-vous cueillir ?",
  "Que faisiez-vous le dimanche après-midi ?",
  "Quel est le plus beau voyage que vous ayez fait ?",
  "Qui vous faisait rire, dans votre famille ?",
  "Quel temps faisait-il, le jour dont vous vous souvenez le mieux ?",
];

/* Jeu de démonstration des associations.
   Volontairement générique : ce sont les planches du sachet, pas des
   personnes. Rien ici ne doit pouvoir être pris pour sa famille.           */
export const ASSOCIATIONS_DEMO = [
  { id: "d1", prenom: "Reine-marguerite", lien: "Fleur d'automne",
    souvenir: "On la sème en avril, elle fleurit jusqu'aux gelées.",
    litho: "assets/litho/reine-marguerite.svg" },
  { id: "d2", prenom: "Lin bleu", lien: "Fleur des champs",
    souvenir: "Chaque fleur ne tient qu'un seul matin.",
    litho: "assets/litho/lin-bleu.svg" },
  { id: "d3", prenom: "Souci", lien: "Fleur du potager",
    souvenir: "On en met entre les tomates, ça éloigne les pucerons.",
    litho: "assets/litho/souci.svg" },
  { id: "d4", prenom: "Pois de senteur", lien: "Fleur grimpante",
    souvenir: "Elle embaume surtout le soir.",
    litho: "assets/litho/pois-de-senteur.svg" },
];

export const MOTIFS_PAIRES = [
  "graine", "feuille", "arrosoir", "abeille", "soleil", "pot",
];

export const T = {
  appNom: "Mon Jardin",

  accueilSalut: "Bonjour.",
  accueilLigne: "Votre sachet du jour est prêt.",
  accueilAction: "Commencer",
  accueilJardin: "Voir mon jardin",

  dosAction: "Je commence",

  continuer: "Continuer",
  suivant: "Continuer",
  terminer: "Terminer",
  retour: "Revenir",
  arreter: "Arrêter pour aujourd'hui",

  /* Souvenirs */
  souvenirsConsigne: "Prenez un moment. Vous pouvez répondre à voix haute.",
  souvenirsFait: "J'y ai repensé",
  souvenirsAutre: "Une autre question",

  /* Associations */
  assocQuestion: "Qui est-ce ?",
  assocQuestionDemo: "Quelle fleur est-ce ?",
  assocIndice: "Regardez bien : c'est celle-ci.",
  assocRevele: (nom) => `C'est ${nom}.`,

  /* Paires */
  pairesConsigne: "Retrouvez les deux images identiques.",
  pairesFini: "Vous les avez toutes retrouvées.",

  /* Récolte */
  recolteTitre: "Votre séance est terminée.",
  recolteCadrage:
    "C'est excellent pour votre cerveau : ces minutes entretiennent sa plasticité.",
  recolteSemis: "Un semis de plus dans votre jardin.",

  /* Jardin */
  jardinTitre: "Mon jardin",
  jardinVide: "Votre premier semis vous attend.",
  jardinLigne: "Un semis pour chaque séance. Cinq semis font une fleur.",

  /* Installation iOS */
  installTitre: "Installer sur l'écran d'accueil",
  installCorps:
    "Dans Safari, appuyez sur le bouton Partager, puis sur « Sur l'écran d'accueil ». L'application s'ouvrira ensuite d'un seul geste, même sans connexion.",
  installFermer: "Fermer",

  /* Réglages famille */
  reglagesTitre: "Réglages famille",
  reglagesCode: "Code d'accès",
  reglagesCodeAide: "Quatre chiffres. Par défaut : 1234.",
  reglagesCodeFaux: "Ce code ne correspond pas. Réessayez.",
  reglagesEntrer: "Entrer",
  reglagesPersonnes: "Les visages",
  reglagesPersonnesAide:
    "Ajoutez les proches de votre grand-mère. Tant qu'aucun visage n'est ajouté, l'exercice se fait avec les planches de fleurs du sachet.",
  reglagesPrenom: "Prénom",
  reglagesLien: "Lien de parenté",
  reglagesSouvenir: "Une phrase à son sujet",
  reglagesPhoto: "Photo",
  reglagesAjouter: "Ajouter cette personne",
  reglagesSouvenirsTitre: "Les questions de souvenirs",
  reglagesSouvenirsAide:
    "Une question par ligne. Laissez vide pour garder les questions par défaut.",
  reglagesEnregistrer: "Enregistrer",
  reglagesEnregistre: "Enregistré.",
  reglagesConfid:
    "Les photos et les textes restent sur cet appareil. Rien n'est envoyé nulle part.",
  reglagesSupprimer: "Supprimer",
  reglagesChangerCode: "Changer le code",
  reglagesRaz: "Remettre le jardin à zéro",
  reglagesRazConfirme:
    "Remettre le jardin à zéro ? Les semis déjà faits seront effacés. Les visages et les questions sont conservés.",
};

export function auHasard(liste, sauf) {
  const pool = sauf != null ? liste.filter((x) => x !== sauf) : liste;
  const src = pool.length ? pool : liste;
  return src[Math.floor(Math.random() * src.length)];
}

export function dateDuJour() {
  return new Date().toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long",
  });
}
