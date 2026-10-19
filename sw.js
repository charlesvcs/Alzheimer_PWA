/* Service worker — tout le nécessaire est mis en cache à l'installation.
   Après la première visite, l'application fonctionne entièrement hors ligne.
   Aucune requête ne sort vers un tiers : il n'y a aucun tiers. */

const VERSION = "jardin-v1";

const COQUILLE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/app.css",
  "./js/app.js",
  "./js/store.js",
  "./js/copy.js",
  "./assets/fonts/alfa-slab-one-latin.woff2",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-512-maskable.png",
  "./assets/icons/icon.svg",
  "./assets/litho/reine-marguerite.svg",
  "./assets/litho/pois-de-senteur.svg",
  "./assets/litho/lin-bleu.svg",
  "./assets/litho/souci.svg",
  "./assets/litho/motif-graine.svg",
  "./assets/litho/motif-dos.svg",
  "./assets/litho/motif-feuille.svg",
  "./assets/litho/motif-arrosoir.svg",
  "./assets/litho/motif-abeille.svg",
  "./assets/litho/motif-soleil.svg",
  "./assets/litho/motif-pot.svg",
  "./assets/litho/stade-0.svg",
  "./assets/litho/stade-1.svg",
  "./assets/litho/stade-2.svg",
  "./assets/litho/stade-3.svg",
  "./assets/litho/stade-4.svg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(COQUILLE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((cles) => Promise.all(cles.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;

  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req)
        .then((rep) => {
          if (rep && rep.ok && rep.type === "basic") {
            const copie = rep.clone();
            caches.open(VERSION).then((c) => c.put(req, copie));
          }
          return rep;
        })
        .catch(() =>
          req.mode === "navigate"
            ? caches.match("./index.html")
            : new Response("", { status: 504, statusText: "hors ligne" })
        );
    })
  );
});
