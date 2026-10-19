/* =========================================================================
   Mon Jardin — coquille, rotation, exercices.
   Règle structurelle : aucune branche de ce fichier n'enregistre ni
   n'affiche un résultat négatif. L'échec n'existe pas dans le code.
   ========================================================================= */

import {
  etat, reglages, sauverEtat, sauverReglages,
  tirerRecompense, jardin, compterSeance, PAR_FLEUR,
  lirePhoto, mettrePhoto, supprimerPhoto, reduirePhoto, nouvelId,
} from "./store.js";

import {
  VARIETES, MODE_DE_CULTURE, DUREE, ENCOURAGEMENTS, CACHETS,
  SOUVENIRS_DEMO, ASSOCIATIONS_DEMO, MOTIFS_PAIRES, T,
  auHasard, dateDuJour,
} from "./copy.js";

const app = document.getElementById("app");
const bandDate = document.getElementById("band-date");
const scene = document.getElementById("scene");
const exitRow = document.getElementById("exit");
const annonce = document.getElementById("annonce");
const cue = document.getElementById("cue");

const EXERCICES = ["souvenirs", "associations", "paires"];
const ESSAIS = { souvenirs: 2, associations: 3, paires: 3 };

let session = null;
let minuteurIndice = null;
let dernierEncouragement = null;
const urlsPhotos = [];

/* ---------------------------------------------------------------- outils */

function el(tag, props = {}, enfants = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") n.className = v;
    else if (k === "text") n.textContent = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else if (v !== null && v !== false && v !== undefined) n.setAttribute(k, v);
  }
  for (const c of [].concat(enfants)) if (c) n.append(c);
  return n;
}

function bouton(label, onClick, variante = "") {
  return el("button", { class: `btn ${variante}`.trim(), type: "button", onclick: onClick, text: label });
}

function litho(src, alt, court = false) {
  return el("div", { class: `litho${court ? " litho--short" : ""}` },
    el("img", { src, alt: alt || "", width: 200, height: 200 }));
}

function dire(texte) {
  annonce.textContent = "";
  setTimeout(() => { annonce.textContent = texte; }, 60);
}

function encouragement() {
  const e = auHasard(ENCOURAGEMENTS, dernierEncouragement);
  dernierEncouragement = e;
  return e;
}

function libererPhotos() {
  while (urlsPhotos.length) URL.revokeObjectURL(urlsPhotos.pop());
}

function peindre(varieteId) {
  app.dataset.variete = varieteId;
}

/* Le sachet : un conteneur unique, jamais une pile de cartes. */
function sachet({ varieteId, nomVariete, lithoSrc, lithoCourt, corps, flip = false }) {
  const p = el("article", { class: "packet" });
  if (lithoSrc) p.append(litho(lithoSrc, "", lithoCourt));
  if (nomVariete) p.append(el("p", { class: "variety", text: nomVariete }));
  p.append(el("div", { class: "packet__body" }, corps));
  peindre(varieteId);
  if (flip) {
    p.classList.add("is-flipping");
    p.addEventListener("animationend", () => p.classList.remove("is-flipping"), { once: true });
  }
  return p;
}

/* Remplace la scène. La sortie, elle, garde toujours la même place. */
function montrer(contenu, sortie, focusSur) {
  clearTimeout(minuteurIndice);
  libererPhotos();
  scene.replaceChildren(contenu);
  exitRow.replaceChildren(sortie || el("span", { class: "vh", text: " " }));
  const cible = focusSur || scene.querySelector(".monument") || scene.querySelector("h1, h2");
  if (cible) {
    cible.setAttribute("tabindex", "-1");
    cible.focus({ preventScroll: true });
  }
  scene.scrollTop = 0;
  majIndiceDefilement();
}

/* Le voile n'apparaît que s'il reste vraiment quelque chose dessous. */
function majIndiceDefilement() {
  if (!cue) return;
  const reste = scene.scrollHeight - scene.clientHeight - scene.scrollTop;
  cue.hidden = reste <= 4;
  if (cue.hidden) return;
  if (!cue.firstChild) cue.innerHTML = ICONE_BAS;
  cue.style.bottom = exitRow.offsetHeight + "px";
}

function sortieQuiet(label, onClick) {
  return el("button", { class: "btn btn--quiet", type: "button", onclick: onClick, text: label });
}

/* Le cachet à ratio variable : un ornement imprimé, jamais une progression. */
function cachetEventuel() {
  if (!tirerRecompense()) return null;
  const c = auHasard(CACHETS);
  return el("div", { class: "stamp", role: "note" }, [
    el("img", { src: `assets/litho/motif-${c.motif}.svg`, alt: "", width: 56, height: 56 }),
    el("p", { text: c.texte }),
  ]);
}

/* ------------------------------------------------------------- les listes */

function listeAssociations() {
  const fam = reglages.personnes.filter((p) => p.prenom);
  return fam.length >= 2 ? { pool: fam, demo: false } : { pool: ASSOCIATIONS_DEMO, demo: true };
}

function listeSouvenirs() {
  const perso = (reglages.souvenirs || []).filter((s) => s.trim());
  return perso.length ? perso : SOUVENIRS_DEMO;
}

/* ================================================================ ACCUEIL */

function ecranAccueil() {
  session = null;
  bandDate.textContent = dateDuJour();
  const v = VARIETES.recolte;
  const j = jardin();

  const corps = [
    el("p", { class: "lead", text: T.accueilSalut }),
    el("h1", { class: "monument", text: T.accueilLigne }),
    el("div", { class: "spacer" }),
    bouton(T.accueilAction, () => demarrerSession(), "btn--action"),
  ];

  montrer(
    sachet({ varieteId: v.id, nomVariete: VARIETES.recolte.nom, lithoSrc: v.litho, corps }),
    sortieQuiet(j.total ? T.accueilJardin : T.jardinTitre, ecranJardin)
  );
  proposerInstallation();
}

/* ============================================ ROTATION ANTI-REDONDANCE */

function demarrerSession() {
  const a = auHasard(EXERCICES, etat.dernierExercice);
  const b = auHasard(EXERCICES, a);
  session = { suite: [a, b], index: 0, essai: 0 };
  ecranModeDeCulture();
}

function exerciceCourant() {
  return session.suite[session.index];
}

/* Le dos du sachet : le cadrage médical. Unique retournement de la séance. */
function ecranModeDeCulture() {
  const ex = exerciceCourant();
  const v = VARIETES[ex];
  const m = MODE_DE_CULTURE[ex];

  const corps = [
    el("h1", { class: "lead", text: m.titre }),
    el("p", { class: "prose", text: m.corps }),
    el("p", { class: "prose soft", text: m.rassurance }),
    el("p", { class: "prose soft small", text: DUREE }),
    el("div", { class: "spacer" }),
    bouton(T.dosAction, lancerExercice, "btn--action"),
  ];

  montrer(
    sachet({ varieteId: v.id, nomVariete: v.nom, corps, flip: true }),
    sortieQuiet(T.arreter, ecranAccueil)
  );
}

function lancerExercice() {
  session.essai = 0;
  const ex = exerciceCourant();
  if (ex === "souvenirs") return exSouvenirs();
  if (ex === "associations") return exAssociations();
  return exPaires();
}

/* Fin d'un exercice : on passe au suivant, ou on récolte. */
function exerciceTermine() {
  etat.dernierExercice = exerciceCourant();
  sauverEtat();
  if (session.index === 0) {
    session.index = 1;
    return ecranPassage();
  }
  return ecranRecolte();
}

function ecranPassage() {
  const v = VARIETES[exerciceCourant()];
  const corps = [
    el("h1", { class: "monument", text: encouragement() }),
    el("p", { class: "prose soft", text: "Encore un petit exercice, puis c'est terminé." }),
    el("div", { class: "spacer" }),
    bouton(T.continuer, lancerExercice, "btn--action"),
  ];
  montrer(
    sachet({ varieteId: v.id, nomVariete: v.nom, corps }),
    sortieQuiet(T.arreter, ecranAccueil)
  );
  dire(corps[0].textContent);
}

/* ================================================= EXERCICE — SOUVENIRS
   Réminiscence. Question ouverte, aucune évaluation, aucune bonne réponse.
   ===================================================================== */

let dernierSouvenir = null;

/* Une question longue ne doit jamais pousser les boutons hors de l'écran. */
function taille(texte) {
  if (texte.length > 68) return " monument--xlong";
  if (texte.length > 38) return " monument--long";
  return "";
}

function exSouvenirs() {
  const v = VARIETES.souvenirs;
  const question = auHasard(listeSouvenirs(), dernierSouvenir);
  dernierSouvenir = question;

  const corps = [
    el("p", { class: "prose soft small", text: T.souvenirsConsigne }),
    el("h1", { class: `monument${taille(question)}`, text: question }),
    el("div", { class: "spacer" }),
    el("div", { class: "choices" }, [
      bouton(T.souvenirsFait, () => finSouvenir(), "btn--action"),
      bouton(T.souvenirsAutre, exSouvenirs),
    ]),
  ];

  montrer(
    sachet({ varieteId: v.id, nomVariete: v.nom, corps }),
    sortieQuiet(T.arreter, ecranAccueil)
  );
}

function finSouvenir() {
  session.essai += 1;
  const fini = session.essai >= ESSAIS.souvenirs;
  ecranRenfort(VARIETES.souvenirs, fini ? exerciceTermine : exSouvenirs);
}

/* =============================================== EXERCICE — ASSOCIATIONS
   Rappel espacé + apprentissage sans erreur.
   L'indice arrive AVANT que l'erreur ne s'installe : au bout de six
   secondes sans réponse, la bonne proposition s'encadre d'elle-même.
   ===================================================================== */

function exAssociations() {
  clearTimeout(minuteurIndice);
  const v = VARIETES.associations;
  const { pool, demo } = listeAssociations();

  const cible = auHasard(pool);
  const autres = pool.filter((p) => p.id !== cible.id);
  const choix = [cible, ...autres.sort(() => Math.random() - 0.5).slice(0, 2)]
    .sort(() => Math.random() - 0.5);

  const portrait = el("div", { class: "portrait portrait--empty" });
  const furniture = el("div", { class: "furniture" }, [
    el("h1", { class: "lead", text: demo ? T.assocQuestionDemo : T.assocQuestion }),
  ]);

  const boutons = choix.map((p) => {
    const b = bouton(p.prenom, () => repondreAssociation(p, cible, boutons, furniture, demo), "");
    b.dataset.id = p.id;
    return b;
  });
  const choisir = el("div", { class: `choices${boutons.length > 2 ? " choices--trois" : ""}` }, boutons);

  const corps = [portrait, furniture, el("div", { class: "spacer" }), choisir];
  // (le ressort est retiré à la révélation, où chaque pixel compte)

  montrer(
    sachet({ varieteId: v.id, nomVariete: v.nom, corps }),
    sortieQuiet(T.arreter, ecranAccueil)
  );

  remplirPortrait(portrait, cible);

  /* L'indice sans erreur : six secondes, puis la bonne réponse s'encadre. */
  minuteurIndice = setTimeout(() => {
    const b = boutons[choix.indexOf(cible)];
    if (!b || b.disabled) return;
    b.classList.add("is-bracketed");
    furniture.append(el("p", { class: "prose soft small", text: T.assocIndice }));
    dire(T.assocIndice);
  }, 6000);
}

async function remplirPortrait(noeud, personne) {
  if (personne.litho) {
    noeud.replaceChildren(el("img", { src: personne.litho, alt: "", width: 200, height: 200 }));
    return;
  }
  const blob = await lirePhoto(personne.photoId);
  if (blob) {
    const url = URL.createObjectURL(blob);
    urlsPhotos.push(url);
    noeud.classList.remove("portrait--empty");
    noeud.replaceChildren(el("img", { src: url, alt: "", width: 220, height: 220 }));
  } else {
    noeud.replaceChildren(el("img", { src: "assets/litho/motif-feuille.svg", alt: "", width: 120, height: 120 }));
  }
}

function repondreAssociation(choisi, cible, boutons, furniture, demo) {
  clearTimeout(minuteurIndice);
  boutons.forEach((b) => { b.disabled = true; b.classList.remove("is-bracketed"); });

  const bonne = boutons.find((b) => b.dataset.id === cible.id);
  if (bonne) bonne.classList.add("is-bracketed");

  /* Si ce n'est pas celle-ci, la proposition se biffe — une marque
     imprimée, lisible sans couleur. Jamais un rouge, jamais « faux ». */
  if (choisi.id !== cible.id) {
    const b = boutons.find((x) => x.dataset.id === choisi.id);
    if (b) b.classList.add("is-struck");
  }

  const portrait = document.querySelector(".portrait");
  if (portrait) portrait.classList.add("portrait--revele");
  const ressort = document.querySelector(".packet__body > .spacer");
  if (ressort) ressort.remove();

  const ligne = T.assocRevele(cible.prenom);
  furniture.replaceChildren(
    el("h1", { class: "lead", text: ligne }),
    el("p", { class: "prose soft small", text: cible.lien || "" }),
    cible.souvenir ? el("p", { class: "prose soft small", text: cible.souvenir }) : null
  );
  dire(ligne);

  /* On ne garde que les propositions qui enseignent quelque chose : la bonne,
     encadrée, et celle qu'elle a touchée, biffée. Les autres s'effacent —
     elles n'ont rien à dire et elles pousseraient « Continuer » hors écran. */
  boutons.forEach((b) => {
    if (b.dataset.id !== cible.id && b.dataset.id !== choisi.id) b.hidden = true;
  });
  boutons[0].parentElement.classList.add("choices--resolved");
  const suite = el("div", { class: "choices" }, bouton(T.continuer, () => {
    session.essai += 1;
    const fini = session.essai >= ESSAIS.associations;
    ecranRenfort(VARIETES.associations, fini ? exerciceTermine : exAssociations);
  }, "btn--action"));
  boutons[0].parentElement.after(suite);
  suite.querySelector("button").focus({ preventScroll: true });
  majIndiceDefilement();
}

/* ====================================================== EXERCICE — PAIRES
   Reconnaissance visuelle et association spatiale. Grille 2 × 3.
   Aucun chronomètre, aucun comptage de coups.
   ===================================================================== */

function exPaires() {
  const v = VARIETES.paires;
  const motifs = [...MOTIFS_PAIRES].sort(() => Math.random() - 0.5).slice(0, ESSAIS.paires);
  const cartes = [...motifs, ...motifs].sort(() => Math.random() - 0.5);

  let ouverte = null;
  let verrou = false;
  let trouvees = 0;

  const grille = el("div", { class: "pairs", role: "group", "aria-label": T.pairesConsigne });
  const ligne = el("h1", { class: "lead", text: T.pairesConsigne });

  cartes.forEach((motif, i) => {
    const img = el("img", {
      class: "pair__back", src: "assets/litho/motif-dos.svg", alt: "", width: 100, height: 100,
    });
    const carte = el("button", {
      class: "pair", type: "button", "aria-label": `Image ${i + 1}`,
    }, img);
    carte.dataset.motif = motif;

    carte.addEventListener("click", () => {
      if (verrou || carte.classList.contains("is-matched") || carte === ouverte) return;
      retourner(carte, img, motif);

      if (!ouverte) { ouverte = carte; return; }

      if (ouverte.dataset.motif === motif) {
        ouverte.classList.add("is-matched");
        carte.classList.add("is-matched");
        ouverte.setAttribute("aria-label", `Paire trouvée : ${motif}`);
        carte.setAttribute("aria-label", `Paire trouvée : ${motif}`);
        ouverte = null;
        trouvees += 1;
        session.essai = trouvees;
        dire("Une paire trouvée.");
        if (trouvees === motifs.length) {
          ligne.textContent = T.pairesFini;
          setTimeout(() => ecranRenfort(VARIETES.paires, exerciceTermine), 700);
        }
      } else {
        /* Pas une paire : les deux images se referment, sans aucune marque
           négative. Il ne s'est rien passé de mal. */
        verrou = true;
        const a = ouverte; ouverte = null;
        setTimeout(() => { refermer(a); refermer(carte); verrou = false; }, 1100);
      }
    });

    grille.append(carte);
  });

  const corps = [ligne, grille];
  montrer(
    sachet({ varieteId: v.id, nomVariete: v.nom, corps }),
    sortieQuiet(T.arreter, ecranAccueil)
  );
}

function retourner(carte, img, motif) {
  carte.classList.add("is-open");
  img.classList.remove("pair__back");
  img.src = `assets/litho/motif-${motif}.svg`;
}

function refermer(carte) {
  const img = carte.querySelector("img");
  carte.classList.remove("is-open");
  img.classList.add("pair__back");
  img.src = "assets/litho/motif-dos.svg";
}

/* ====================================================== RENFORT POSITIF */

function ecranRenfort(variete, suite) {
  const cachet = cachetEventuel();
  const mot = encouragement();

  const corps = [
    el("h1", { class: "monument", text: mot }),
    cachet,
    el("div", { class: "spacer" }),
    bouton(T.continuer, suite, "btn--action"),
  ];

  montrer(
    sachet({ varieteId: variete.id, nomVariete: variete.nom, corps }),
    sortieQuiet(T.arreter, ecranAccueil)
  );
  dire(cachet ? `${mot} ${cachet.textContent}` : mot);
}

/* ============================================================== RÉCOLTE */

/* Les trois derniers carrés du jardin, le semis du jour en dernier.
   La rangée fait toujours trois cases : à la première séance, un carré seul
   se lirait comme un vide, alors qu'une rangée entamée se lit comme un début.
   Les cases en attente ne sont pas un quota — rien n'annonce de total. */
function rangeeRecolte(j) {
  const stades = [];
  for (let i = 0; i < j.completes; i++) stades.push(PAR_FLEUR - 1);
  if (j.enCours > 0) stades.push(j.enCours - 1);
  const derniers = stades.slice(-3);

  const g = el("div", { class: "garden garden--rangee", role: "img",
    "aria-label": "Les derniers carrés de votre jardin" });
  derniers.forEach((st) => {
    g.append(el("div", { class: "plot" },
      el("img", { src: `assets/litho/stade-${st}.svg`, alt: "", width: 100, height: 150 })));
  });
  for (let i = derniers.length; i < 3; i++) {
    g.append(el("div", { class: "plot plot--empty", "aria-hidden": "true" }));
  }
  return g;
}

function ecranRecolte() {
  const j = compterSeance();
  const v = VARIETES.recolte;

  const corps = [
    rangeeRecolte(j),
    el("h1", { class: "monument", text: T.recolteTitre }),
    el("p", { class: "lead", text: T.recolteSemis }),
    el("p", { class: "prose prose--full soft small", text: T.recolteCadrage }),
    bouton(T.accueilJardin, ecranJardin, "btn--action"),
  ];

  montrer(
    sachet({ varieteId: v.id, nomVariete: v.nom, corps }),
    sortieQuiet(T.terminer, ecranAccueil)
  );
  session = null;
  dire(`${T.recolteTitre} ${T.recolteSemis}`);
}

/* =============================================================== JARDIN
   Un semis par séance réellement faite. Aucun chiffre, aucun pourcentage,
   et surtout aucune croissance décorative qui gonflerait le progrès.
   ===================================================================== */

function ecranJardin() {
  const j = jardin();
  const v = VARIETES.recolte;
  peindre(v.id);

  const grille = el("div", { class: "garden" });
  for (let i = 0; i < j.completes; i++) {
    grille.append(el("div", { class: "plot" },
      el("img", { src: `assets/litho/stade-${PAR_FLEUR - 1}.svg`, alt: "Une fleur épanouie", width: 100, height: 150 })));
  }
  if (j.enCours > 0) {
    grille.append(el("div", { class: "plot" },
      el("img", { src: `assets/litho/stade-${j.enCours - 1}.svg`, alt: "Un semis en cours", width: 100, height: 150 })));
  }
  if (j.total === 0) {
    grille.append(el("div", { class: "plot plot--empty" },
      el("img", { src: "assets/litho/stade-0.svg", alt: "", width: 100, height: 150 })));
  }

  const corps = [
    el("h1", { class: "monument", text: T.jardinTitre }),
    el("p", { class: "prose soft", text: j.total === 0 ? T.jardinVide : T.jardinLigne }),
    grille,
  ];

  montrer(
    el("article", { class: "packet packet--auto" }, el("div", { class: "packet__body" }, corps)),
    sortieQuiet(T.retour, ecranAccueil)
  );
}

/* ============================================= INSTALLATION SUR iOS
   Pour l'aidant qui installe, pas pour elle. Discrète, et une seule fois.
   ===================================================================== */

function estIOS() {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function estInstallee() {
  return window.navigator.standalone === true ||
    window.matchMedia("(display-mode: standalone)").matches;
}

const ICONE_BAS =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" ' +
  'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M7 10l5 5 5-5"/></svg>';

const ICONE_CROIX =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
  'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' +
  'style="width:22px;height:22px">' +
  '<path d="M6 6l12 12"/><path d="M18 6L6 18"/></svg>';

const ICONE_PARTAGE =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
  'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M12 3v12"/><path d="M8 7l4-4 4 4"/>' +
  '<path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"/></svg>';

function proposerInstallation() {
  if (etat.inviteInstallMasquee || estInstallee() || !estIOS()) return;
  if (document.getElementById("install")) return;

  setTimeout(() => {
    if (document.getElementById("install")) return;
    const bloc = el("aside", { class: "install", id: "install", role: "note", "aria-label": T.installTitre }, [
      el("div", {}, [
        el("p", { html: `<strong>${T.installTitre}</strong>` }),
        el("p", { html: T.installCorps.replace("Partager", `Partager ${ICONE_PARTAGE}`) }),
      ]),
      el("button", {
        class: "install__close", type: "button", "aria-label": T.installFermer, html: ICONE_CROIX,
        onclick: () => {
          etat.inviteInstallMasquee = true;
          sauverEtat();
          bloc.remove();
        },
      }),
    ]);
    document.body.append(bloc);
  }, 1500);
}

/* ==================================================== RÉGLAGES FAMILLE
   Invisible depuis son parcours : appui long de 2,5 s sur la date, ou
   l'adresse #reglages. Protégé par un code.
   ===================================================================== */

function ecranCode() {
  const champ = el("input", {
    type: "tel", inputmode: "numeric", maxlength: "8",
    autocomplete: "off", "aria-label": T.reglagesCode, id: "code",
  });
  const erreur = el("p", { class: "prose soft small", role: "alert" });

  const valider = () => {
    if (champ.value === String(reglages.code)) return ecranReglages();
    erreur.textContent = T.reglagesCodeFaux;
    champ.value = "";
    champ.focus();
  };
  champ.addEventListener("keydown", (e) => { if (e.key === "Enter") valider(); });

  const corps = [
    el("h1", { class: "lead", text: T.reglagesTitre }),
    el("div", { class: "field" }, [
      el("label", { for: "code", text: T.reglagesCode }),
      champ,
      el("p", { class: "prose soft small", text: T.reglagesCodeAide }),
    ]),
    erreur,
    el("div", { class: "spacer" }),
    bouton(T.reglagesEntrer, valider, "btn--action"),
  ];

  peindre(VARIETES.recolte.id);
  montrer(
    el("article", { class: "packet" }, el("div", { class: "packet__body" }, corps)),
    sortieQuiet(T.retour, ecranAccueil)
  );
  champ.focus();
}

function ecranReglages() {
  const feuille = el("div", { class: "sheet" });
  const etatSauve = el("p", { class: "prose soft small", role: "status" });

  /* --- les visages --------------------------------------------------- */
  const liste = el("div", { class: "sheet" });

  const redessinerListe = async () => {
    liste.replaceChildren();
    if (!reglages.personnes.length) {
      liste.append(el("div", { class: "notice" },
        el("p", { style: "margin:0", text: T.reglagesPersonnesAide })));
    }
    for (const p of reglages.personnes) {
      const blob = await lirePhoto(p.photoId);
      let vignette;
      if (blob) {
        const url = URL.createObjectURL(blob);
        urlsPhotos.push(url);
        vignette = el("img", { src: url, alt: "", width: 76, height: 76 });
      } else {
        vignette = el("div", { class: "person__ph" });
      }
      const rangee = el("div", { class: "person" }, [
        vignette,
        el("div", {}, [
          el("p", { class: "person__name", text: p.prenom, style: "margin:0" }),
          el("p", { class: "person__meta", text: [p.lien, p.souvenir].filter(Boolean).join(" · "), style: "margin:0" }),
        ]),
        el("button", {
          class: "person__del", type: "button",
          "aria-label": `${T.reglagesSupprimer} ${p.prenom}`, html: ICONE_CROIX,
          onclick: async () => {
            await supprimerPhoto(p.photoId);
            reglages.personnes = reglages.personnes.filter((x) => x.id !== p.id);
            sauverReglages();
            redessinerListe();
          },
        }),
      ]);
      liste.append(rangee);
    }
  };

  const prenom = el("input", { type: "text", id: "r-prenom", autocomplete: "off" });
  const lien = el("input", { type: "text", id: "r-lien", autocomplete: "off" });
  const souvenir = el("input", { type: "text", id: "r-souvenir", autocomplete: "off" });
  const photo = el("input", { type: "file", accept: "image/*", id: "r-photo" });

  const ajouter = async () => {
    if (!prenom.value.trim()) { prenom.focus(); return; }
    const personne = {
      id: nouvelId(), prenom: prenom.value.trim(),
      lien: lien.value.trim(), souvenir: souvenir.value.trim(), photoId: null,
    };
    const f = photo.files && photo.files[0];
    if (f) {
      try {
        const petite = await reduirePhoto(f);
        personne.photoId = nouvelId();
        await mettrePhoto(personne.photoId, petite);
      } catch {
        personne.photoId = null; // la personne reste utilisable sans photo
      }
    }
    reglages.personnes.push(personne);
    sauverReglages();
    prenom.value = lien.value = souvenir.value = ""; photo.value = "";
    etatSauve.textContent = T.reglagesEnregistre;
    redessinerListe();
  };

  /* --- les questions de souvenirs ------------------------------------ */
  const zoneSouvenirs = el("textarea", {
    id: "r-souvenirs", rows: "6", placeholder: SOUVENIRS_DEMO.slice(0, 2).join("\n"),
  });
  zoneSouvenirs.value = (reglages.souvenirs || []).join("\n");

  /* --- le code -------------------------------------------------------- */
  const nouveauCode = el("input", { type: "tel", inputmode: "numeric", maxlength: "8", id: "r-code" });
  nouveauCode.value = reglages.code;

  const enregistrer = () => {
    reglages.souvenirs = zoneSouvenirs.value.split("\n").map((s) => s.trim()).filter(Boolean);
    const c = nouveauCode.value.trim();
    if (c) reglages.code = c;
    sauverReglages();
    etatSauve.textContent = T.reglagesEnregistre;
    dire(T.reglagesEnregistre);
  };

  feuille.append(
    el("h1", { class: "lead", text: T.reglagesTitre }),
    el("div", { class: "notice" }, el("p", { style: "margin:0", text: T.reglagesConfid })),

    el("hr", { class: "rule" }),
    el("h2", { class: "lead", text: T.reglagesPersonnes }),
    liste,
    el("div", { class: "field" }, [el("label", { for: "r-prenom", text: T.reglagesPrenom }), prenom]),
    el("div", { class: "field" }, [el("label", { for: "r-lien", text: T.reglagesLien }), lien]),
    el("div", { class: "field" }, [el("label", { for: "r-souvenir", text: T.reglagesSouvenir }), souvenir]),
    el("div", { class: "field" }, [el("label", { for: "r-photo", text: T.reglagesPhoto }), photo]),
    bouton(T.reglagesAjouter, ajouter),

    el("hr", { class: "rule" }),
    el("h2", { class: "lead", text: T.reglagesSouvenirsTitre }),
    el("p", { class: "prose soft small", text: T.reglagesSouvenirsAide }),
    zoneSouvenirs,

    el("hr", { class: "rule" }),
    el("div", { class: "field" }, [
      el("label", { for: "r-code", text: T.reglagesChangerCode }), nouveauCode,
    ]),

    bouton(T.reglagesEnregistrer, enregistrer, "btn--action"),
    etatSauve,

    el("hr", { class: "rule" }),
    bouton(T.reglagesRaz, () => {
      if (!confirm(T.reglagesRazConfirme)) return;
      etat.seances = 0; etat.dernierExercice = null; sauverEtat();
      etatSauve.textContent = T.reglagesEnregistre;
    }),
  );

  peindre(VARIETES.recolte.id);
  montrer(
    el("article", { class: "packet" }, el("div", { class: "packet__body" }, feuille)),
    sortieQuiet(T.retour, ecranAccueil)
  );
  redessinerListe();
}

/* Appui long de 2,5 s sur la date — invisible pour elle. */
function armerAccesReglages() {
  let t = null;
  const demarrer = () => { t = setTimeout(ecranCode, 2500); };
  const stopper = () => { clearTimeout(t); t = null; };
  ["pointerdown"].forEach((e) => bandDate.addEventListener(e, demarrer));
  ["pointerup", "pointerleave", "pointercancel"].forEach((e) =>
    bandDate.addEventListener(e, stopper));
  bandDate.addEventListener("contextmenu", (e) => e.preventDefault());

  /* L'adresse #reglages marche aussi quand la page est déjà ouverte :
     changer le fragment ne recharge rien, il faut l'écouter. */
  window.addEventListener("hashchange", () => {
    if (location.hash !== "#reglages") return;
    history.replaceState(null, "", location.pathname + location.search);
    ecranCode();
  });

  if (location.hash === "#reglages") {
    history.replaceState(null, "", location.pathname + location.search);
    ecranCode();
    return true;
  }
  return false;
}

/* ================================================================ DÉPART */

function demarrer() {
  bandDate.textContent = dateDuJour();
  scene.addEventListener("scroll", majIndiceDefilement, { passive: true });
  window.addEventListener("resize", majIndiceDefilement);
  if (!armerAccesReglages()) ecranAccueil();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => { /* hors-ligne plus tard */ });
    });
  }
}

demarrer();
