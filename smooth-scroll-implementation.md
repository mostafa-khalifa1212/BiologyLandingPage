# Task: Implement Smooth Gliding Scroll on the Website

## What to install
Install the Lenis smooth scroll library:
```
npm install @studio-freight/lenis
```

---

## What to implement

Add buttery, momentum-based smooth scrolling to the entire website using Lenis. This makes the page feel like it glides and floats slightly behind the user's scroll input instead of snapping instantly — the premium feel seen on high-end agency websites.

---

## Step 1 — Add base CSS to the global stylesheet

Add these lines to the top-level global CSS file (globals.css, index.css, app.css — whatever the main stylesheet is called):

```css
html {
  scroll-behavior: smooth;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  overflow-x: hidden;
}
```

---

## Step 2 — Initialize Lenis

Create a new file called `lenis.js` (or `smoothScroll.js`) and add the following:

```js
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

export default lenis;
```

Import and initialize this file at the root entry point of the project (e.g. `main.js`, `index.js`, `_app.js`, or `layout.js` depending on the framework) so it runs on every page:

```js
import './lenis.js'; // or the correct relative path
```

---

## Step 3 — Fix the syllabus card stacking animation to work with Lenis

The syllabus stacking section uses a scroll event listener. Since Lenis overrides native scroll, the animation must listen to Lenis instead of `window`. 

Find the syllabus scroll animation code — it will contain a line that looks like this:

```js
window.addEventListener('scroll', onScroll, { passive: true });
```

Replace that entire scroll listener block with this:

```js
import lenis from './lenis.js'; // adjust path as needed

lenis.on('scroll', ({ scroll, progress }) => {
  onScroll(); // call the existing onScroll function unchanged
});

onScroll(); // still call once on load
```

The `onScroll` function itself does not need to change — it still reads `section.getBoundingClientRect()` exactly as before. Only the event listener changes.

---

## Step 4 — Handle any other scroll listeners on the page

Search the codebase for every instance of:
```
window.addEventListener('scroll'
window.scrollY
window.pageYOffset
document.documentElement.scrollTop
```

For each one found:
- If it is inside the syllabus animation → already handled in Step 3
- If it is a navbar show/hide on scroll → replace with `lenis.on('scroll', ({ scroll }) => { ... })` using the `scroll` value (current scroll position in px) instead of `window.scrollY`
- If it is an intersection observer → leave it completely unchanged, Lenis does not interfere with IntersectionObserver

---

## Step 5 — Prevent Lenis conflicting with any modal or overlay

If the website has any modals, popups, or full-screen overlays that should lock scrolling when open, add the following:

```js
// When modal opens — pause Lenis
lenis.stop();

// When modal closes — resume Lenis
lenis.start();
```

Find the modal open/close logic in the codebase and insert `lenis.stop()` and `lenis.start()` at the appropriate points.

---

## Configuration reference

If the scroll feels too slow or too fast after testing, adjust the `duration` value in Step 2:

| Feel | duration value |
|------|---------------|
| Snappy but smooth | 0.8 |
| Balanced (recommended) | 1.2 |
| Very floaty / cinematic | 1.8 |
| Too slow — do not use | 2.5+ |

Do not change the `easing` function — the exponential ease provided is the standard for this aesthetic and matches the feel of the ScalingFunnels reference site.

---

## What NOT to do

- Do not install both Lenis AND Locomotive Scroll — pick one only
- Do not add `overflow: hidden` to `<html>` or `<body>` — this breaks Lenis entirely
- Do not use `scroll-snap` CSS on any section — it conflicts with Lenis momentum
- Do not call `window.scrollTo()` directly anywhere — use `lenis.scrollTo(target)` instead for any programmatic scrolling (e.g. "scroll to top" buttons or anchor link navigation)

For anchor links specifically, replace:
```js
element.scrollIntoView({ behavior: 'smooth' });
```
with:
```js
lenis.scrollTo(element);
```

---

## Verification checklist

After implementing, confirm the following:
- [ ] Scrolling on desktop feels smooth and has a slight glide/momentum tail
- [ ] The syllabus card stacking animation still triggers correctly as the user scrolls through that section
- [ ] The navbar (if it hides/shows on scroll) still works correctly
- [ ] No horizontal scroll bar appears on any page
- [ ] Modals/overlays lock scroll when open and release when closed
- [ ] Mobile touch scrolling feels natural (slightly faster than desktop is expected and correct)
