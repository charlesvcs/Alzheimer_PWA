import math, os
import pathlib
OUT = str(pathlib.Path(__file__).resolve().parent.parent / "assets" / "litho")
INK = "#2A2320"; SOIL = "#8A5A22"; LEAF = "#5E7350"; BLOOM = "#9B3357"; HEART = "#F0DFA8"

def wrap(body, title):
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" role="img" '
            f'aria-label="{title}">\n  <title>{title}</title>\n'
            f'  <g fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round" '
            f'stroke-linejoin="round">\n{body}\n  </g>\n</svg>\n')

def soil():
    """La terre occupe le quart bas du cadre. Une croûte de quelques pixels
    laisse le carré se lire comme vide ; une vraie profondeur le fait lire
    comme semé."""
    return (f'    <path d="M4 110 C 22 100 40 106 50 104 C 60 102 78 100 96 110 '
            f'L96 148 L4 148 Z" fill="{SOIL}"/>\n'
            f'    <path d="M4 110 C 22 100 40 106 50 104 C 60 102 78 100 96 110" stroke-width="3.4"/>\n'
            f'    <path d="M18 126 L30 126 M44 134 L58 134 M70 124 L82 124" stroke-width="1.6" '
            f'stroke="#6B451A"/>')

def leafpair(y, spread, drop, w):
    return (f'    <path d="M50 {y} C {50-spread} {y-drop} {50-spread-6} {y+8} 50 {y+4} Z" fill="{LEAF}"/>\n'
            f'    <path d="M50 {y} C {50+spread} {y-drop} {50+spread+6} {y+8} 50 {y+4} Z" fill="{LEAF}"/>')

S = []
# 0 — la graine
S.append(("stade-0.svg", soil() + f'\n    <ellipse cx="50" cy="128" rx="12" ry="9" fill="{HEART}"/>\n'
          f'    <path d="M42 126 C 47 121 53 121 58 126" stroke-width="1.8"/>\n'
          f'    <path d="M50 119 C 52 112 58 108 64 108 C 62 115 57 119 52 120" fill="{LEAF}"/>', "Une graine semée"))
# 1 — la pousse
S.append(("stade-1.svg", '    <path d="M50 132 L50 96" stroke-width="3.4"/>\n' + leafpair(100, 22, 11, 0) + '\n' + soil(), "Une jeune pousse"))
# 2 — la tige
S.append(("stade-2.svg", '    <path d="M50 134 C 52 112 48 94 50 70" stroke-width="3.4"/>\n'
          + leafpair(104, 26, 13, 0) + "\n" + leafpair(84, 23, 12, 0) + "\n" + soil(), "Une tige feuillue"))
# 3 — le bouton
body = ('    <path d="M50 134 C 52 108 48 86 50 60" stroke-width="3.4"/>\n'
        + leafpair(106, 26, 13, 0) + "\n" + leafpair(84, 23, 12, 0) + "\n"
        + f'    <path d="M50 34 C 64 40 64 62 50 66 C 36 62 36 40 50 34 Z" fill="{BLOOM}"/>\n'
        + f'    <path d="M44 64 C 48 56 52 56 56 64" stroke-width="2"/>\n' + soil())
S.append(("stade-3.svg", body, "Un bouton"))
# 4 — la fleur
petals = []
for i in range(14):
    a = 2 * math.pi * i / 14 + 0.1
    bx, by = 50 + math.cos(a) * 9, 52 + math.sin(a) * 9
    tx, ty = 50 + math.cos(a) * 29, 52 + math.sin(a) * 29
    px, py = -math.sin(a), math.cos(a)
    mx, my = (bx + tx) / 2, (by + ty) / 2
    petals.append(f'    <path d="M{bx:.1f} {by:.1f} Q{mx+px*5:.1f} {my+py*5:.1f} {tx:.1f} {ty:.1f} '
                  f'Q{mx-px*5:.1f} {my-py*5:.1f} {bx:.1f} {by:.1f} Z" fill="{BLOOM}"/>')
body = ('    <path d="M50 134 C 52 108 48 88 50 68" stroke-width="3.4"/>\n'
        + leafpair(108, 26, 13, 0) + "\n" + leafpair(86, 23, 12, 0) + "\n"
        + soil() + "\n"
        + "\n".join(petals) + "\n"
        + f'    <circle cx="50" cy="52" r="10" fill="{HEART}"/>\n'
        + '    <circle cx="47" cy="49" r="1.7" fill="#2A2320" stroke="none"/>\n'
        + '    <circle cx="53" cy="50" r="1.7" fill="#2A2320" stroke="none"/>\n'
        + '    <circle cx="50" cy="55" r="1.7" fill="#2A2320" stroke="none"/>')
S.append(("stade-4.svg", body, "Une fleur épanouie"))

for name, body, title in S:
    open(os.path.join(OUT, name), "w").write(wrap(body, title))
print("stades écrits :", [n for n, _, _ in S])
