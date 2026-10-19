# Génération des assets

Les SVG de `assets/litho/` et l'icône de `assets/icons/icon.svg` ne sont pas
dessinés à la main : leur géométrie est calculée, ce qui garde les pétales,
les nervures et les filets réguliers d'un motif à l'autre.

```bash
python3 tools/gen_litho.py     # fleurs, motifs de paires, icône
python3 tools/gen_stages.py    # les cinq stades de croissance du jardin
```

Puis rasteriser les icônes (iOS n'accepte pas de SVG pour apple-touch-icon) :

```bash
cd assets/icons
magick -background '#F0DFA8' icon.svg -resize 180x180 apple-touch-icon.png
magick -background '#F0DFA8' icon.svg -resize 192x192 icon-192.png
magick -background '#F0DFA8' icon.svg -resize 512x512 icon-512.png
magick -background '#F0DFA8' icon.svg -resize 410x410 -gravity center \
       -extent 512x512 icon-512-maskable.png
```

Les chemins de sortie sont absolus en tête de chaque script : adaptez-les si
vous déplacez le projet.
