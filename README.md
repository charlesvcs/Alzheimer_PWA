# Mon Jardin

Une PWA d'exercices de mémoire, en français, conçue pour une personne de plus de
80 ans atteinte de la maladie d'Alzheimer au stade léger à modéré — et plus
précisément pour quelqu'un qui **n'aime pas** faire ces exercices.

Aucune dépendance, aucun build, aucun réseau. 203 Ko au total, icônes comprises.

---

## Mettre en service

### 1. Servir les fichiers en HTTPS

Un service worker exige `https://` (ou `http://localhost`). N'importe quel
hébergement statique convient : GitHub Pages, Netlify, Cloudflare Pages, un
dossier sur un serveur existant.

En local, pour essayer :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

### 2. L'installer sur son iPhone ou son iPad

Ouvrir l'adresse **dans Safari** (ni Chrome ni Firefox : sur iOS, eux ne savent
pas installer de PWA). Une invite discrète apparaît au bout de 1,5 s et explique
le geste : **Partager → Sur l'écran d'accueil**.

Une fois installée, l'application s'ouvre en plein écran, sans barre d'adresse,
et fonctionne **entièrement hors connexion**.

### 3. Remplir « Réglages famille »

Deux accès, tous deux invisibles depuis son parcours à elle :

- **appui long de 2,5 secondes** sur la date, en haut de l'écran ;
- ou l'adresse `…/index.html#reglages`.

**Code par défaut : `1234`** — changez-le dans l'écran lui-même.

On y ajoute :

- **Les visages** — photo, prénom, lien de parenté, et une phrase à son sujet.
  Les photos sont réduites à 640 px et stockées dans IndexedDB, **sur
  l'appareil uniquement**. Rien n'est envoyé nulle part, il n'y a aucun serveur.
- **Les questions de souvenirs** — une par ligne, pour remplacer les questions
  génériques par celles de sa vie à elle. C'est là que se joue l'essentiel de
  l'efficacité clinique de l'app.

Tant qu'aucun visage n'est ajouté, l'exercice d'association tourne avec les
**planches de fleurs** du sachet. C'est un exercice valide (association
image–nom), et surtout **visiblement générique** : rien n'y est présenté comme
sa famille.

---

## Les choix cliniques

| Exercice | Fondement | Ce qu'il fait |
|---|---|---|
| **Souvenirs** | Thérapie par réminiscence | Question ouverte sur sa vie. Aucune évaluation, aucune bonne réponse. C'est l'intervention dont l'effet est le plus constant sur les symptômes dépressifs et neuropsychiatriques. |
| **Associations** | Rappel espacé + apprentissage sans erreur | Relier un visage à un prénom. Le rappel espacé est efficace pour réapprendre les associations visage–nom, avec un maintien d'environ cinq semaines. |
| **Paires** | Reconnaissance visuelle, association spatiale | Grille 2 × 3. La mémoire de reconnaissance est mieux préservée que le rappel libre : l'exercice reste faisable même les mauvais jours. |

Le format court et répété suit la logique de la **Cognitive Stimulation
Therapy**, recommandée aux stades léger à modéré, avec de meilleurs résultats
observés à partir de deux séances par semaine.

### L'apprentissage sans erreur, concrètement

Dans l'exercice d'association, **l'indice arrive avant que l'erreur ne
s'installe** : au bout de six secondes sans réponse, la bonne proposition
s'encadre d'elle-même. Si elle choisit une autre proposition, celle-ci se
**biffe** — une marque imprimée, pas un rouge d'échec — et la bonne s'encadre
aussitôt, suivie d'un renforcement positif. L'essai-erreur encode l'erreur ;
l'apprentissage sans erreur l'évite.

---

## Les choix psychologiques

**Récompense à ratio variable.** Un cachet imprimé (une abeille, un soleil, un
arrosoir) apparaît en moyenne une fois sur 2,5 essais, le seuil étant retiré au
sort après chaque récompense. L'imprévisibilité est ce qui empêche la séance de
devenir routinière. Voir `js/store.js`, `tirerRecompense()`.

**Rotation anti-redondance.** Jamais le même exercice deux fois de suite, et
chaque exercice repeint l'écran entier de sa propre couleur et de sa propre
fleur. Une séance ne ressemble pas à la précédente.

**Cadrage médical.** Le dos du sachet — « Mode de culture » — explique le
bénéfice en langage de culture, avant chaque séance, et la récolte le redit
après. Le ton est soignant, jamais infantilisant.

**Valorisation sans score.** Le jardin pousse d'**un semis par séance
réellement faite**, cinq semis faisant une fleur. Aucun chiffre, aucun
pourcentage, aucun graphique, aucune série à ne pas rompre. Et surtout : aucune
croissance décorative qui gonflerait le progrès — ce serait un mensonge, et il
se verrait.

**L'échec n'existe pas dans le code.** Ce n'est pas qu'il soit masqué dans
l'interface : aucune branche de `js/app.js` n'enregistre ni n'affiche un
résultat négatif. Il n'y a pas de variable de score à cacher.

---

## Accessibilité

- Corps de texte à 23 px, titres de 34 à 46 px, sans-serif système (SF Pro sur
  iOS). Sur écran court, le corps descend à 22 px et pas plus bas : c'est un
  plancher, pas un réglage.
- Contraste encre sur champ pastel : **de 9,9:1 à 11,6:1** selon la variété,
  au-delà du seuil AAA de 7:1. Le point le plus bas de toute l'application est
  l'étiquette du bouton d'action, à 5,2:1 — au-dessus du seuil AA de 4,5:1.
  Mesuré sur les couleurs réellement rendues, écran par écran.
- Cibles tactiles de 76 à 88 px, séparées de 20 px. Les propositions déjà
  résolues descendent à 56 px : à ce moment-là elles sont désactivées et ne
  sont plus des cibles, seulement des marques imprimées.
- Quand un écran dépasse, il le dit : un chevron imprimé apparaît au-dessus de
  la sortie, et seulement s'il reste réellement quelque chose à lire.
- Une seule décision par écran, deux ou trois choix au maximum.
- **La couleur ne porte jamais seule une information** : chaque état est une
  marque imprimée de forme distincte — équerres aux coins, plein, barre biffée.
  L'écran reste entièrement lisible en noir et blanc.
- **Le rouge madder ne sert qu'à l'action.** Il n'apparaît nulle part ailleurs,
  pas même dans les fleurs dessinées : les floraisons sont en grenat. Sans
  cette discipline, la couleur de l'action cesse de vouloir dire « touchez ici ».
- Aucune contrainte de temps, aucun chronomètre.
- `prefers-reduced-motion` remplace le retournement par une fusion ;
  `prefers-contrast: more` épaissit les filets.
- Disposition strictement stable : la sortie est toujours au même endroit, sur
  tous les écrans, sans exception.

---

## Vérifié, pas supposé

- **Hors ligne** : service worker actif, 29 entrées en cache ; rechargement
  sans réseau, la page s'affiche avec ses lithographies et sa police, et une
  séance démarre normalement.
- **Installation** : manifeste valide en `display: standalone`, trois icônes,
  les cinq métas Apple présentes dont `viewport-fit=cover`.
- **Mise en page** : débordement vertical mesuré sur les treize écrans à trois
  tailles d'iPhone. Zéro débordement sur onze d'entre eux en 390 × 844 ; le
  jardin dépasse de 4 px et les réglages défilent par construction. En
  320 × 568 — un iPhone SE de 2016 — plusieurs écrans défilent encore : c'est
  assumé, le chevron le signale, et ce n'est pas l'appareil visé.
- **Aucune erreur** console ni JavaScript sur l'ensemble du parcours.

## Structure

```
index.html              coquille : bandeau, scène, sortie
manifest.webmanifest    installation, icônes, mode standalone
sw.js                   cache de la coquille, fonctionnement hors ligne
css/app.css             le monde visuel complet
js/copy.js              tous les textes et le contenu de démonstration
js/store.js             localStorage, IndexedDB, ratio variable, jardin
js/app.js               routeur, rotation, les trois exercices, réglages
assets/litho/*.svg      lithographies dessinées pour le projet
tools/gen_*.py          les scripts qui les produisent (géométrie calculée)
assets/fonts/           Alfa Slab One, sous-ensemble latin (11 Ko, OFL)
assets/icons/           icônes d'application
DESIGN.md               le système visuel tel que construit
PRODUCT.md              la vérité produit
```

## Ce qui n'est pas fait

- **Pas d'écrans de démarrage iOS** (`apple-touch-startup-image`). Il en faudrait
  une par taille d'appareil ; à ajouter si le flash blanc au lancement gêne.
- **Pas de sauvegarde ni d'export.** Effacer les données de Safari efface les
  photos et le jardin. Si c'est un risque, faites une photo d'écran des
  réglages après les avoir remplis.
- **Pas de notifications.** iOS ne les rend pas fiables en PWA, et un rappel
  qu'on ne peut pas garantir vaut moins que pas de rappel du tout.
