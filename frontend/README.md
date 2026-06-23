# Justin Moreira — Personal Portfolio

A warm, professional portfolio website built with **React + Tailwind CSS + shadcn/ui**.

## Tech Stack
- React 19 (Create React App + CRACO)
- Tailwind CSS 3
- shadcn/ui components (Radix UI)
- lucide-react icons
- Playfair Display + Inter fonts

## Quick Start

```bash
cd frontend
yarn install
yarn start
```
Open http://localhost:3000

Production build:
```bash
yarn build
```
Deploy the `frontend/build/` folder to Vercel, Netlify, GitHub Pages, etc.

## Editing your content
All your personal data lives in **`src/mock.js`**:
- `profile` — name, title, photo, email, phone, socials
- `skillGroups` / `proficiencies` — Skills section
- `experiences` — timeline entries
- `projects` — project cards
- `education` — degrees / diplomas
- `languages` — spoken languages

## Project Structure
```
frontend/
└── src/
    ├── components/
    │   ├── atoms/                 # Basic UI elements (Button, Input)
    │   ├── molecules/             # Complex UI elements (Card, Dialog)
    │   ├── organisms/             # Distinct sections (Hero, Navbar)
    │   └── pages/                 # Full views (Portfolio.jsx)
    ├── mock.js                    # All portfolio data (edit me!)
    └── App.js, App.css, index.css
```

## Design
- Palette: warm cream `#FAF6F0`, deep chestnut `#6B4423`, warm tan `#B8956A`, charcoal `#2A2522`.
- Fonts: Playfair Display + Inter.
- The contact form stores submissions in `localStorage` so it works without a backend. Replace the handler in `src/components/sections/Contact.jsx` with a real API call when ready.

---
© Justin Gabriel Moreira Matarrita
