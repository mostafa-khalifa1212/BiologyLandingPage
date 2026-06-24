# ScalingFunnels.com — Visual Design System Spec
### A complete replication guide for the "papery editorial doodle" aesthetic

---

## 1. The Core Design Philosophy

This site uses what is best described as **"premium editorial hand-craft"** — it deliberately looks like it was designed on paper first and then digitized, not designed in a software tool. The visual language combines:

- **Warm off-white paper backgrounds** instead of pure white or dark themes
- **Hand-drawn doodle overlays** scattered across sections as decoration
- **Ink-like black typography** that feels printed, not rendered
- **Rough, organic border textures** instead of clean digital lines
- **Imperfect, slightly-tilted layout accents** that feel human
- **Sparse use of color** — the palette is almost entirely monochromatic with one or two warm accent tones

The end result feels like a high-end print magazine or a carefully designed notebook, not a SaaS dashboard or a tech startup website.

---

## 2. Color Palette

### Background Colors
```
Primary background:    #F5F0E8   (warm parchment — NOT pure white)
Secondary background:  #EDE8DC   (slightly darker parchment for section alternation)
Card/surface:          #FDFAF4   (very light cream for elevated cards)
Dark section bg:       #1A1A14   (near-black warm dark, used for contrast sections)
```

### Text Colors
```
Primary text:          #1A1A14   (warm near-black, never pure #000000)
Secondary text:        #4A4540   (warm medium gray)
Muted text:            #8A847C   (warm light gray)
Inverted text:         #F5F0E8   (parchment, used on dark backgrounds)
```

### Accent Colors
```
Primary accent:        #C8A96E   (warm gold/amber — used VERY sparingly)
Accent dark:           #8A6A30   (deeper gold for hover states)
Red accent:            #C84B3C   (muted brick red — for emphasis only)
```

### Border/Line Colors
```
Default border:        #D4CFC4   (warm light gray, used for dividers)
Strong border:         #A09A90   (medium warm gray, used for card outlines)
Ink lines:             #1A1A14   (same as primary text, for doodle elements)
```

**Key rule:** Never use pure `#FFFFFF` white, pure `#000000` black, or any cool-toned grays (no blue-grays). Every color in this system has a warm undertone. The whole palette should look like it was printed on aged paper.

---

## 3. Typography

### Font Stack
```
Heading font:   "Playfair Display", Georgia, serif
                — Use for all H1, H2, H3 headings
                — Feels editorial, print-like, high-end

Body font:      "DM Sans", "Inter", -apple-system, sans-serif
                — Use for body copy, nav links, captions, labels
                — Clean but warm, not sterile

Accent font:    "Caveat", "Patrick Hand", cursive
                — Use ONLY for handwritten-style callouts,
                  pull quotes, doodle labels, and decorative text
                — This is what creates the "hand-craft" feel
                — Sparingly — max 3-4 instances per page
```

### Type Scale
```
Display / Hero H1:    72–96px,  font-weight: 700, Playfair Display
                      line-height: 1.05, letter-spacing: -0.02em

Section H2:           48–56px,  font-weight: 700, Playfair Display
                      line-height: 1.1,  letter-spacing: -0.01em

Sub-heading H3:       28–36px,  font-weight: 600, Playfair Display
                      line-height: 1.2

Large body:           18–20px,  font-weight: 400, DM Sans
                      line-height: 1.7,  letter-spacing: 0

Body:                 16px,     font-weight: 400, DM Sans
                      line-height: 1.7

Small / caption:      13–14px,  font-weight: 400, DM Sans
                      color: #8A847C

Label / tag:          11–12px,  font-weight: 500, DM Sans
                      text-transform: uppercase, letter-spacing: 0.1em

Handwritten accent:   24–40px,  font-weight: 400, Caveat
                      line-height: 1.3,  color: #1A1A14 or #C8A96E
```

### Typography Rules
- Headings should be set in **italic Playfair Display** for key phrases — mixing roman and italic within a headline is encouraged (e.g., "We make your funnels *convert*")
- Body text maximum width: **640px** — never let it run full-width on desktop
- Section labels (small uppercase text above a heading): DM Sans, 11px, 500 weight, letter-spacing 0.15em, color `#8A847C`
- Never use font-weight 800 or 900 — the heaviest used is 700

---

## 4. Texture & Background Treatment

This is the most important and most distinctive part of the design.

### Paper Texture
Every background section uses a **subtle paper grain texture** layered over the flat parchment color. This is achieved with:

```css
.section {
  background-color: #F5F0E8;
  background-image: url('paper-texture.png');  /* grain/noise texture overlay */
  background-blend-mode: multiply;
  background-size: 400px 400px;
}
```

**What the texture looks like:** A very subtle, fine-grain noise — like photocopied paper or a lightly textured watercolor paper. Opacity should be around 0.04–0.08 — barely visible but you feel it.

**How to generate it without an image:** Use an SVG filter:
```css
.texture-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
  opacity: 0.5;
  pointer-events: none;
}
```

### Section Borders (Rough Edge Treatment)
The borders between sections are **NOT clean straight lines**. They use custom SVG wavy/rough edge images as top/bottom dividers between sections. The effect looks like the edge of a torn piece of paper or a hand-drawn line.

Implementation:
```css
.section-divider {
  width: 100%;
  height: 40px;                          /* height of the rough edge */
  background-image: url('rough-edge.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
```

The rough edge SVG is a horizontal path with slight irregular bumps — NOT perfectly wavy, but organically uneven, like a hand-drawn line. Color matches the adjacent section background.

Alternatively, a CSS approach using `clip-path` with a very slightly irregular polygon:
```css
.section {
  clip-path: polygon(0 0, 100% 0, 100% 96%, 98% 100%, 50% 97%, 2% 100%, 0 96%);
}
```

---

## 5. Doodle & Illustration System

This is what makes the aesthetic immediately recognizable. There are three types of decorative elements:

### Type A — Line Doodles (Background Decoration)
**What they are:** Thin, hand-drawn-style SVG illustrations placed in the background or corners of sections. Think: small arrows with squiggly tails, asterisks, stars, looping underlines, small spirals, leaf shapes, circles with sketchy strokes.

**Visual properties:**
```
Stroke:          1–1.5px
Color:           #1A1A14 at 15–25% opacity (very subtle) OR
                 #C8A96E at 30–40% opacity (gold accent version)
Fill:            none (always outline only)
Style:           slightly imperfect — not machine-perfect circles or arrows
Rotation:        tilted 5–15 degrees from horizontal
Scale:           small — mostly 40–80px wide
Placement:       corners, margins, near headings, floating near stats
```

**How to achieve the "hand-drawn" imperfection:** Use SVG paths with slight wobble — instead of `M 0,0 L 100,0` for a straight line, use `M 0,2 C 20,-1 50,3 100,1` for a subtly wavy line.

Example doodle elements to include:
- Squiggly underline beneath a key phrase
- Small 6-pointed asterisk/star near a stat number
- Looping arrow pointing toward a CTA
- Small spiral or swirl in section corners
- Dotted circle around an image or icon
- Hand-drawn bracket around a pull quote
- Small leaf or plant sprig in lower corner of a card
- Scattered dots in groups of 3–5

### Type B — Decorative Borders (Card Accents)
Cards and highlighted boxes use hand-drawn style borders instead of clean CSS borders.

```css
/* Achieved with a CSS box-shadow trick + border-image */
.doodle-card {
  border: 2px solid #1A1A14;
  border-radius: 2px;                 /* minimal radius — keeps it sharp and sketchy */
  box-shadow: 3px 3px 0 #1A1A14;     /* hard offset shadow = hand-stamp look */
}
```

The `3px 3px 0` hard box shadow with no blur is the signature of this aesthetic — it makes cards look like they were stamped with a rubber stamp or drawn with a marker and pressed.

### Type C — Highlighted/Circled Text Accents
Key words in headlines get a hand-drawn underline or circle drawn around them using SVG overlaid on the text.

**Squiggly underline example (SVG):**
```html
<span class="highlight-wrap">
  convert
  <svg class="doodle-underline" viewBox="0 0 120 8" preserveAspectRatio="none">
    <path d="M2,6 C20,2 40,8 60,4 C80,1 100,7 118,4"
          stroke="#C8A96E" stroke-width="2.5" fill="none"
          stroke-linecap="round"/>
  </svg>
</span>
```

**Circle around a word (SVG):**
```html
<span class="circle-wrap">
  results
  <svg class="doodle-circle" viewBox="0 0 100 40" preserveAspectRatio="none">
    <ellipse cx="50" cy="20" rx="46" ry="16"
             stroke="#C8A96E" stroke-width="2" fill="none"
             stroke-dasharray="4,2"/>
  </svg>
</span>
```

---

## 6. Layout & Grid

### Page Width
```
Max content width:    1200px
Section padding:      80–120px vertical, 24px horizontal minimum
Column gutter:        32px
```

### Grid System
The layout is mostly **asymmetric and editorial**, not a rigid equal-column grid.

Common layout patterns used:
- **60/40 split:** Large text block left (60%), image or stat right (40%)
- **Full-width hero:** Text centered, large, with doodles around it
- **3-column stat row:** Three metrics side by side, each with large number + caption
- **Alternating case study rows:** Image left/text right, then image right/text left
- **Single centered column:** For long-form copy sections, max-width 640px centered

### Spacing System (8px base unit)
```
4px   — micro gap (icon to label)
8px   — tight gap (label to value)
16px  — component internal padding
24px  — between related elements
32px  — between cards in a row
48px  — between sub-sections
64px  — between major sections
96px  — section top/bottom padding (desktop)
48px  — section top/bottom padding (mobile)
```

---

## 7. Component Styles

### Navigation Bar
```
Background:     #F5F0E8 (matches page, no visible separation)
or              transparent with slight blur backdrop on scroll
Border-bottom:  1px solid #D4CFC4 (appears on scroll only)
Logo:           Playfair Display italic, ~22px, #1A1A14
Nav links:      DM Sans, 14px, #4A4540, no underline
                Hover: #1A1A14, with hand-drawn underline animation
CTA button:     See Button styles below
Layout:         Logo left, links center, CTA right
```

### Buttons
Two button variants used:

**Primary (dark stamp style):**
```css
.btn-primary {
  background: #1A1A14;
  color: #F5F0E8;
  padding: 14px 28px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 500;
  border: 2px solid #1A1A14;
  border-radius: 2px;                 /* near-square corners, not rounded */
  box-shadow: 4px 4px 0 #C8A96E;     /* gold hard shadow */
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #C8A96E;
}
```

**Secondary (outline stamp style):**
```css
.btn-secondary {
  background: transparent;
  color: #1A1A14;
  padding: 13px 27px;
  border: 2px solid #1A1A14;
  border-radius: 2px;
  box-shadow: 3px 3px 0 #1A1A14;
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn-secondary:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 #1A1A14;
}
```

The hover effect on both buttons — moving up-left while the shadow grows — mimics lifting a rubber stamp off a surface.

### Cards
```css
.card {
  background: #FDFAF4;
  border: 1.5px solid #1A1A14;
  border-radius: 4px;
  box-shadow: 5px 5px 0 #1A1A14;     /* hard shadow, no blur */
  padding: 28px 32px;
}
```

For lighter cards (inside sections that are already parchment colored):
```css
.card-light {
  background: #F5F0E8;
  border: 1px solid #D4CFC4;
  border-radius: 4px;
  padding: 24px 28px;
  /* no hard shadow — used when nesting needs to feel recessed */
}
```

### Stat / Metric Display
```css
.stat-number {
  font-family: 'Playfair Display', serif;
  font-size: 52–72px;
  font-weight: 700;
  color: #1A1A14;
  line-height: 1;
}
.stat-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: #8A847C;
  margin-top: 8px;
  line-height: 1.4;
}
```
Stats often have a small doodle element (star, underline) next to the number.

### Horizontal Rule / Divider
Never use a plain `<hr>`. Use either:
1. An SVG wavy line (preferred)
2. A dashed line: `border-top: 1.5px dashed #D4CFC4`
3. A row of dots: `· · · · · · · · ·` in the accent font

### Scrolling Logo Strip
```css
.logo-strip {
  background: #EDE8DC;               /* slightly darker parchment */
  border-top: 1px solid #D4CFC4;
  border-bottom: 1px solid #D4CFC4;
  padding: 20px 0;
  overflow: hidden;
}
/* Logos: grayscale(100%) opacity 0.5 — never show in color */
.logo-strip img {
  filter: grayscale(100%);
  opacity: 0.5;
  height: 32–40px;
}
```

### Case Study Cards
Large cards with:
- Section number in large Playfair Display, very light gray, positioned top-right as a background watermark
- Client logo top-left
- Result stat in large type
- Before/after narrative in body copy
- Hard shadow card style (5px 5px 0)
- Optional: real screenshot of the client's website inset into the card

### Comparison Table (Us vs Them)
```css
.comparison-table {
  border-collapse: collapse;
  width: 100%;
}
.comparison-table th {
  font-family: 'DM Sans';
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #8A847C;
  padding: 12px 16px;
  border-bottom: 1.5px solid #1A1A14;
}
.comparison-table td {
  padding: 14px 16px;
  border-bottom: 1px dashed #D4CFC4;
  font-size: 14px;
  vertical-align: top;
}
/* Their column: muted */
.col-them { color: #8A847C; }
/* Our column: dark, strong */
.col-us   { color: #1A1A14; font-weight: 500; }
```

---

## 8. Image Treatment

All images (founder photos, case study screenshots) get the same treatment:

```css
.editorial-image {
  border: 2px solid #1A1A14;
  border-radius: 4px;
  box-shadow: 6px 6px 0 #1A1A14;    /* hard shadow, no blur */
  /* slight desaturation to blend with warm palette: */
  filter: sepia(8%) contrast(102%);
}
```

Photos of the founder are often slightly tilted (2–4 degrees rotation) to feel candid:
```css
.founder-photo {
  transform: rotate(-2deg);
}
/* Adjacent photo: rotate opposite way */
.founder-photo-2 {
  transform: rotate(2.5deg);
}
```

---

## 9. Animation & Motion

Keep all motion minimal and purposeful. No flashy transitions.

```css
/* Default transition for interactive elements */
* {
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.2s ease;
}

/* Logo strip auto-scroll */
@keyframes scroll-logos {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.logo-track {
  animation: scroll-logos 30s linear infinite;
}

/* Doodle underline draw-in (on heading entry) */
@keyframes draw-line {
  from { stroke-dashoffset: 200; }
  to   { stroke-dashoffset: 0; }
}
.doodle-underline path {
  stroke-dasharray: 200;
  animation: draw-line 0.6s ease forwards;
}
```

No parallax. No large hero animations. No hover color flashes. The only scroll-triggered effect used is a simple `opacity: 0 → 1` fade-in with a 20px upward translate — subtle entry, not dramatic.

---

## 10. Dark Section Treatment

Approximately 2–3 sections use a dark background for contrast (testimonials, final CTA). The dark version of the aesthetic:

```css
.section-dark {
  background-color: #1A1A14;
  background-image: /* same paper texture overlay, but lighter */;
  color: #F5F0E8;
}
/* All text inverted */
.section-dark h2 { color: #F5F0E8; }
.section-dark p  { color: #C8C4BC; }
/* Doodle elements: gold or light parchment color */
.section-dark .doodle { stroke: #C8A96E; opacity: 0.4; }
/* Cards inside dark sections */
.section-dark .card {
  background: #2A2A20;
  border-color: #4A4A40;
  box-shadow: 5px 5px 0 #C8A96E;    /* gold shadow on dark background */
}
```

---

## 11. Section-by-Section Implementation Notes

### Hero Section
- Full viewport height or close to it
- Background: parchment `#F5F0E8` + paper texture
- Doodle elements: 3–5 small SVG doodles scattered (star near a stat, wavy underline on key phrase, arrow pointing at CTA)
- Qualifier badge above H1: small uppercase label, DM Sans, letter-spacing 0.15em, in a small outlined pill
- H1: very large Playfair Display, mix of roman and italic weight
- Below H1: 3 stat blocks in a row, each with Playfair Display number + DM Sans caption

### Social Proof / Logo Strip
- Slightly darker parchment strip, full-width
- Auto-scrolling logos, grayscale + dimmed
- Section label above: "Trusted by" in uppercase DM Sans

### Case Study Cards
- Full-width dark photo background behind the card stack (creates the magazine editorial feel)
- Card: white/cream with hard shadow
- Large section number (`01`, `02`) as background watermark text in very light color

### Process Section (numbered steps)
- Clean parchment background
- Steps shown as numbered cards in a column or row
- Each number in large Playfair Display
- Connecting line between steps: dashed, vertical, ink-colored

### Comparison Table
- Parchment background
- Two-column table, rough header styling
- Our column values could have a small checkmark doodle

### Founder Section
- Two overlapping photos, both tilted, with hard shadows
- Long text block beside them
- Handwritten-style pull quote using Caveat font

### Closing CTA (Long Copy)
- Dark background section
- Long prose in readable DM Sans, max-width 640px centered
- Gold accent color for any emphasized phrases
- Numbered steps using simple large numerals
- Final CTA button: large, centered, gold hard shadow

---

## 12. Summary — The 8 Rules That Define This Aesthetic

1. **Parchment not white.** Every background is warm cream `#F5F0E8` — never pure white.
2. **Paper texture always on.** A subtle SVG noise filter or PNG texture overlays every section background.
3. **Hard shadows, no blur.** Cards, buttons, and images use `box-shadow: Xpx Ypx 0 [color]` — zero blur radius. This is the single most distinctive rule.
4. **Near-square corners.** `border-radius: 2–4px` maximum. No pill buttons, no heavily rounded cards.
5. **Serif headings, sans body.** Playfair Display for anything headline. DM Sans for everything else.
6. **Caveat font for doodle text.** Handwritten callouts, pull quotes, and accent labels only.
7. **Doodle SVGs scattered sparingly.** 3–6 per section max. Thin stroke, low opacity, slightly rotated.
8. **Monochromatic with one gold accent.** Almost everything is ink-black on parchment. Gold `#C8A96E` is the only color and it's used in fewer than 20% of elements.
