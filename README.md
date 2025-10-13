# 🗺️ TravelPlanner

Application de planification d'itinéraires avec carte interactive, Next.js 15, React 19 et TypeScript. Design System interne (tokens, primitives) et données d'itinéraires prêtes à l'emploi.

## ⚙️ Prérequis

- Node.js ≥ 20.19 (LTS conseillé). Avec `nvm` :

```bash
nvm use 20
```

## 🚀 Démarrage rapide

1. Installer les dépendances

```bash
npm install
```

2. Configurer les APIs externes

```env
# .env.local
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=votre_cle_api_mapbox
# Optionnel : token Mapbox dédié à la géocodification
MAPBOX_GEOCODING_ACCESS_TOKEN=votre_cle_api_mapbox
```

Sans token Mapbox, un token de démo est utilisé (limite ~50k vues/mois).

La recherche de destinations (autocomplete + coordonnées) passe désormais par l'API Geocoding de Mapbox. Si `MAPBOX_GEOCODING_ACCESS_TOKEN` est vide, le token public (`NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`) sera utilisé côté serveur.

3. Lancer le serveur de dev

```bash
npm run dev
```

Ouvrir http://localhost:3000

## 🧹 Qualité du code

- `npm run format` applique Prettier sur les fichiers supportés (voire `format:check` pour CI).
- Le hook Husky pré-commit formate automatiquement les fichiers modifiés, lance ESLint et exécute `vitest --run --changed`.

## 📦 Scripts utiles

- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint JS/TS: `npm run lint`
- Lint CSS: `npm run lint:css`
- Tests (Vitest): `npm run test` | `npm run test:run` | `npm run test:ui` | `npm run test:coverage`

## 🧭 Carte et données

- Carte: `src/components/Map.tsx` (Mapbox via `react-map-gl`). Styles changeables dynamiquement.
- Données d'itinéraire: `src/data/itinerary.ts` et autres fichiers dans `src/data/**` (ex: Europe, Balkans...).
- Types: `src/types/travel.ts` (destinations, jours, transports...).

## 🎨 Design System

- Provider: `src/design-system/providers/design-system-provider.tsx` (déjà utilisé dans `src/app/layout.tsx`).
- Tokens: `src/design-system/tokens/**` (couleurs OKLCH, typo, espacements...).
- Primitives: `src/design-system/primitives/**` (Text, Stack, etc.).
- Composants DS: `src/design-system/components/**` (ex: `app-header.tsx`, `theme-selector.tsx`).
- UI locaux (shadcn-like): `src/components/ui/**` (`button.tsx`, `badge.tsx`, `card.tsx`, `separator.tsx`).

Astuce: tu peux consommer ces composants directement dans `src/app/page.tsx` (déjà fait pour `Button`, `AppHeader`, `ThemeSelector`).

## 🧹 Qualité & Tests

- ESLint 9 + config Next: `npm run lint` (corriger les warnings des hooks et types quand signalés).
- Stylelint (Tailwind v4): `npm run lint:css`.
- Vitest: `npm run test` (unitaires), `npm run test:ui`, `npm run test:coverage`.

## 🗂️ Structure

```
src/
├─ app/                 # App Router Next.js
│  ├─ page.tsx          # Page principale (carte + étapes)
│  ├─ layout.tsx        # Layout avec DesignSystemProvider
│  └─ globals.css       # Thème + tokens CSS (Tailwind v4)
├─ components/
│  ├─ Map.tsx           # Carte Mapbox (react-map-gl)
│  ├─ ItineraryCard.tsx # UI d'une étape
│  └─ ui/               # Boutons, Badge, Card, Separator
├─ design-system/       # DS interne (tokens/primitives/composants)
├─ data/                # Itinéraires/destinations
├─ hooks/               # Hooks (groupes de destinations, segments)
├─ lib/                 # Utilitaires (dates, carte, helpers)
└─ types/               # Types TS (travel)
```

## 🔧 Dépannage (FAQ)

- Carte blanche/erreur Mapbox: vérifier le token dans `.env.local` et la variable `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`.
- Warnings Tailwind/Stylelint sur OKLCH/deg: ce sont des règles strictes; tu peux lancer `npm run lint:css -- --fix` et/ou ajuster `.stylelintrc.json` si besoin.
- Icônes/images: privilégier `next/image` (déjà fait) pour de meilleures perfs.
- Storybook (optionnel): non requis. Si tu souhaites l'utiliser plus tard avec `@storybook/nextjs-vite`, utilise Node ≥ 20.19 et aligne les versions Storybook.

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📝 Contribution

1. Créer une branche
2. Commits clairs
3. `npm run lint` / `npm run test`
4. PR

---

Bon voyage et bon dev ✈️
