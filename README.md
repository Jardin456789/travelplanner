# 🗺️ TravelPlanner

Une application de planification de voyages avec cartes interactives, construite avec Next.js, TypeScript et Mapbox.

## 🚀 Démarrage rapide

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration de Mapbox

1. Créez un compte gratuit sur [mapbox.com](https://account.mapbox.com/)
2. Générez une clé API dans la section "Access tokens"
3. Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=votre_clé_api_mapbox_ici
```

**Note :** Si vous ne configurez pas de token, l'application utilisera automatiquement un token de démonstration Mapbox (50k vues/mois gratuites).

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir l'application.

## 🛠️ Technologies utilisées

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Mapbox GL JS** - Cartes interactives
- **React Map GL** - Composants React pour Mapbox
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation des données
- **Lucide React** - Icônes

## 🎨 Personnalisation des cartes

### Styles prédéfinis Mapbox

L'application inclut **8 styles de carte prédéfinis** que vous pouvez changer en temps réel :

- **🗺️ Streets** - Carte routière classique
- **🛰️ Satellite** - Vue satellite pure
- **🛰️ Satellite + Streets** - Satellite avec noms de rues
- **🏔️ Outdoors** - Optimisé pour les activités extérieures
- **☀️ Light** - Thème clair minimaliste
- **🌙 Dark** - Thème sombre élégant
- **🚗 Navigation (Jour)** - Optimisé pour la conduite de jour
- **🚗 Navigation (Nuit)** - Optimisé pour la conduite de nuit

### Styles personnalisés avancés

Pour créer vos propres styles, utilisez [Mapbox Studio](https://studio.mapbox.com/) :

1. Connectez-vous à votre compte Mapbox
2. Créez un nouveau style ou dupliquez un style existant
3. Personnalisez les couleurs, polices, icônes
4. Publiez votre style et récupérez l'URL
5. Utilisez l'URL dans votre application

```typescript
// Exemple d'utilisation d'un style personnalisé
const customStyle = 'mapbox://styles/votre-compte/votre-style-id';
<TravelMap mapStyle={customStyle} />
```

## 📁 Structure du projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── layout.tsx         # Layout principal
│   └── globals.css        # Styles globaux
├── components/            # Composants React réutilisables
│   ├── Map.tsx           # Carte interactive Mapbox
│   └── ItineraryCard.tsx # Carte d'itinéraire
├── types/                # Types TypeScript
│   └── travel.ts         # Types pour les voyages
└── lib/                  # Utilitaires
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
