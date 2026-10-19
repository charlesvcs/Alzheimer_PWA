# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

PWA installée sur l'écran d'accueil iOS (Safari, mode standalone). Reste du web mobile : le langage visuel est propre au produit, pas une imitation des composants natifs iOS.

## Stack

Static HTML/CSS/JS (vanilla, sans build, sans dépendance). Contrainte posée par l'utilisateur : « garde le tout léger ». Service worker + manifest pour l'installation et le hors-ligne.

## Users

**Utilisatrice primaire :** la grand-mère de l'utilisateur, femme âgée (80+), atteinte de la maladie d'Alzheimer au stade léger à modéré. Elle **n'aime pas faire** ces exercices de mémoire : c'est la contrainte centrale du produit, pas un détail d'adoption.

Confirmé : elle utilise l'app **seule, sur son iPhone/iPad**. L'app doit donc être totalement autonome — lancement en un tap, aucune impasse possible, aucune notion de configuration visible, sortie toujours évidente.

**Utilisateur secondaire :** son petit-fils (et par extension un aidant familial). Il installe l'app, saisit le contenu personnel, et ne doit jamais avoir besoin de toucher au code pour le faire.

## Product Purpose

Faire qu'une personne qui refuse les exercices de mémoire en fasse quelques minutes régulièrement, sans jamais se sentir testée ni mise en échec. Le succès ne se mesure pas en score cognitif mais en **retour spontané** : elle rouvre l'app d'elle-même, et elle n'en sort jamais diminuée.

## Positioning

Les applications d'entraînement cérébral vendent la performance (scores, niveaux, séries, chronos). Ce produit fait l'inverse : **il est structurellement incapable d'enregistrer un échec.** Il n'existe aucun état « faux » dans le code — seulement des essais guidés dont l'indice arrive avant que l'erreur ne s'installe. Le contenu est celui de sa propre vie, pas un catalogue générique.

## Operating Context

- iPhone/iPad tenu en main, en portrait, souvent dans une pièce peu éclairée, parfois sans lunettes adaptées.
- Sessions courtes, 3 à 8 minutes, idéalement 2+ fois par semaine (seuil au-delà duquel la littérature CST observe de meilleurs résultats).
- Hors-ligne possible et probable : le contenu personnel ne doit jamais dépendre du réseau.
- Un seul appareil, un seul utilisateur. Pas de comptes, pas de synchronisation, pas de cloud.
- Le contenu personnel (photos de famille, prénoms, souvenirs) est saisi par le petit-fils via un écran « Réglages famille » protégé par un code, invisible depuis le parcours de la grand-mère. L'app démarre avec un jeu de démonstration neutre et fonctionnel.

## Capabilities and Constraints

**Fonctionnalités confirmées :**
- Trois exercices en rotation : réminiscence guidée, association visage–prénom (rappel espacé + apprentissage sans erreur), reconnaissance visuelle de paires.
- Rotation anti-redondance : jamais le même exercice deux fois de suite, variation du thème d'accueil.
- Renforcement positif systématique, plus une micro-récompense à ratio variable (imprévisible).
- Progression visuelle métaphorique (un jardin qui pousse), sans aucun chiffre, score, pourcentage ou graphique.
- Cadrage médical rassurant avant et après chaque session.
- Écran « Réglages famille » protégé par un code : photos, prénoms, souvenirs. Stockage 100 % local (IndexedDB/localStorage).
- Installation sur l'écran d'accueil : invite discrète spécifique à Safari iOS.

**Contraintes techniques :**
- Aucun build, aucune dépendance externe, aucun appel réseau tiers.
- Doit fonctionner entièrement hors-ligne après la première visite.
- Les photos de famille ne quittent jamais l'appareil.
- Safari iOS : pas de prompt d'installation natif, pas de notifications fiables en standalone — l'invite d'installation doit être une instruction visuelle maison.

**Terminologie produit :** on dit « séance » et « exercice », jamais « test », « niveau », « score », « échec » ou « erreur ».

## Brand Commitments

- **Langue : français.** Adresse à la **deuxième personne du pluriel (vouvoiement)** — choix confirmé par l'utilisateur. « Bravo, votre cerveau vient de travailler. »
- Voix : rassurante, médicale sans être clinique, jamais infantilisante. Une personne de 80 ans n'est pas un enfant : ni emojis en cascade, ni ton gnangnan, ni félicitations disproportionnées.
- Contrainte visuelle volontairement posée par l'utilisateur : typographies très grandes, contraste élevé, palette pastel douce, boutons larges.

## Evidence on Hand

- Aucune photo, aucun prénom, aucun souvenir réel n'est fourni à ce stade. **À ne pas fabriquer** : le jeu de démonstration doit être visiblement générique et neutre, jamais présenté comme sa famille.
- Base clinique de référence (synthèse du 19/10/2026) : Cognitive Stimulation Therapy recommandée aux stades léger à modéré ; thérapie par réminiscence (effet le plus constant sur les symptômes dépressifs et neuropsychiatriques) ; rappel espacé (apprentissage d'associations visage–nom, maintenu ~5 semaines) ; apprentissage sans erreur (meilleure précision que l'essai-erreur) ; gamification — le progrès et la surprise sont des leviers d'adhésion, les scores et classements sont contre-productifs.

## Product Principles

1. **L'échec n'existe pas dans le code.** Pas seulement masqué dans l'UI : aucune branche ne peut enregistrer ou afficher un résultat négatif.
2. **Elle ne doit jamais se sentir testée.** Le cadrage est un soin, pas une évaluation.
3. **Son contenu, pas du contenu.** Les visages et les souvenirs sont les siens ; le générique est un échafaudage temporaire.
4. **Aucune impasse.** Tout écran offre une sortie évidente, en un seul geste, sans conséquence.
5. **Imprévisible dans la forme, immuable dans la structure.** La variation casse la redondance ; la disposition, elle, ne bouge jamais, sinon elle doit être réapprise à chaque fois.

## Accessibility & Inclusion

Accessibilité cognitive prioritaire, au-delà du WCAG :
- Corps de texte ≥ 22 px, titres ≥ 32 px, sans-serif sans fioritures. Jamais de texte en gris clair.
- Contraste visé **7:1** sur le texte courant (WCAG AAA), 4.5:1 minimum sur tout élément porteur de sens.
- Cibles tactiles ≥ 72 px de haut, séparées d'au moins 16 px.
- Une seule décision par écran. Deux ou trois choix au maximum, jamais plus.
- La couleur ne porte jamais seule une information (vision du bleu souvent altérée, cataracte fréquente).
- Aucune contrainte de temps, aucun chrono, aucune animation qui interrompt ou presse.
- Transitions douces et non abruptes ; respect de `prefers-reduced-motion`.
- Disposition strictement stable d'un écran à l'autre : les repères spatiaux sont une mémoire en soi.
