---
name: Mon Jardin — Le Sachet de Graines
description: A French lithographed seed packet, held in one hand, that never looks like a test.
colors:
  ink: "#2A2320"
  ink-soft: "#574A3E"
  madder: "#B2402E"
  madder-pressed: "#9A3728"
  on-madder: "#FBF4E4"
  amande: "#CFDEC6"
  amande-deep: "#BCD0B0"
  dragee: "#EFC9C2"
  dragee-deep: "#E3B0A7"
  lavande: "#C8CFE3"
  lavande-deep: "#B1BBD6"
  chamois: "#F0DFA8"
  chamois-deep: "#E4CF90"
  litho-feuillage: "#5E7350"
  litho-grenat: "#9B3357"
  litho-grenat-clair: "#B4546F"
  litho-lin: "#6B7FB5"
  litho-souci: "#D9772E"
  litho-souci-clair: "#E8A14C"
  litho-terre: "#8A5A22"
  litho-terre-claire: "#A8713A"
  litho-terre-sombre: "#6B451A"
  litho-etain: "#8E9AA6"
  litho-rose-pois: "#D9697A"
typography:
  display:
    fontFamily: "Alfa Slab One, Rockwell, Roboto Slab, Georgia, serif"
    fontSize: "clamp(1.5rem, 6.6vw, 2.05rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.005em"
  monument:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "2.6rem"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "2.1rem"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  small:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "normal"
  apparat:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "0.08em"
rounded:
  none: "0px"
spacing:
  tight: "0.6rem"
  base: "1.25rem"
  wide: "2rem"
  rule: "2px"
  target: "84px"
  target-floor: "72px"
components:
  button-action:
    backgroundColor: "{colors.madder}"
    textColor: "{colors.on-madder}"
    typography: "{typography.lead}"
    rounded: "{rounded.none}"
    padding: "1rem 1.25rem"
    height: "88px"
    width: "100%"
  button-action-active:
    backgroundColor: "{colors.madder-pressed}"
    textColor: "{colors.on-madder}"
  button-choice:
    backgroundColor: "{colors.chamois}"
    textColor: "{colors.ink}"
    typography: "{typography.lead}"
    rounded: "{rounded.none}"
    padding: "1rem 1.25rem"
    height: "84px"
    width: "100%"
  button-choice-held:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.chamois}"
  button-choice-resolved:
    backgroundColor: "{colors.chamois}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "0.6rem 1rem"
    height: "56px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    height: "72px"
    width: "100%"
  band:
    backgroundColor: "{colors.chamois-deep}"
    textColor: "{colors.ink}"
    typography: "{typography.apparat}"
    padding: "0.75rem 1.25rem"
  exit:
    backgroundColor: "{colors.chamois-deep}"
    textColor: "{colors.ink}"
    padding: "0.5rem 1.25rem"
    height: "72px"
  packet:
    backgroundColor: "{colors.chamois}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "2rem 1.15rem 1.25rem"
  litho-band:
    backgroundColor: "{colors.chamois-deep}"
    rounded: "{rounded.none}"
    padding: "1rem"
  pair-tile:
    backgroundColor: "{colors.chamois-deep}"
    rounded: "{rounded.none}"
    padding: "0.5rem"
    height: "92px"
  pair-tile-open:
    backgroundColor: "{colors.chamois}"
  plot:
    backgroundColor: "{colors.chamois-deep}"
    rounded: "{rounded.none}"
    padding: "4px 4px 0"
  stamp:
    backgroundColor: "{colors.chamois-deep}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.none}"
    padding: "0.9rem 1rem"
  input-text:
    backgroundColor: "{colors.chamois}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.75rem"
    height: "72px"
    width: "100%"
---

# Design System: Mon Jardin — Le Sachet de Graines

## Overview

**Creative North Star: "Le Sachet de Graines"**

Every screen is one lithographed French seed packet — the Vilmorin-Andrieux kind, printed in a handful of flat inks on coloured stock, with a double rule around the edge and one engraved flower across the top. The packet is not a card in a grid of cards; it is the whole surface, held in one hand on an iPhone home-screen PWA. The category's default arrangement — rounded tiles, progress bars, badges, score chips — is refused, and so is its predictable opposite, the clinical white panel. A pastel field owns the entire viewport and is repainted per exercise variety, so the colour of the screen tells you which packet you opened before you read a word.

The system is printed, not rendered. There is no radius, no shadow, no bevel, no simulated paper grain: the packet's edge is a 2px border plus a 2px outline at a 5px offset, because that is how a double rule works on press. Density is deliberately low — one decision per screen, one monumental line of type, two or three very large choices, and a soft exit pinned to the last row that never moves between screens. Illustration carries the only colour richness in the system, and it carries it in a second, separate ink set that contains no madder.

The signature is state as a printed mark. Selection is four corner équerres; rejection is a struck rule; holding is an ink reversal. Nothing in this system signals state with hue alone, so every screen survives being desaturated to black and white — the acceptance test, not an aspiration.

**Key Characteristics:**
- Two closed palettes: a four-value interface, and a separate illustration ink set with no action colour in it
- One pastel field owning the whole viewport, swapped per exercise variety
- Madder reserved for the single primary action on a screen, nowhere else
- Slab display face for the variety name only; platform humanist sans for everything a reader reads
- Zero radius, zero shadow, 2px printed rules, flat SVG lithographs with computed geometry
- States are distinct shapes — équerres, biffure, ink reversal — legible with colour removed
- One authored motion moment: the 440ms Y-axis packet flip

## Colors

Two closed sets that never mix: a four-value interface built from ink, one pastel field and a single reserved action red; and a separate lithograph ink set for the drawings.

### Primary
- **Madder** (`#B2402E`): the single saturated interface colour, carried only by the one primary action on a screen — "commencer", "voir mon jardin". It appears nowhere else in the interface and nowhere at all in an illustration. Pressed state deepens to `#9A3728`. Its label is a near-white chalk (`#FBF4E4`) at 5.23:1, the lowest ratio anywhere in the build.

### Secondary
- **The pastel field, four varieties** — **Amande** (`#CFDEC6`, reine-marguerite), **Dragée** (`#EFC9C2`, pois-de-senteur), **Lavande** (`#C8CFE3`, lin-bleu), **Chamois** (`#F0DFA8`, souci): one flat tint owns the whole screen, set by `[data-variete]` on the app root and crossfaded over 440ms when the variety changes. Chamois is the default and the installed app's theme colour.
- **The deepened tint** (`#BCD0B0` / `#E3B0A7` / `#B1BBD6` / `#E4CF90`): the same stock, one step down, used for the furniture that frames the packet — top band, exit row, lithograph band, pair tiles, garden plots, stamp. Never used for reading text's background where small type sits.

### Tertiary
- **The lithograph inks** — feuillage `#5E7350`, grenat `#9B3357` and `#B4546F`, lin `#6B7FB5`, souci `#D9772E` and `#E8A14C`, terres `#8A5A22` / `#A8713A` / `#6B451A`, étain `#8E9AA6`, rose de pois `#D9697A`. These exist only inside the 18 authored SVGs, as flat fills bounded by ink outlines, plus interface values re-used as hearts and highlights. An illustration cannot live in four values; what it cannot do is carry the action colour.

### Neutral
- **Ink** (`#2A2320`): a warm near-black, the only text colour for anything monumental or readable, and the only rule and outline colour. Sits at 9.9:1 to 11.6:1 on the four fields.
- **Soft ink** (`#574A3E`): a brown-tinted de-emphasis, never a grey — used for the struck-choice mark, placeholder text, and secondary apparatus on the pastel field (5.5:1 to 6.5:1 there). Darkens to `#3B322A` under `prefers-contrast: more`.
- **Chalk** (`#FBF4E4`): exists only as the label on madder.

### Named Rules
**The Two Closed Palettes Rule.** The interface set and the lithograph set are separate and both closed. No decorative intermediate value is added to the interface; no interface action colour is added to a drawing.

**The Madder Reserve Rule.** Madder marks exactly one target per screen. If a second element wants it, one of them is not the primary action. Madder in an illustration would stop madder meaning "touch this".

**The One Field Rule.** One pastel owns the viewport. Varieties swap the field; they never divide the screen into two tints.

## Typography

**Display Font:** Alfa Slab One (self-hosted latin subset, 11KB woff2; fallback Rockwell, Roboto Slab, Georgia)
**Body Font:** the platform humanist sans — SF Pro on iOS, via `-apple-system`

**Character:** a rustic wide-slab seed-merchant face naming the variety, over the device's own reading face for everything else. The slab is the packet's printed name; the sans is the voice that speaks to her.

### Hierarchy
- **Display** (400, `clamp(1.5rem, 6.6vw, 2.05rem)`, 1.05, uppercase, centred): the variety name on the packet, between the lithograph band and the body. The only place the display face is permitted.
- **Monument** (700, 2.6rem / 41.6px, 1.12, -0.02em): the one question or instruction per screen. Steps up to 2.9rem above 760px of height, and down the ramp — 2.1rem, then 1.75rem — as the copy gets longer, rather than wrapping into a paragraph.
- **Title** (700, 2.1rem / 33.6px): screen headings and the long-copy monument step.
- **Lead** (600, 1.75rem / 28px, 1.3): choice buttons, the greeting line, the primary action label.
- **Body** (400, 1.45rem / 23.2px, 1.45, max 34ch): all reading prose. Floors at 1.375rem / 22px on short screens.
- **Small** (600, 1.3rem / 20.8px): labels, stamp copy, person names.
- **Apparat** (600, 1.15rem / 18.4px, 0.08em, uppercase): the date in the top band and nothing else — the packet's printed apparatus, identical on every screen.

### Named Rules
**The Variety-Name-Only Rule.** The display face sets the variety name. It never sets an instruction, a question, a button, or a heading. One display face, one job.

**The 22px Floor Rule.** The ramp is fixed rem, not fluid, and steps down on short viewports — but reading text never goes below 22px. The floor is a floor, not a setting.

**The One Monument Rule.** Exactly one element per screen sits at monument scale. When the copy is too long for 41.6px, the monument steps down the ramp; it does not become a block of body text.

## Layout

The shell is a fixed-height grid, three rows: band / stage / exit, on `100dvh` with safe-area insets as padding. The band and exit are `auto`; the stage is `1fr` and carries `min-height: 0` so that it scrolls internally instead of growing the shell — without it the exit row slides under the fold, which is load-bearing, not incidental. The exit row is pinned at the last line, at least 72px tall, and is identical on every screen.

Inside the stage sits one packet: a column with a flat lithograph band at the top, the variety name under it, and the body below. The packet takes the remaining height by default (`flex: 1 1 auto`); screens whose content is finite — the garden, the settings sheet — use the `--auto` variant and stop where they stop. Packet margin is 9px so the 5px-offset outline clears the stage edge.

Rhythm is a three-step scale: 0.6rem tight, 1.25rem base, 2rem wide, with 1.25rem horizontal gutters throughout. Touch targets are 84px by default against a 72px floor; the three-choice layout drops to 76px and post-reveal marks to 56px. Grids are small and explicit: pairs are 2 columns × 3 rows at a 92px minimum with 14px gaps; the garden is `auto-fill` from 96px with 12px gaps, each plot locked to a 2:3 aspect ratio matching the drawing.

Responsive behaviour is density, not redesign. Under 680px of height the whole type ramp and spacing scale step down one notch and the target floor becomes 72px. Above 760px the monument and the lithograph grow. Under 620px in landscape the lithograph is dropped entirely and the text is untouched — the illustration yields, the reading never does.

## Elevation & Depth

**There are no shadows in this system, at all.** No `box-shadow`, no `text-shadow`, no filter, no bevel, no emboss, no simulated paper grain. Depth is printing: a 2px ink border with a second 2px outline at a 5px offset gives the packet its double rule, a stepped tint (the deepened field) separates furniture from the sheet it sits on, and the ink reversal of a held control reads as a solid-inked block. The one gradient in the build is functional, not atmospheric: the scroll cue's fade.

### Named Rules
**The Printed Double Rule.** The packet edge is `border` plus `outline` with `outline-offset`. It is deliberately not a shadow — a lithographed packet has two printed rules, not a drop shadow, and the only honest way to draw two rules is to draw two rules.

**The Tint-Step Rule.** Layering is a one-step tint change on the same stock, never a lift. If two surfaces need separating, use the deepened field and a 2px rule.

## Shapes

Zero radius, everywhere, without exception — buttons, inputs, tiles, plots, the packet, the file-picker button. Form comes from rectangles and printed rules: 2px by default, 3px under `prefers-contrast: more`, a 3px double rule for the stamp. The 1px hairline of the original contract was abandoned on purpose: a hairline disappears for an 85-year-old eye, and legibility outranks finesse. Illustrations are authored SVG with computed geometry (reproducible via `tools/gen_litho.py` and `tools/gen_stages.py`): flat fills, ink outlines, no faked physicality. Focus is a 3px ink outline at a 4px offset, suppressed only on non-interactive elements that take `tabindex="-1"` for screen-reader announcement.

## Components

### Buttons
- **Shape:** hard rectangles (0 radius), full width, 2px ink border, pressed state nudges down 2px.
- **Primary (action):** madder ground, chalk label, 88px tall, lead type at 700. One per screen.
- **Choice:** field ground, ink label, 84px tall (76px when three are shown, 72px on short screens).
- **Quiet (the exit):** no border, no ground, 2px underline at a 6px offset, body type, 72px tall. Occupies the exit row on every screen with a consistent, non-alarming label.
- **States:** `is-held` / `aria-pressed="true"` reverses to ink ground with field text; `is-bracketed` prints four 4px corner équerres 9px outside the frame; `is-struck` greys the label to soft ink and lays a 3px biffure across it. After the reveal, choices become 56px `disabled` marks — printed records, not controls.
- **Transitions:** 200ms on background, colour and transform with `cubic-bezier(0.16, 1, 0.3, 1)`.

### Cards / Containers
- **The packet** is the only container: 0 radius, field ground, 2px border plus 2px outline at 5px offset, 9px outer margin, 2rem/1.15rem/1.25rem internal padding, with a deepened-tint lithograph band and a display-face name plate divided by 2px rules.
- **Pair tiles, garden plots, person rows, notices:** deepened tint, 2px ink border, 0 radius, no shadow.
- **The stamp** (the variable-ratio reward): a 3px double ink rule around a deepened-tint block with a 56px authored motif and one line of small type. A printed cachet on the packet, not a badge.

### Inputs / Fields
- **Style:** field ground, 2px ink border, 0 radius, body type, 0.75rem padding, 72px minimum height (textareas 100px, resizable vertically). The native file picker is given a 72px target and its `::file-selector-button` is restyled to the deepened tint with a 2px rule.
- **Focus:** 3px ink outline at a 2px offset. Placeholders are soft ink at full opacity.

### Navigation
There is no navigation chrome. The top band is apparatus only — the date in uppercase apparat type plus a 20px authored sprout mark — and the exit row is the single, fixed way back, in the same place with the same treatment on every screen.

### The Packet Flip (signature)
One authored motion moment in the whole product: a 440ms Y-axis rotation (`--dur-flip`) that turns the packet over to reveal the cultivation notes on the back, once per session. Everything else transitions in 200ms. Under `prefers-reduced-motion` all durations collapse to 1ms and the flip is substituted by a 200ms opacity crossfade — the reveal still happens, it just stops rotating.

### The Scroll Cue (signature)
A conditional 56px affordance above the exit row — a fade to the field plus an authored ink chevron in a 2px-ruled square — inserted by script only when the stage genuinely overflows. It is the system's single gradient, and it is functional: without it she cannot know the action is below the fold.

## Do's and Don'ts

### Do:
- **Do** let one pastel field own the whole viewport, and swap it per variety via `[data-variete]` on the app root.
- **Do** reserve madder (`#B2402E`) for exactly one action per screen.
- **Do** draw illustrations from the lithograph ink set only, flat-filled and ink-outlined, as authored SVG with computed geometry.
- **Do** signal every state with a distinct printed shape — équerres, biffure, ink reversal — and test each new screen by desaturating it to black and white.
- **Do** keep reading text at 22px or above and touch targets at 72px or above, and let the illustration be what yields when space runs out.
- **Do** draw edges with `border` and `outline` + `outline-offset` at 2px (3px under `prefers-contrast: more`).
- **Do** keep the exit in the last row, in the same place, with the same label treatment, on every screen.
- **Do** use `min-height: 0` on any scrolling grid child, so the shell scrolls internally and the exit stays pinned.

### Don't:
- **Don't** put madder in an illustration, or any lithograph ink on an interface control.
- **Don't** set anything but the variety name in the display face, and don't add a second display face.
- **Don't** add a border radius anywhere.
- **Don't** add a `box-shadow`, `text-shadow`, bevel, emboss, or simulated paper grain or fibre. Depth is a rule and a tint step.
- **Don't** add a gradient for atmosphere; the scroll cue's fade is the only one, and it earns its place by telling her content continues below.
- **Don't** use hue alone to carry a state, and don't introduce a failure red — "not this one" is a struck rule, not a colour.
- **Don't** use a 1px hairline for a rule; it disappears for the user this product is for.
- **Don't** make the type scale fluid, and don't let a short-viewport step cross the 22px reading floor.
- **Don't** animate anything but the packet flip beyond a 200ms state transition; no bounce, no entrance that hides content.
- **Don't** add progress bars, score chips, streak counters, badges, or rounded-tile grids — the refused arrangement of the category.
- **Don't** imitate native iOS components; this is a web PWA with its own printed language.
