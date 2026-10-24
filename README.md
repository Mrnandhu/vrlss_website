# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Restaurant demo structure: menu-first experience, secondary reservation CTA, and expandable full menu.

Boutique demo: /demos/boutique — fictional Aurelia Fashion Studio catalogue concept with collection filters, product detail modal, lookbook and enquiry flow.

## Cinematic home page

The home page (`/`) is a scroll-driven 3D experience built with three.js (@react-three/fiber), GSAP ScrollTrigger and Lenis. Everything lives in `src/site/cinema/`:

- `content.js`: homepage copy. Brand details, prices, demos, sectors, markets and FAQs still come from the existing data files (`brand.js`, `prices.js`, `demos/industries.js`, `places.js`, `routes.js`).
- `palette.js`: the studio colours used by the 3D scene (same values as `studio.css`).
- `CinemaHome.jsx` + `cinema.css`: the page and its styles (scoped to `.cm`).
- `three/`: the 3D scenes. `world.js` holds the camera path and where each scene sits.

It adapts to the device: full 3D with bloom and depth of field on desktop, a lighter scene on phones, a single still frame for "reduce motion", and an SVG fallback without WebGL. Add `?cinema=full|lite|static|none` to the URL to preview each version. The 3D code is a separate chunk, loaded after the page is interactive. The prerendered HTML still contains all the text for search engines.
