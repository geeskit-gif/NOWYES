# NOWYES — PWA Frontend

**NOWYES** es una guía práctica para migrantes en México. Frontend-only, mobile-first, cross-platform Progressive Web App.

> NOWYES es una herramienta de orientación. Los requisitos, costos y procedimientos oficiales pueden cambiar. Verifica siempre la información con la fuente oficial. NOWYES no es una agencia gubernamental, INM, abogado ni autoridad legal.

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS
- PWA (manifest + service worker)
- localStorage for persistence (demo)
- lucide-react icons

## Features (Frontend Only)
- Home: ¿QUÉ NECESITAS HOY? / WHAT DO YOU NEED TODAY? / KISA OU BEZWEN JODI A?
- 6 entry points: Documentos, Trabajo, Salud, Comida, Ayuda, Mapa (trilingual)
- Mi Kit / My Kit / Kit Mwen: datos, documentos, CV, experiencia, formularios, checklist
- CV Builder: preview + print/download (only user-entered data)
- Guided Help flow: ¿NO SABES POR DÓNDE EMPEZAR?
- Documents: CURP, Residencia, etc. with REQUISITOS OFICIALES vs PREPARACIÓN ÚTIL, VERIFIED vs DEMO badges
- Forms: step-by-step with explanations, progress, review
- Map: Tapachula-focused, categories, service cards, ¿DÓNDE ESTOY? GPS, offline download simulation
- Bottom nav: HOME / MAP / MY KIT / HELP
- Languages: ES / EN / HT — full translation, selector always accessible
- Trust notice included everywhere

## Design
- Logo: exact file `src/assets/nowyes-logo.png` — DO NOT modify
- Colors: bg #0A0A0B, card #151519, gold #D4A845, silver #C0C4CC
- High contrast, large touch targets, minimal 8px corners, angular geometry
- iOS safe areas, notches, Android nav areas respected
- No hover-dependent features

## Project Structure
```
├── index.html
├── public/
│   ├── manifest.json
│   ├── sw.js
│   ├── nowyes-logo.png
│   └── icons/
├── src/
│   ├── assets/nowyes-logo.png
│   ├── components/ (Header, BottomNavigation, ServiceCard, etc.)
│   ├── data/ (languages, services, mock data)
│   ├── App.tsx (main functional prototype)
│   ├── main.tsx
│   └── index.css
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Run Locally
```bash
npm install
npm run dev
# open http://localhost:5173
```

## Build
```bash
npm run build
npm run preview
```

## PWA
- Manifest: /public/manifest.json (name NOWYES, standalone, theme #0A0A0B)
- Icons from exact logo
- Service worker: /public/sw.js (cache-first fallback for offline demo)
- Installable on iOS Safari and Android Chrome

## Offline
- Simulated via localStorage: services, kit, CV, forms saved locally
- Button: DESCARGAR DATOS PARA USAR SIN INTERNET

## Notes
- No backend, no auth, no external APIs (except geolocation)
- Demo data clearly labeled DEMO / POR VERIFICAR
- Never invents legal requirements
- Logo must not be redesigned

## Deploy
- Build output in /dist — upload to any static host (Netlify, Vercel, GitHub Pages, S3)
- No secrets needed

---
POWERED BY SBAI — NOWYES LISTO
