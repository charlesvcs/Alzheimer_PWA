/* =========================================================================
   Stockage — tout reste sur l'appareil. Aucun réseau, jamais.
   État de progression et réglages : localStorage.
   Photos de famille : IndexedDB (une photo ne doit pas saturer localStorage).
   ========================================================================= */

const CLE_ETAT = "sachet.etat.v1";
const CLE_REGLAGES = "sachet.reglages.v1";

const ETAT_INITIAL = {
  seances: 0,            // séances terminées — la seule source du jardin
  dernierExercice: null, // rotation anti-redondance
  derniereSeanceISO: null,
  vrDepuis: 0,           // essais depuis la dernière récompense
  vrSeuil: 1 + Math.floor(Math.random() * 4), // ratio variable, moyenne 2,5
  cachetsVus: [],
  inviteInstallMasquee: false,
};

const REGLAGES_INITIAUX = {
  code: "1234",
  personnes: [],   // { id, prenom, lien, souvenir, photoId }
  souvenirs: [],   // relances de réminiscence personnalisées
};

function lire(cle, defaut) {
  try {
    const brut = localStorage.getItem(cle);
    if (!brut) return structuredClone(defaut);
    return Object.assign(structuredClone(defaut), JSON.parse(brut));
  } catch {
    // Stockage indisponible (navigation privée, quota) : on tourne en mémoire.
    return structuredClone(defaut);
  }
}

function ecrire(cle, valeur) {
  try {
    localStorage.setItem(cle, JSON.stringify(valeur));
    return true;
  } catch {
    return false;
  }
}

export const etat = lire(CLE_ETAT, ETAT_INITIAL);
export const reglages = lire(CLE_REGLAGES, REGLAGES_INITIAUX);

export function sauverEtat() { return ecrire(CLE_ETAT, etat); }
export function sauverReglages() { return ecrire(CLE_REGLAGES, reglages); }

/* -------------------------------------------------------------------------
   Récompense à ratio variable.
   Imprévisible par construction : le seuil est retiré au sort après chaque
   récompense. Elle n'entre JAMAIS dans le compte des séances — le jardin
   reste un enregistrement honnête de ce qui a réellement été fait.
   ------------------------------------------------------------------------- */
export function tirerRecompense() {
  etat.vrDepuis += 1;
  if (etat.vrDepuis >= etat.vrSeuil) {
    etat.vrDepuis = 0;
    etat.vrSeuil = 1 + Math.floor(Math.random() * 4);
    sauverEtat();
    return true;
  }
  sauverEtat();
  return false;
}

/* -------------------------------------------------------------------------
   Le jardin. Un incrément par séance terminée, pas un de plus.
   Cinq séances font une fleur.
   ------------------------------------------------------------------------- */
export const PAR_FLEUR = 5;

export function jardin() {
  const total = etat.seances;
  const completes = Math.floor(total / PAR_FLEUR);
  const enCours = total % PAR_FLEUR;
  return { total, completes, enCours };
}

export function compterSeance() {
  etat.seances += 1;
  etat.derniereSeanceISO = new Date().toISOString();
  sauverEtat();
  return jardin();
}

/* -------------------------------------------------------------------------
   Photos — IndexedDB
   ------------------------------------------------------------------------- */
const DB_NOM = "sachet";
const DB_STORE = "photos";
let dbPromesse = null;

function ouvrirDB() {
  if (dbPromesse) return dbPromesse;
  dbPromesse = new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) return reject(new Error("IndexedDB absent"));
    const req = indexedDB.open(DB_NOM, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromesse;
}

export async function mettrePhoto(id, blob) {
  const db = await ouvrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    tx.objectStore(DB_STORE).put(blob, id);
    tx.oncomplete = () => resolve(id);
    tx.onerror = () => reject(tx.error);
  });
}

export async function lirePhoto(id) {
  if (!id) return null;
  try {
    const db = await ouvrirDB();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, "readonly");
      const req = tx.objectStore(DB_STORE).get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function supprimerPhoto(id) {
  if (!id) return;
  try {
    const db = await ouvrirDB();
    await new Promise((resolve) => {
      const tx = db.transaction(DB_STORE, "readwrite");
      tx.objectStore(DB_STORE).delete(id);
      tx.oncomplete = resolve;
      tx.onerror = resolve;
    });
  } catch { /* rien à supprimer */ }
}

/* Réduit la photo avant stockage : une photo d'iPhone pèse 4 Mo, on en garde
   environ 60 Ko. Côté appareil uniquement, aucun envoi. */
export function reduirePhoto(file, cote = 640) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const m = Math.min(cote / img.width, cote / img.height, 1);
      const w = Math.round(img.width * m);
      const h = Math.round(img.height * m);
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      c.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("conversion impossible"))),
        "image/jpeg",
        0.82
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("image illisible")); };
    img.src = url;
  });
}

export function nouvelId() {
  return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
