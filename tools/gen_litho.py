import math, os, textwrap

import pathlib
OUT = str(pathlib.Path(__file__).resolve().parent.parent / "assets" / "litho")
os.makedirs(OUT, exist_ok=True)

INK = "#2A2320"
SW = 3.2

def svg(name, body, vb=200, title=""):
    doc = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb} {vb}" '
        f'role="img" aria-label="{title}">\n'
        f'  <title>{title}</title>\n'
        f'  <g fill="none" stroke="{INK}" stroke-width="{SW}" '
        f'stroke-linecap="round" stroke-linejoin="round">\n{body}\n  </g>\n</svg>\n'
    )
    with open(os.path.join(OUT, name), "w") as f:
        f.write(doc)
    return name

def petal_ring(cx, cy, count, r_in, r_out, w, fill, phase=0.0):
    """Narrow lanceolate petals radiating from a centre, flat fill, ink outline."""
    out = []
    for i in range(count):
        a = phase + 2 * math.pi * i / count
        ca, sa = math.cos(a), math.sin(a)
        # perpendicular
        px, py = -sa, ca
        bx, by = cx + ca * r_in, cy + sa * r_in
        tx, ty = cx + ca * r_out, cy + sa * r_out
        mx, my = cx + ca * (r_in + r_out) / 2, cy + sa * (r_in + r_out) / 2
        c1 = (mx + px * w, my + py * w)
        c2 = (mx - px * w, my - py * w)
        d = (f"M{bx:.1f} {by:.1f} Q{c1[0]:.1f} {c1[1]:.1f} {tx:.1f} {ty:.1f} "
             f"Q{c2[0]:.1f} {c2[1]:.1f} {bx:.1f} {by:.1f} Z")
        out.append(f'    <path d="{d}" fill="{fill}"/>')
    return "\n".join(out)

def round_petal_ring(cx, cy, count, r, rr, fill, phase=0.0):
    """Broad round petals on a circle of radius r."""
    out = []
    for i in range(count):
        a = phase + 2 * math.pi * i / count
        x, y = cx + math.cos(a) * r, cy + math.sin(a) * r
        out.append(f'    <circle cx="{x:.1f}" cy="{y:.1f}" r="{rr:.1f}" fill="{fill}"/>')
    return "\n".join(out)

def disc(cx, cy, r, fill, dots=0, dot_fill=INK):
    out = [f'    <circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}"/>']
    if dots:
        for i in range(dots):
            a = 2 * math.pi * i / dots
            rr = r * 0.55
            out.append(f'    <circle cx="{cx+math.cos(a)*rr:.1f}" cy="{cy+math.sin(a)*rr:.1f}" '
                       f'r="{max(1.6, r*0.14):.1f}" fill="{dot_fill}" stroke="none"/>')
        out.append(f'    <circle cx="{cx}" cy="{cy}" r="{r*0.18:.1f}" fill="{dot_fill}" stroke="none"/>')
    return "\n".join(out)

def leaf(x, y, dx, dy, w, fill="#5E7350", veins=3):
    """Lanceolate leaf from (x,y) to (x+dx,y+dy) with hatched veins."""
    ex, ey = x + dx, y + dy
    L = math.hypot(dx, dy) or 1
    ux, uy = dx / L, dy / L
    px, py = -uy, ux
    mx, my = x + dx / 2, y + dy / 2
    d = (f"M{x:.1f} {y:.1f} Q{mx+px*w:.1f} {my+py*w:.1f} {ex:.1f} {ey:.1f} "
         f"Q{mx-px*w:.1f} {my-py*w:.1f} {x:.1f} {y:.1f} Z")
    out = [f'    <path d="{d}" fill="{fill}"/>',
           f'    <path d="M{x:.1f} {y:.1f} L{ex:.1f} {ey:.1f}" stroke-width="2"/>']
    for i in range(1, veins + 1):
        t = i / (veins + 1)
        bx, by = x + dx * t, y + dy * t
        sp = w * (1 - abs(t - 0.5) * 1.3) * 0.46
        out.append(f'    <path d="M{bx:.1f} {by:.1f} L{bx+px*sp+ux*6:.1f} {by+py*sp+uy*6:.1f}" stroke-width="1.3"/>')
        out.append(f'    <path d="M{bx:.1f} {by:.1f} L{bx-px*sp+ux*6:.1f} {by-py*sp+uy*6:.1f}" stroke-width="1.3"/>')
    return "\n".join(out)

def stem(d, w=4.0):
    return f'    <path d="{d}" stroke-width="{w}"/>'

# ---------------------------------------------------------------- 1. aster
b = []
b.append(stem("M100 196 C 98 160 102 140 100 118"))
b.append(leaf(99, 168, -42, -16, 13))
b.append(leaf(101, 148, 40, -14, 12))
b.append(petal_ring(100, 88, 18, 22, 62, 7.5, "#9B3357", phase=0.09))
b.append(petal_ring(100, 88, 13, 14, 40, 7.0, "#B4546F", phase=0.31))
b.append(disc(100, 88, 15, "#F0DFA8", dots=8))
svg("reine-marguerite.svg", "\n".join(b), title="Reine-marguerite")

# ------------------------------------------------------------- 2. sweet pea
b = []
b.append(stem("M104 196 C 96 158 110 132 100 104"))
b.append(leaf(103, 170, -40, -22, 12))
b.append(leaf(106, 146, 38, -20, 11))
# tendrils
b.append('    <path d="M100 118 C 128 112 134 96 124 88 C 118 83 112 88 116 94" stroke-width="2.4"/>')
b.append('    <path d="M101 130 C 74 124 68 110 78 102 C 84 97 90 102 86 108" stroke-width="2.4"/>')
for (cx, cy, s, f1, f2) in ((100, 72, 1.0, "#D9697A", "#EFC9C2"), (64, 100, 0.72, "#D9697A", "#EFC9C2"), (136, 96, 0.72, "#D9697A", "#EFC9C2")):
    w = 44 * s; h = 30 * s
    b.append(f'    <path d="M{cx:.0f} {cy+h*0.55:.0f} C {cx-w*0.95:.0f} {cy+h*0.3:.0f} {cx-w*0.8:.0f} {cy-h*0.95:.0f} {cx:.0f} {cy-h*0.5:.0f} '
             f'C {cx+w*0.8:.0f} {cy-h*0.95:.0f} {cx+w*0.95:.0f} {cy+h*0.3:.0f} {cx:.0f} {cy+h*0.55:.0f} Z" fill="{f1}"/>')
    b.append(f'    <path d="M{cx:.0f} {cy+h*0.62:.0f} C {cx-w*0.52:.0f} {cy+h*0.72:.0f} {cx-w*0.42:.0f} {cy+h*1.5:.0f} {cx:.0f} {cy+h*1.42:.0f} '
             f'C {cx+w*0.42:.0f} {cy+h*1.5:.0f} {cx+w*0.52:.0f} {cy+h*0.72:.0f} {cx:.0f} {cy+h*0.62:.0f} Z" fill="{f2}"/>')
    b.append(f'    <path d="M{cx:.0f} {cy-h*0.46:.0f} L{cx:.0f} {cy+h*0.5:.0f}" stroke-width="1.8"/>')
svg("pois-de-senteur.svg", "\n".join(b), title="Pois de senteur")

# ----------------------------------------------------------------- 3. flax
b = []
b.append(stem("M100 196 C 104 162 96 138 100 112"))
b.append(leaf(99, 176, -34, -26, 9))
b.append(leaf(102, 152, 32, -24, 9))
b.append(leaf(99, 134, -28, -22, 8))
b.append(round_petal_ring(100, 84, 5, 34, 26, "#6B7FB5", phase=-math.pi / 2))
for i in range(5):
    a = -math.pi / 2 + 2 * math.pi * i / 5
    for k in (-0.22, 0, 0.22):
        aa = a + k
        b.append(f'    <path d="M{100+math.cos(aa)*16:.1f} {84+math.sin(aa)*16:.1f} '
                 f'L{100+math.cos(aa)*54:.1f} {84+math.sin(aa)*54:.1f}" stroke-width="1.7"/>')
b.append(disc(100, 84, 14, "#F0DFA8", dots=5))
svg("lin-bleu.svg", "\n".join(b), title="Lin bleu")

# ------------------------------------------------------------ 4. calendula
b = []
b.append(stem("M100 196 C 97 164 103 142 100 116"))
b.append(leaf(99, 170, 40, -18, 13))
b.append(leaf(101, 146, -38, -16, 12))
b.append(round_petal_ring(100, 86, 11, 46, 15, "#D9772E", phase=0.14))
b.append(round_petal_ring(100, 86, 9, 30, 13, "#E8A14C", phase=0.42))
b.append(disc(100, 86, 16, "#8A5A22", dots=7, dot_fill="#F0DFA8"))
svg("souci.svg", "\n".join(b), title="Souci des jardins")

# ------------------------------------------------------- pair / stamp motifs
M = {}

M["graine"] = ('    <path d="M100 48 C 152 48 170 104 148 138 C 128 170 72 170 52 138 C 30 104 48 48 100 48 Z" fill="#8A5A22"/>\n'
               '    <path d="M74 86 C 90 72 112 72 128 86" stroke-width="2.4"/>\n'
               '    <ellipse cx="100" cy="150" rx="26" ry="9" fill="#F0DFA8"/>\n'
               '    <path d="M100 48 C 104 30 120 22 134 26 C 124 38 118 44 110 50" fill="#5E7350"/>')

M["feuille"] = (leaf(58, 160, 84, -112, 34, "#5E7350", veins=5))

M["arrosoir"] = ('    <path d="M58 86 L142 86 L132 156 L68 156 Z" fill="#8E9AA6"/>\n'
                 '    <path d="M142 100 L178 66 L186 74 L152 112 Z" fill="#8E9AA6"/>\n'
                 '    <path d="M172 60 L192 80" stroke-width="5"/>\n'
                 '    <path d="M58 96 C 34 96 30 68 52 62" stroke-width="5"/>\n'
                 '    <rect x="52" y="74" width="96" height="14" fill="#8E9AA6"/>')

M["abeille"] = ('    <path d="M74 112 C 74 82 126 82 126 112 C 126 146 74 146 74 112 Z" fill="#F0DFA8"/>\n'
                '    <path d="M79 100 L121 100 M76 118 L124 118 M82 134 L118 134" stroke-width="7"/>\n'
                '    <circle cx="100" cy="76" r="18" fill="#2A2320"/>\n'
                '    <path d="M92 60 L84 42 M108 60 L116 42" stroke-width="2.6"/>\n'
                '    <circle cx="84" cy="40" r="4" fill="#2A2320" stroke="none"/>\n'
                '    <circle cx="116" cy="40" r="4" fill="#2A2320" stroke="none"/>\n'
                '    <path d="M78 98 C 44 70 34 104 72 112 Z" fill="#C8CFE3"/>\n'
                '    <path d="M122 98 C 156 70 166 104 128 112 Z" fill="#C8CFE3"/>')

M["soleil"] = (petal_ring(100, 100, 12, 46, 76, 6.5, "#E8A14C", phase=0.13) + "\n" +
               f'    <circle cx="100" cy="100" r="40" fill="#D9772E"/>\n' +
               '    <circle cx="100" cy="100" r="26" fill="#F0DFA8" stroke="none"/>')

M["pot"] = ('    <path d="M56 92 L144 92 L132 162 L68 162 Z" fill="#A8713A"/>\n'
            '    <rect x="48" y="74" width="104" height="20" fill="#8A5A22"/>\n'
            '    <path d="M100 74 C 100 52 86 44 74 48 C 88 54 92 62 92 74" fill="#5E7350"/>\n'
            '    <path d="M108 74 C 108 48 124 38 138 44 C 122 52 116 60 116 74" fill="#5E7350"/>')

for k, v in M.items():
    svg(f"motif-{k}.svg", v, title=k.capitalize())

# ---------------------------------------------------------------- app icon
def icon(path, vb=512):
    pad = 0
    body = []
    body.append(f'    <rect x="0" y="0" width="{vb}" height="{vb}" fill="#F0DFA8" stroke="none"/>')
    body.append(f'    <rect x="26" y="26" width="{vb-52}" height="{vb-52}" fill="none" stroke-width="10"/>')
    body.append(f'    <rect x="46" y="46" width="{vb-92}" height="{vb-92}" fill="none" stroke-width="3"/>')
    s = vb / 200 * 0.78
    off = (vb - 200 * s) / 2
    inner = []
    inner.append(stem("M100 190 C 98 160 102 140 100 118"))
    inner.append(leaf(99, 166, -40, -16, 12))
    inner.append(leaf(101, 146, 38, -14, 11))
    inner.append(petal_ring(100, 88, 18, 22, 60, 7.5, "#9B3357", phase=0.09))
    inner.append(petal_ring(100, 88, 13, 14, 38, 7.0, "#B4546F", phase=0.31))
    inner.append(disc(100, 88, 15, "#F0DFA8", dots=8))
    body.append(f'    <g transform="translate({off:.1f} {off*1.15:.1f}) scale({s:.4f})">\n' + "\n".join(inner) + "\n    </g>")
    doc = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb} {vb}">\n'
           f'  <g fill="none" stroke="{INK}" stroke-width="{SW}" stroke-linecap="round" stroke-linejoin="round">\n'
           + "\n".join(body) + f"\n  </g>\n</svg>\n")
    with open(path, "w") as f:
        f.write(doc)

icon(str(pathlib.Path(__file__).resolve().parent.parent / "assets" / "icons" / "icon.svg"))
print("SVG écrits :", sorted(os.listdir(OUT)))
