# Dr. Seeam — Mental Health Consultation Website

A marketing site and appointment-booking flow for **Dr. Seeam**, a certified clinical psychologist.
It is a React + Vite build of the Figma file **Doctor Consultancy Landing Page**. The aim is a
pixel-accurate match of the design at the three desktop widths in that file (1200px, 1440px and 1900px).

> **Status:** front end only. Sign-in and payment have no backend yet. Their forms check what is
> typed in and move through the steps, but they don't send data anywhere.

---

## Contents

1. [Tech stack](#tech-stack)
2. [Getting started](#getting-started)
3. [Scripts](#scripts)
4. [Pages and routes](#pages-and-routes)
5. [Landing page sections](#landing-page-sections)
6. [Booking flow](#booking-flow)
7. [Animations and interactions](#animations-and-interactions)
8. [Responsive behaviour](#responsive-behaviour)
9. [Design system](#design-system)
10. [Project structure](#project-structure)
11. [Assets and icons](#assets-and-icons)
12. [Accessibility](#accessibility)
13. [Editing content](#editing-content)
14. [Building and deploying](#building-and-deploying)
15. [Known limitations and next steps](#known-limitations-and-next-steps)

---

## Tech stack

| Area      | Choice |
| --------- | ------ |
| Framework | [React 19](https://react.dev) |
| Build     | [Vite 8](https://vite.dev) with `@vitejs/plugin-react` |
| Routing   | [React Router 7](https://reactrouter.com) (`BrowserRouter`) |
| Styling   | Plain CSS with custom properties (no CSS framework). CSS container queries are used for the hero |
| State     | React Context, saved to `sessionStorage` (booking flow) |
| Font      | [Inter](https://fonts.google.com/specimen/Inter) 400 / 500 / 600 from Google Fonts |
| Icons     | [Nucleo](https://nucleoapp.com) SVG icons, mostly the **ui** family at 18px |
| Linting   | [oxlint](https://oxc.rs) |

There are no other runtime dependencies.

## Getting started

**Requirements:** Node.js 20 or newer (built with Node 24) and npm.

```bash
git clone https://github.com/seeamahmod/dr-seeam-website.git
cd dr-seeam-website
npm install
npm run dev
```

Then open <http://localhost:5173>.

## Scripts

| Command           | What it does |
| ----------------- | ------------ |
| `npm run dev`     | Starts the dev server with hot reload on port 5173 |
| `npm run build`   | Makes a production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint`    | Runs oxlint on the source |

## Pages and routes

Routes are defined in [`src/App.jsx`](src/App.jsx).

| URL                | Page | Figma frame |
| ------------------ | ---- | ----------- |
| `/`                | Landing page | Consultation Landing page (1200 / 1440 / 1900) |
| `/book/service`    | Booking step 1: choose a service | Booking page – Service |
| `/book/type`       | Booking step 2: online or in person | Booking page – Type |
| `/book/schedule`   | Booking step 3: date and time | Booking page – Schedule |
| `/book/details`    | Booking step 4: your details | Booking page – Details |
| `/book/review`     | Booking step 5: review and pay | Booking page – Review & Pay |
| `/book/confirmed`  | Booking confirmation | Booking Confirmation Page |
| `/login`           | Patient / consultant sign-in | Login Page |
| anything else      | Sends you back to `/` | — |

- `/book` goes to `/book/service`.
- `/book/service?service=<id>` opens step 1 with that service already picked. Each "Schedule Now"
  button on the landing page uses this.
- Navbar links point to sections on the landing page (`/#home`, `/#about`, `/#services`, `/#reviews`).
  A small `ScrollManager` in `App.jsx` scrolls to the section, or to the top on a new page.

## Landing page sections

Composed in [`src/pages/Landing.jsx`](src/pages/Landing.jsx), in this order:

| # | Component | What's in it |
| - | --------- | ------------ |
| 1 | `Navbar` | Home / About / Services / Reviews links, centred logo, "Join Now" (goes to `/login`), mobile menu toggle |
| 2 | `Hero` | Sky card, large "Dr. Seeam" gradient wordmark, doctor portrait, progressive blur band, headline, "Book Appointment" button |
| 3 | `Passion` | Statement line: "With a passion for…" |
| 4 | `Services` | Six service cards with duration and "Schedule Now" |
| 5 | `About` | "Introducing Dr. Seeam", bio, photo and four animated stats (15+ years, 500+ people, 4.9 rating, 98% satisfaction) |
| 6 | `Unique` | "What Makes Me Unique": three feature cards with a DNA artwork hover state |
| 7 | `Support` | "You Deserve to Be Emotionally Well": confidentiality, community, accessibility cards and a photo |
| 8 | `Testimonials` | "What Our Clients Say": three columns of reviews that scroll on their own |
| 9 | `Faq` | Five-question accordion (the first one starts open) |
| 10 | `Cta` | "Ready to Start Your Journey?" call to action |
| 11 | `Footer` | Contact details, links and a large "Dr. Seeam" watermark |

## Booking flow

All booking code lives in [`src/booking/`](src/booking).

### Steps

1. **Service:** pick one of six services. Each has a tag, a description and a duration
   (20–120 min). Every service is $150.
2. **Meeting type:** pick **Online Consultation** (secure video, no travel) or **In-Person Visit**
   (shows the office address).
3. **Schedule:**
   - A real month calendar. Past days and Sundays are disabled, and you can move between months.
   - Pick a morning (09:00–01:00) or afternoon (02:00–06:00) time slot.
4. **Details:** name, email, confirm email, phone and notes.
   - Name is required.
   - Email must be valid, and the two email fields must match.
   - An error goes away as soon as you edit that field.
5. **Review & pay:**
   - A summary of the booking.
   - A card form that formats the number as you type, plus a PayPal option and a "Pay $150" button.
   - Paying creates a reference like `BK-4F7Q2A`.
6. **Confirmed:**
   - Shows the booking reference.
   - **Add to Google Calendar** link and **download .ics** button.
   - A link to the dashboard (the login page for now).

### How it works

| File | Job |
| ---- | --- |
| `BookingContext.jsx` | Holds the booking (service, type, date, time, details, reference). Saved in `sessionStorage` under `dr-seeam-booking`, so a page refresh keeps your progress |
| `data.js` | Services, meeting types, time slots, step list and date helpers |
| `BookingLayout.jsx` | Shared frame: navbar, stepper, the current step and the booking footer |
| `Stepper.jsx` | Progress bar and step labels. Finished steps are links, so you can go back |
| `parts.jsx` | Shared pieces: step header, pill, doctor row, duration, divider, summary card, Back/Continue buttons |
| `Step*.jsx` | One file per step |
| `Confirmed.jsx` | Confirmation page and calendar export |
| `BookingFooter.jsx` | Booking-page footer with its watermark |

The default booking is an Initial Consultation, in person, on the next day that isn't a Sunday, at 2:00 pm.

## Animations and interactions

| Where | Behaviour |
| ----- | --------- |
| Hero | A **progressive backdrop blur** fades in under the portrait (none at the top, strongest at the bottom), matching Figma's progressive background blur. CSS has no progressive blur, so it's built from 6 stacked `backdrop-filter` layers. Each layer is masked to start a little lower and blur a little more |
| About stats | Each number **counts up from 0** (about 1 second, ease-out) whenever it is at least half on screen. It resets once it scrolls fully out of view, so it plays again next time ([`CountUp.jsx`](src/components/CountUp.jsx)) |
| Unique cards | All three are white. On **hover or keyboard focus** a card turns light blue, the DNA artwork slides in and the icon chip turns white |
| Testimonials | An **endless marquee**: the left and right columns drift down and the middle one drifts up, at about 20px a second so people can read. It keeps moving when you hover. Each column's list is rendered twice and moved by `translateY(0 ↔ -50%)`, so the loop has no gap |
| FAQ | Accordion that opens and closes with `aria-expanded` |
| Buttons | Arrow buttons with hover states |

When **reduced motion** is turned on in the system settings, the marquee stands still and the stats show their final numbers straight away.

## Responsive behaviour

The Figma file has three desktop frames: **1200px** (minimum), **1440px** (default) and **1900px** (maximum).

- **Content grid:** sections sit on a centred **1320px** grid (`--content-max`) with 60px side
  padding. This covers About, Services, Unique, Support, Testimonials, FAQ, CTA and the footer card.
- **Hero:**
  - The card is always 991px tall with 20px gutters, and the portrait stays a fixed size.
  - Only the "Dr. Seeam" wordmark scales. Container queries (`cqw`) size it so it always fits the card.
  - The headline and button sit 41/42px from the edges. From 1660px wide they sit 28px from the edges.
- **Services:** 4 cards across at 1900px, 3 at 1440px, 2 at 1200px.
- **Unique / Support / Testimonials:** cards up to 424px wide that get narrower towards 1200px.
- **Type sizes:** headings and body text use `clamp()`, so they scale smoothly between the frames.
- **Booking pages:**
  - Content is at most 1320px wide and centred.
  - The columns shrink between 1440px and 1200px.
  - On the Schedule step, the time slots move under the calendar when there isn't room beside it.
  - Columns stack below 1024px.

**Below 1200px**, the rules under `@media (max-width: 1199px)` (and smaller) are **temporary tablet and phone styles**.
They keep the site usable, and they will be replaced when the mobile designs are ready.

## Design system

Tokens are CSS custom properties in [`src/styles/global.css`](src/styles/global.css):

- **Colour:** primary blue, ink and its 80% tint, surface white, highlight light blue
  (`#f0f4ff`), line colour, and orange `#e34400` for the selected calendar day.
- **Type:** `--fs-h2` `clamp(32px, 4vw, 48px)`, `--fs-h3` `clamp(24px, 2.667vw, 32px)`,
  `--fs-lead` `clamp(16px, 1.5vw, 18px)`, plus tight letter-spacing for headings.
- **Layout:** `--content-max: 1320px`, and every `.section > *` is capped to it.
- **Shared components:** in [`src/components/ui.jsx`](src/components/ui.jsx).
  - `ArrowButton` comes in `primary`, `light` and `light-lg` variants and is a router `Link`.
  - `Eyebrow`, `SectionHeader` and `GlowDot`.

Stylesheets:

| File | Contents |
| ---- | -------- |
| `styles/global.css` | Reset, tokens, buttons, tags, glow dot |
| `styles/sections.css` | Every landing-page section and its breakpoints |
| `styles/booking.css` | Booking steps, stepper, summary, calendar, payment, confirmation and login |

## Project structure

```
dr-seeam-website/
├─ index.html              Page shell, Inter font, title, favicon
├─ public/                 favicon.svg and other static files
├─ src/
│  ├─ main.jsx             Entry: BrowserRouter + the three stylesheets
│  ├─ App.jsx              Routes, BookingProvider, ScrollManager
│  ├─ pages/
│  │  ├─ Landing.jsx       Puts the landing sections together
│  │  └─ Login.jsx         Patient / consultant tabs, email + password, go back
│  ├─ components/          Landing sections + ui.jsx + CountUp.jsx
│  ├─ booking/             Booking flow (see above)
│  ├─ styles/              global.css, sections.css, booking.css
│  └─ assets/
│     ├─ icons/            Nucleo icons (nucleo_icon_*) and logo marks
│     ├─ images/           Photos and artwork exported from Figma
│     ├─ avatars/          Testimonial photos (avatar-01 … avatar-11)
│     └─ booking/          Booking-flow images (doctor avatar, PayPal, lines, radio)
├─ vite.config.js
├─ .oxlintrc.json
└─ package.json
```

## Assets and icons

- **Images:** all images are exported from the Figma file and imported in the components, so Vite
  fingerprints and optimises them.
- **Icons:** every icon is a Nucleo icon, and the files are named `nucleo_icon_<name>-<style><size>`.
  The same layer names are used in Figma, so it's easy to find which icon matches which file.
  - Icons that need to change colour (for example, in the Unique cards) are used as a CSS
    `mask` filled with `currentColor`.
  - Nucleo icons are licensed, so check the licence before reusing them outside this project.

## Accessibility

- Semantic landmarks and headings. Decorative images use `alt=""` and `aria-hidden`.
- Animated stats have an `aria-label` with the final value, so screen readers don't read the
  changing numbers.
- The repeated copy of each testimonial column is `aria-hidden`, so screen readers don't read it twice.
- The star rating has a label such as "5 out of 5 stars".
- The FAQ accordion uses buttons with `aria-expanded`. Feature cards can be reached with the
  keyboard and show the hover state on `:focus-visible`.
- Reduced-motion users get no motion (see above).

## Editing content

| To change… | Edit |
| ---------- | ---- |
| Services on the landing page | `src/components/Services.jsx` |
| Services, prices and durations in booking | `src/booking/data.js` (`SERVICES`, `PRICE`) |
| Time slots / meeting types / office address | `src/booking/data.js` |
| Stats in About | `STATS` in `src/components/About.jsx` |
| Reviews (quote, name, address, stars, photo) | `COLUMNS` in `src/components/Testimonials.jsx` |
| FAQ questions and answers | `src/components/Faq.jsx` |
| Footer contact details | `src/components/Footer.jsx` |
| Colours, font sizes, grid width | `src/styles/global.css` |

> The review text, reviewer names and addresses, and FAQ answers 2–5 are **sample copy**.
> Replace them with real content before going live.

## Building and deploying

```bash
npm run build
```

This makes a static site in `dist/` that any static host can serve, such as Netlify, Vercel,
GitHub Pages or Cloudflare Pages.

The app uses client-side routing (`BrowserRouter`), so the host must serve `index.html` for every
path. Without that, refreshing `/book/schedule` returns a 404.

- **Netlify:** add a `public/_redirects` file with `/* /index.html 200`.
- **Vercel:** add a rewrite of `/(.*)` to `/index.html` in `vercel.json`.
- **GitHub Pages:** copy `index.html` to `404.html` after building, and set Vite's `base` to the repo name.

## Known limitations and next steps

- [ ] **Mobile and tablet designs:** styles below 1200px are temporary until the mobile frames are designed.
- [ ] **Backend:** sign-in, payment processing, real slot availability and confirmation emails.
- [ ] **Real content:** testimonials, FAQ answers and the remaining placeholder copy.
- [ ] **Patient dashboard:** the confirmation page's dashboard link goes to `/login` for now.
- [ ] Two testimonial photos appear twice, because the design has 11 photos for 13 cards.

---

Designed in Figma and built with React + Vite.
