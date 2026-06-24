# Asset Placement & Usage Guide
### Full mapping of every texture, doodle, and cut-paper asset

---

## SECTION 1 — Asset Classification

Before placement, every asset falls into one of five roles:

| Role | What it means |
|------|--------------|
| **Background texture** | Fills an entire section behind all content, tiled or stretched |
| **Section divider** | Sits at the top or bottom edge of a section to create a torn-paper transition |
| **Doodle overlay** | Floats on top of content as a decorative SVG/illustration accent |
| **UI element** | Used directly inside a component (button, card, nav) |
| **Functional icon** | Has a semantic meaning — directs attention, labels something |

---

## SECTION 2 — Asset-by-Asset Placement Map

---

### `paperTexture` (AVIF)
**Role:** Primary section background texture
**What it looks like:** A plain, neutral paper grain — the most "vanilla" of the three paper textures. Likely the lightest and most subtle.
**Where to use:**
- The **hero section** background (full viewport, behind all hero content)
- **Any "white" card** interior — set as background-image on `.card` elements
- The **nav bar** background on scroll
**CSS:**
```css
.hero, .card {
  background-image: url('paperTexture.avif');
  background-size: 600px 600px;       /* tile it */
  background-repeat: repeat;
  background-blend-mode: multiply;
  background-color: #F5F0E8;
}
```
**Opacity rule:** Keep this one at the most neutral — it's your default paper surface.

---

### `paperTexture2` (AVIF)
**Role:** Secondary/alternate section background texture
**What it looks like:** Slightly more pronounced grain or a warmer tone than the first — likely has more visible fiber or tooth to it.
**Where to use:**
- **Alternating sections** — if hero uses `paperTexture`, the next light section (social proof, process) uses `paperTexture2`
- **The sidebar or aside panels** if you have any
- **Form/input backgrounds** to keep them from feeling too digital
**CSS:**
```css
.section-alt {
  background-image: url('paperTexture2.avif');
  background-size: 500px 500px;
  background-repeat: repeat;
  background-color: #EDE8DC;           /* slightly darker parchment */
  background-blend-mode: multiply;
}
```

---

### `paperTexture3` (AVIF)
**Role:** Accent/overlay texture — the most textured/dramatic of the three
**What it looks like:** Likely the most visible grain, possibly with more color variation or a rougher surface feel. Could have a slightly aged or worn quality.
**Where to use:**
- **Dark sections** — layered over `#1A1A14` background using `screen` blend mode to give the dark section a paper-like quality instead of flat black
- **Pull quote blocks** and **testimonial cards** for a premium feel
- **The syllabus/notes stacking section** cards (each stacked paper card gets this texture)
**CSS for dark sections:**
```css
.section-dark {
  background-image: url('paperTexture3.avif');
  background-size: 600px 600px;
  background-repeat: repeat;
  background-color: #1A1A14;
  background-blend-mode: screen;       /* screen on dark = paper shows through */
  opacity-texture: 0.15;
}
```

---

### `blackPaperTexture` (AVIF) — you have two of these
**Role:** Dark background texture for inverted sections
**What it looks like:** A paper texture that is inherently dark/black — like black construction paper or charcoal paper. Much darker than the other three.
**Where to use:**
- One instance: **Full dark hero variant** or **dark CTA section at the bottom** of the page — use as the background fill
- Second instance: **Individual dark cards** — testimonial cards, "our approach" dark callout boxes
- The two copies let you alternate between sections so the dark areas don't look identical
**CSS:**
```css
.section-dark-primary {
  background-image: url('blackPaperTexture.avif');
  background-size: 800px 800px;
  background-repeat: repeat;
  background-color: #1A1A14;
  background-blend-mode: overlay;
}
```

---

### `crumbledBlackPaperTexture` (AVIF)
**Role:** Dramatic accent texture — NOT a background tile
**What it looks like:** Crumpled/wrinkled black paper — has strong directional wrinkle lines and deep shadow. Very dramatic and organic.
**Where to use:**
- **Behind stat numbers** in the hero — position as an absolutely placed element behind the metric block, clipped to a rough shape
- **The dark section divider area** — placed at the transition between a light and dark section, partially showing
- **Behind a pull quote or founder photo** as a dramatic shadow/backdrop layer
- Do NOT tile this one — use it as a single large positioned image, `object-fit: cover`, within a clipped container
**CSS:**
```css
.stat-backdrop {
  position: absolute;
  width: 280px;
  height: 180px;
  background-image: url('crumbledBlackPaperTexture.avif');
  background-size: cover;
  border-radius: 4px;
  opacity: 0.12;                       /* very subtle — just adds depth */
  transform: rotate(-3deg);
  z-index: 0;
}
```

---

### `dottyBackground` (AVIF)
**Role:** Dot-grid background pattern — section texture alternative
**What it looks like:** A regular or semi-regular grid of dots on a light background — like graph paper dots. Very common in the "papery editorial" aesthetic as a structural background.
**Where to use:**
- **The process/steps section** background — the dot grid gives a technical/notebook feel that pairs well with numbered steps
- **Behind the comparison table** — gives the table a worksheet/form quality
- **The syllabus/notes stacking section** background (behind the stacking cards) — dots peek out from behind the stack
- Can also be used as the `paperGrid` equivalent if that asset has a similar quality
**CSS:**
```css
.section-process, .section-table, .section-syllabus {
  background-image: url('dottyBackground.avif');
  background-size: 400px 400px;
  background-repeat: repeat;
  background-color: #F5F0E8;
  background-blend-mode: multiply;
}
```

---

### `paperGrid` (format unknown — likely AVIF)
**Role:** Grid-lined paper background — more structured than dottyBackground
**What it looks like:** Actual grid lines on paper — like ruled/graph paper. More prominent lines than dotty.
**Where to use:**
- **The pricing or features section** — grid lines give it a spreadsheet/ledger feel
- **Inside individual cards** as a subtle card background (at very low opacity)
- **The comparison table card** background — makes it feel like a filled-out form
**CSS:**
```css
.section-features, .comparison-card {
  background-image: url('paperGrid.avif');
  background-size: 300px 300px;
  background-repeat: repeat;
  background-color: #FDFAF4;
  background-blend-mode: multiply;
  opacity: 0.6;
}
```

---

### `cutPaperTop` (AVIF)
**Role:** Top edge section divider — torn paper effect
**What it looks like:** The top edge of a piece of torn/cut paper — irregular, organic edge at the top, clean below.
**Where to use:**
- At the **top of any section that sits on top of the previous section's color** — paste this as a `::before` pseudo-element or as a positioned `<img>` at the very top of the section
- Specifically: top of the **dark CTA section** (so the dark section appears to tear into the light section above it)
- Top of the **testimonials section** if it uses a different background color
**CSS:**
```css
.section::before {
  content: '';
  position: absolute;
  top: -40px;                          /* overlap into previous section */
  left: 0;
  width: 100%;
  height: 80px;
  background-image: url('cutPaperTop.avif');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  pointer-events: none;
}
```

---

### `cutPaperBottom` (AVIF)
**Role:** Bottom edge section divider — torn paper effect
**What it looks like:** The bottom edge of a torn/cut piece of paper — clean above, irregular torn edge at the bottom.
**Where to use:**
- At the **bottom of the hero section** — so the hero appears to "rest" on a torn edge before the next section begins
- Bottom of the **logo strip/social proof section**
- Bottom of any **light section that transitions into a dark section below**
**CSS:**
```css
.section::after {
  content: '';
  position: absolute;
  bottom: -40px;
  left: 0;
  width: 100%;
  height: 80px;
  background-image: url('cutPaperBottom.avif');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 2;
  pointer-events: none;
}
```

---

### `cutPaperBottomClean` (AVIF)
**Role:** Cleaner/softer version of the bottom cut paper edge
**What it looks like:** Similar to `cutPaperBottom` but with a smoother, less dramatic tear — more of a clean die-cut than a rough tear.
**Where to use:**
- Use this instead of `cutPaperBottom` on **lighter, more delicate transitions** — e.g., between two light-colored sections
- Between the **process section and the testimonials section**
- As the **bottom edge of individual cards** in the syllabus stacking section (see Section 3)

---

### `cutPaperLeft` (AVIF)
**Role:** Left edge torn paper — vertical divider
**What it looks like:** A torn/cut paper edge running vertically on the left side.
**Where to use:**
- **Two-column layout sections** — place on the left edge of the right column to create a torn-paper column divider instead of a line
- **The founder/about section** — left edge of the founder photo block
- **Quote/callout blocks** — left border treatment instead of a standard CSS border-left
**CSS:**
```css
.two-col-right {
  position: relative;
}
.two-col-right::before {
  content: '';
  position: absolute;
  left: -30px;
  top: 0;
  width: 60px;
  height: 100%;
  background-image: url('cutPaperLeft.avif');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
```

---

### `cutPaper` (AVIF)
**Role:** General-purpose cut paper shape — likely a full floating piece of paper
**What it looks like:** A complete cut-out paper shape — probably a rectangle or irregular polygon with all four edges visible, like a sticky note or index card with torn edges.
**Where to use:**
- **Behind the hero headline** as a layered paper element the text sits on
- **Individual syllabus chapter cards** in the stacking animation section — each "chapter" slides in as one of these cut paper shapes
- **Pull quotes** — the quote sits on top of this cut paper shape
- **Annotation labels** — small floating paper tags attached to a screenshot or diagram

---

### `blackTape` (AVIF)
**Role:** Decorative tape strip — attaches paper elements
**What it looks like:** A strip of black masking tape or washi tape — typically at an angle, used to "stick" paper elements to the background.
**Where to use:**
- **Pinning the founder photos** to the background — small tape strips at the top corners of each photo (like they're pinned to a corkboard)
- **Attaching the chapter cards** in the syllabus section — a tape strip at the top of each stacked paper card
- **The testimonial cards** — tape strip in a corner makes them feel like they're stuck to a wall
- **Navigation or header accent** — a tape strip holding the logo to the nav bar
**CSS:**
```css
.taped-card::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(-2deg);
  width: 60px;
  height: 20px;
  background-image: url('blackTape.avif');
  background-size: cover;
}
```

---

### `paperClip` (AVIF)
**Role:** Paper clip illustration — groups paper elements
**What it looks like:** A silver or dark-colored paperclip, illustrated in a realistic or slightly stylized way.
**Where to use:**
- **Top corner of the syllabus/notes stack** — the entire stack of chapter cards has a paperclip holding them together (positioned at top-right corner of the stack)
- **Grouping a stat + label pair** — a small paperclip visually connects a number to its description
- **The case study section** — each case study card has a paperclip in the corner as if it's a filed document
**CSS:**
```css
.note-stack::after {
  content: '';
  position: absolute;
  top: -15px;
  right: 40px;
  width: 40px;
  height: 60px;
  background-image: url('paperClip.avif');
  background-size: contain;
  background-repeat: no-repeat;
}
```

---

### `emphasisCircle` (AVIF or SVG)
**Role:** Hand-drawn circle — highlights key words
**What it looks like:** A hand-drawn rough circle or oval, like you'd draw around something important on paper.
**Where to use:**
- **Around a key word in the hero headline** — e.g., circle around "convert" or "results"
- **Around a stat number** in the metrics row
- **In the comparison table** — circle around your winning column header
- **Next to a testimonial quote** — circle around a specific number a client mentions
**CSS:**
```css
.circled-word {
  position: relative;
  display: inline-block;
}
.circled-word::after {
  content: '';
  position: absolute;
  inset: -8px -12px;
  background-image: url('emphasisCircle.avif');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  pointer-events: none;
}
```

---

### `pointingFinger` (AVIF)
**Role:** Hand/finger pointing illustration — directs attention
**What it looks like:** An illustrated pointing hand or finger — likely in a retro/vintage woodcut style common in editorial design.
**Where to use:**
- **Next to the primary CTA button** — points toward "Book a Call" or equivalent
- **In the closing long-copy section** — points toward the final CTA at the bottom
- **Next to the most important line in a case study** — draws the eye to the key result number
- Position it floating to the left of whatever it points at, rotated to aim right

---

### `blackLeftArrow` (WebP)
**Role:** Hand-drawn arrow pointing left
**Where to use:**
- **"Scroll back" or "previous" navigation** in the case study or testimonial carousel
- **Annotation arrows** pointing to a specific element in a screenshot (pointing left toward the feature being highlighted)
- **The comparison table** — arrow pointing left toward the "Them" column to indicate what to avoid

---

### `whiteLeftArrow` (WebP)
**Role:** Hand-drawn arrow pointing left, white/light colored
**Where to use:**
- Same usage as `blackLeftArrow` but on **dark background sections**
- **Dark testimonial section** carousel navigation
- **Dark CTA section** — pointing toward a key phrase

---

### `blackBottomRightArrow` (WebP)
**Role:** Hand-drawn arrow pointing down-right (diagonal)
**Where to use:**
- **From a headline down toward the CTA button** — a classic direct response move, arrow leads the eye from the promise to the action
- **In the hero section** — positioned between the headline and the "Apply" button, pointing diagonally down-right
- **From a stat label toward the stat number** — makes the metric feel annotated

---

### `blackTopRightArrow` (WebP)
**Role:** Hand-drawn arrow pointing up-right (diagonal)
**Where to use:**
- **The `improvingGraph` annotation** — place this arrow pointing up-right next to or on the graph
- **Next to a positive stat** to reinforce upward growth direction
- **In the "results" section** — floating beside a before/after number pair, pointing up-right to indicate improvement

---

### `barChart` (AVIF)
**Role:** Illustrated bar chart icon/doodle
**What it looks like:** A small hand-drawn or illustrated bar chart — either as a simple icon or a slightly more detailed illustration.
**Where to use:**
- **In the services section** — icon representing "performance" or "analytics" services
- **Next to a stat block** as a supporting illustration
- **The "why us" or results section** — floating doodle accent near growth metrics
- Small size (48–80px), positioned as a floating doodle, slightly rotated

---

### `improvingGraph` (AVIF)
**Role:** Upward-trending graph illustration
**What it looks like:** A hand-drawn or illustrated line graph trending upward — like a revenue or growth chart.
**Where to use:**
- **The hero section** — positioned as a floating illustration near the stat numbers, gives immediate visual context for what "scaling" means
- **The case study section** — behind or beside the result numbers as a supporting illustration
- **The "results" or "outcomes" section** as a prominent doodle element
- Medium size (120–200px), given a slight rotation (-5 to +5 degrees)

---

### `rocket` (AVIF)
**Role:** Rocket illustration — growth/launch metaphor
**What it looks like:** An illustrated rocket, likely hand-drawn style.
**Where to use:**
- **The hero section** — one of the floating doodle elements, positioned top-right or bottom-left of the headline area
- **The CTA section** — next to "launch your funnel" or equivalent language
- **The process section** — represents the "Scale" phase (phase 3)
- Keep it at 80–140px, rotated 15–25 degrees upward

---

### `ideaBulb` (AVIF)
**Role:** Light bulb illustration — ideas/strategy metaphor
**What it looks like:** An illustrated light bulb, hand-drawn style.
**Where to use:**
- **The strategy phase** in the process section (Phase 1 — Strategy)
- **Floating doodle near the "about" or founder section** — represents thinking/expertise
- **Blog or content preview sections** if applicable
- Small, 60–100px, slight rotation

---

### `pencil` (AVIF)
**Role:** Pencil illustration — writing/crafting metaphor
**What it looks like:** An illustrated pencil, likely at an angle.
**Where to use:**
- **The copywriting service** callout — pencil icon represents the writing component
- **The syllabus/notes section** — floating above the stacked note cards (as if someone just wrote on them)
- **The about/founder section** — near text about the writing/strategy process
- Position at 45–60 degree angle, 80–120px size

---

### `dragToSee` (AVIF)
**Role:** Interactive hint label — tells users to drag or scroll
**What it looks like:** A hand-drawn or illustrated "drag to see" label, possibly with a finger/cursor icon.
**Where to use:**
- **The syllabus stacking section** — positioned at the bottom of the card stack, tells users to scroll to see the cards animate
- **Any horizontal scroll carousel** — appears at the right edge hinting to drag
- **The case study image** if it has a before/after drag comparison

---

### `whiteShadow` (AVIF)
**Role:** White glow/shadow overlay — creates depth
**What it looks like:** A soft white radial glow or shadow — used to make elements feel lifted off the background.
**Where to use:**
- **Behind hero content** — a large centered white glow that makes the text area feel slightly elevated from the texture
- **Behind card stacks** in the syllabus section — creates the illusion of the stack floating above the background
- **Around the founder photo** — a soft white halo that separates it from the background
**CSS:**
```css
.hero-content-wrap {
  position: relative;
}
.hero-content-wrap::before {
  content: '';
  position: absolute;
  inset: -60px;
  background-image: url('whiteShadow.avif');
  background-size: cover;
  opacity: 0.7;
  pointer-events: none;
  z-index: 0;
}
```

---

## SECTION 3 — The Syllabus Stacking Animation (Notes Preview Section)

This is the centerpiece interactive section. Here is the exact spec to give your AI.

---

### Concept
A vertical scroll-driven animation where syllabus chapter cards (styled as physical paper notes) slide up from below and stack behind each other — like shuffling a deck of cards upward. The user scrolls down, and with each scroll increment, the next card slides up and tucks behind the previous one, revealing a new chapter.

The stack sits on a `dottyBackground` surface, has a `paperClip` holding the top of the stack, and each card uses the cut paper assets for its edges.

---

### Structure (HTML)
```html
<section class="syllabus-section">
  <!-- Background -->
  <div class="syllabus-bg"></div>          <!-- dottyBackground texture -->

  <!-- Sticky scroll container -->
  <div class="syllabus-sticky-wrap">

    <!-- The paperclip sits on top of the entire stack -->
    <img src="paperClip.avif" class="stack-paperclip" alt="">

    <!-- Card stack — cards animate upward as user scrolls -->
    <div class="card-stack">

      <!-- Each card: bottom card first (lowest z-index) -->
      <div class="note-card" data-index="5">   <!-- Chapter 5 — bottom of stack -->
        <img src="cutPaperTop.avif" class="card-top-edge" alt="">
        <div class="card-body">
          <span class="chapter-label">Chapter 05</span>
          <h3 class="chapter-title">Scaling with Paid Ads</h3>
          <p class="chapter-brief">Brief description of what this chapter covers...</p>
          <img src="blackTape.avif" class="card-tape" alt="">
        </div>
        <img src="cutPaperBottomClean.avif" class="card-bottom-edge" alt="">
      </div>

      <!-- Repeat for chapters 4, 3, 2, 1 — chapter 1 is on top (highest z-index) -->
      <div class="note-card" data-index="1">   <!-- Chapter 1 — top of stack -->
        ...
      </div>

    </div>
  </div>
</section>
```

---

### CSS
```css
/* Section: tall enough to give scroll room */
.syllabus-section {
  height: 400vh;                              /* 4x viewport — room for 4 card transitions */
  position: relative;
}

/* Background */
.syllabus-bg {
  position: absolute;
  inset: 0;
  background-image: url('dottyBackground.avif');
  background-size: 400px 400px;
  background-repeat: repeat;
  background-color: #F5F0E8;
  background-blend-mode: multiply;
}

/* Sticky container — stays in view while user scrolls through the section */
.syllabus-sticky-wrap {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* The card stack */
.card-stack {
  position: relative;
  width: 480px;
  height: 560px;
}

/* Paperclip — sits above everything */
.stack-paperclip {
  position: absolute;
  top: -30px;
  right: 60px;
  width: 48px;
  z-index: 100;
  pointer-events: none;
}

/* Individual note cards */
.note-card {
  position: absolute;
  inset: 0;
  border-radius: 4px;
  background-color: #FDFAF4;
  background-image: url('paperTexture3.avif');
  background-size: 500px 500px;
  background-blend-mode: multiply;
  box-shadow: 6px 6px 0 #1A1A14;
  transform-origin: top center;
  will-change: transform;
  overflow: hidden;
}

/* z-index: chapter 1 on top, last chapter on bottom */
.note-card[data-index="1"] { z-index: 50; }
.note-card[data-index="2"] { z-index: 40; }
.note-card[data-index="3"] { z-index: 30; }
.note-card[data-index="4"] { z-index: 20; }
.note-card[data-index="5"] { z-index: 10; }

/* Cut paper edges on each card */
.card-top-edge {
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  height: 40px;
  object-fit: fill;
  z-index: 2;
}
.card-bottom-edge {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 40px;
  object-fit: fill;
  z-index: 2;
}

/* Black tape on each card — different angle per card */
.card-tape {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%) rotate(-1.5deg);
  width: 70px;
  height: 22px;
  object-fit: cover;
  z-index: 3;
  opacity: 0.85;
}

/* Card body content */
.card-body {
  padding: 60px 36px 48px;              /* top padding accounts for tape */
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 1;
}
.chapter-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #8A847C;
}
.chapter-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 700;
  color: #1A1A14;
  line-height: 1.15;
}
.chapter-brief {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: #4A4540;
  line-height: 1.65;
  margin-top: 4px;
}

/* Stagger cards slightly for the "stack" depth illusion */
.note-card[data-index="2"] { transform: translateY(6px) rotate(0.5deg); }
.note-card[data-index="3"] { transform: translateY(12px) rotate(-0.8deg); }
.note-card[data-index="4"] { transform: translateY(18px) rotate(0.4deg); }
.note-card[data-index="5"] { transform: translateY(24px) rotate(-0.6deg); }
```

---

### JavaScript (Scroll-driven stacking animation)
```javascript
const section   = document.querySelector('.syllabus-section');
const cards     = [...document.querySelectorAll('.note-card')].reverse();
// reversed so index 0 = bottom card, last = top card

function onScroll() {
  const rect      = section.getBoundingClientRect();
  const sectionH  = section.offsetHeight;
  const viewH     = window.innerHeight;

  // progress: 0 = top of section reached, 1 = bottom of section reached
  const progress  = Math.max(0, Math.min(1, -rect.top / (sectionH - viewH)));

  const totalCards = cards.length;   // e.g., 5

  cards.forEach((card, i) => {
    // Each card gets its own progress window
    // Card 0 (bottom) animates first, card N-1 (top front) animates last
    const cardStart = i / totalCards;
    const cardEnd   = (i + 1) / totalCards;
    const cardProg  = Math.max(0, Math.min(1, (progress - cardStart) / (cardEnd - cardStart)));

    // Animation: card slides UP from resting position into "stacked behind" position
    // Resting:  translateY(i * 6px) + slight rotation (already set in CSS)
    // Stacked:  translateY(-110%)  — slides up out of view behind the card above it

    const baseY  = i * 6;                         // resting Y offset (stack depth)
    const targetY = -110;                          // final Y in vh-percent (slides up behind)
    const currentY = baseY + cardProg * (targetY * (section.offsetHeight / 100) - baseY);

    // Rotations per card
    const rotations = [0, 0.5, -0.8, 0.4, -0.6];
    const baseRot = rotations[i] || 0;
    const currentRot = baseRot * (1 - cardProg);  // flattens out as card slides up

    card.style.transform = `translateY(${currentY}px) rotate(${currentRot}deg)`;
    card.style.zIndex    = i + 1;                 // maintain stacking order
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load
```

---

### Texture mixing inside each card

To make each card feel distinct (not identical), vary the texture per card:

| Card (Chapter) | Background texture | Tape rotation | Additional doodle |
|---|---|---|---|
| Chapter 1 (top) | `paperTexture` | -1.5deg | `pencil` floating bottom-right |
| Chapter 2 | `paperTexture2` | +2deg | `ideaBulb` bottom-right |
| Chapter 3 | `paperTexture3` | -0.5deg | `barChart` bottom-right |
| Chapter 4 | `paperTexture` | +1.8deg | `rocket` bottom-right |
| Chapter 5 (bottom) | `paperTexture2` | -2.5deg | `improvingGraph` bottom-right |

Each card also gets a different subtle rotation in its stacking offset (already set in CSS above) so the stack looks natural and organic.

---

## SECTION 4 — Assets Not Used in the Syllabus Section

These assets are placed elsewhere on the page and should NOT be inside the stacking cards:

| Asset | Placement |
|---|---|
| `pointingFinger` | Next to primary CTA button in hero and closing section |
| `blackBottomRightArrow` | Between hero headline and CTA button |
| `blackTopRightArrow` | Next to `improvingGraph` and upward-trend stats |
| `blackLeftArrow` | Carousel back-navigation on testimonials/case studies |
| `whiteLeftArrow` | Same as above but on dark sections |
| `emphasisCircle` | Around key word in hero headline and a stat number |
| `dragToSee` | Bottom of the syllabus stack, hints to scroll |
| `whiteShadow` | Behind hero content block and behind the card stack |
| `crumbledBlackPaperTexture` | Behind stat numbers in hero (absolute positioned, rotated, very low opacity) |
| `cutPaperLeft` | Left edge of the two-column layout in founder/about section |

---

## SECTION 5 — Complete Prompt Block for Your AI

Paste this entire block to instruct your AI on all assets:

```
I have the following image assets from the ScalingFunnels design kit. Use them exactly as described:

BACKGROUND TEXTURES (tiled with background-repeat: repeat, background-blend-mode: multiply):
- paperTexture.avif → hero section + card interiors
- paperTexture2.avif → alternating light sections (process, social proof)
- paperTexture3.avif → syllabus stack cards + testimonial cards
- blackPaperTexture.avif (×2) → dark sections (CTA, testimonials dark bg)
- dottyBackground.avif → syllabus section background, process section, comparison table
- paperGrid.avif → pricing/features section background

SECTION EDGE DIVIDERS (positioned absolute at section top/bottom, width 100%):
- cutPaperTop.avif → top edge of dark sections (::before pseudo-element, top: -40px)
- cutPaperBottom.avif → bottom edge of hero, logo strip (::after pseudo-element, bottom: -40px)
- cutPaperBottomClean.avif → softer transitions between light sections + bottom edge of each syllabus card
- cutPaperLeft.avif → left vertical edge of right column in two-column about/founder layout

DOODLE OVERLAYS (position: absolute, pointer-events: none, small size, slight rotation):
- emphasisCircle.avif → around key word in hero H1 and around a stat number
- blackBottomRightArrow.avif → between hero headline and CTA button
- blackTopRightArrow.avif → next to improvingGraph and positive stats
- blackLeftArrow.avif → testimonial/case study carousel previous button
- whiteLeftArrow.avif → same but on dark sections
- pointingFinger.avif → beside CTA buttons (hero and closing section)
- barChart.avif → floating doodle near metrics (60px, rotated -5deg)
- improvingGraph.avif → floating near hero stats (150px, rotated +3deg)
- rocket.avif → hero floating doodle top-right OR process Phase 3 icon (100px, rotated 20deg)
- ideaBulb.avif → process Phase 1 icon + founder section floating doodle (80px)
- pencil.avif → above syllabus stack + copywriting service icon (100px, rotated 45deg)

UI ATTACHMENT ELEMENTS:
- blackTape.avif → top of each syllabus card, corners of founder photos, testimonial cards
- paperClip.avif → top-right of the entire syllabus card stack
- dragToSee.avif → below syllabus stack, hints to scroll

DEPTH / SHADOW EFFECTS:
- whiteShadow.avif → behind hero text content block + behind syllabus card stack (opacity 0.7)
- crumbledBlackPaperTexture.avif → behind hero stat numbers (absolute, rotated -3deg, opacity 0.12)

SYLLABUS STACKING SECTION:
Build a scroll-driven card stacking animation where 5 note cards (each representing a chapter) 
are stacked like physical papers. As the user scrolls, each card slides upward behind the 
previous one. Each card uses paperTexture + cutPaperTop at top edge + cutPaperBottomClean 
at bottom edge + blackTape across the top + a floating doodle icon bottom-right. The 
paperClip sits on top of the entire stack. Background is dottyBackground. whiteShadow is 
placed behind the stack. dragToSee label sits below the stack. Use the JavaScript scroll 
animation described above with position:sticky on a 400vh section container.
```
