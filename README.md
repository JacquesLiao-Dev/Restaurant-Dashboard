# Restaurant Dashboard

Application fullstack de test technique autour d’un dashboard SaaS restaurant.

Le projet est organisé en monorepo :

- `frontend/` : Next.js, TypeScript, Tailwind CSS
- `backend/` : Node.js, Express, TypeScript

L’objectif de cette itération est de montrer :

- une UI premium et cohérente
- un design system documenté et réutilisable
- des pages métier crédibles
- une communication frontend/backend claire
- une structure lisible et maintenable

## Démo actuelle

Le projet contient aujourd’hui :

- `Home` : vue d’ensemble, métriques, graphiques interactifs, top menus, top clients
- `CRM` : liste clients, recherche, édition, création, suppression, pagination
- `Orders` : liste commandes, filtres, pagination, création de commande avec sélection d’items
- `Menu` : catalogue menu, création/édition/suppression, upload d’image locale
- `Settings` : informations restaurant, notifications, préférences, horaires
- `Design System` : fondations, composants, patterns UX, accessibilité, règles d’usage

## Important

La stack cible du brief inclut PostgreSQL.

Cette branche du projet utilise volontairement un backend **mocké en mémoire** pour prioriser :

- l’expérience produit
- la qualité UI
- la structure fullstack
- la rapidité d’exécution du test

Conséquences :

- aucun serveur PostgreSQL n’est nécessaire pour tester le projet
- les données API sont remises à zéro au redémarrage du backend
- les images uploadées côté menu sont enregistrées localement dans `frontend/public/images/menu`

## Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI primitives
- Sonner
- Lucide React

### Backend

- Node.js
- Express
- TypeScript
- Zod
- Pino

## Prérequis

- Node.js `>= 20.19.0`
- npm `>= 10`

Le repo contient un fichier [.nvmrc](./.nvmrc) :

```bash
nvm use
```

## Installation

Depuis la racine du projet :

```bash
npm install
```

Important :

- lancer `npm install` depuis la racine
- ne pas installer séparément dans `frontend/` ou `backend/`

## Variables d’environnement

### Frontend

Créer `frontend/.env` à partir de [frontend/.env.example](./frontend/.env.example) :

```bash
cp frontend/.env.example frontend/.env
```

Valeur attendue :

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Backend

Créer `backend/.env` à partir de [backend/.env.example](./backend/.env.example) :

```bash
cp backend/.env.example backend/.env
```

Valeurs attendues :

```env
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:3000
```

## Lancer le projet

### Frontend + backend ensemble

```bash
npm run dev
```

### Frontend seul

```bash
npm run dev:frontend
```

### Backend seul

```bash
npm run dev:backend
```

## URLs utiles

- frontend : `http://localhost:3000`
- home : `http://localhost:3000/home`
- crm : `http://localhost:3000/customers`
- orders : `http://localhost:3000/orders`
- menu : `http://localhost:3000/menu`
- settings : `http://localhost:3000/settings`
- design system : `http://localhost:3000/design-system`
- backend : `http://localhost:4000`
- healthcheck : `http://localhost:4000/api/health`

## Commandes utiles

### Typecheck + lint

```bash
npm run check
```

### Typecheck uniquement

```bash
npm run typecheck
```

### Lint uniquement

```bash
npm run lint
```

### Build complet

```bash
npm run build
```

### Build frontend

```bash
npm run build -w frontend
npm run start -w frontend
```

### Build backend

```bash
npm run build -w backend
npm run start -w backend
```

## Endpoints backend

### Health

- `GET /api/health`

### Customers

- `GET /api/customers`
- `GET /api/customers/:id`
- `POST /api/customers`
- `PUT /api/customers/:id`
- `DELETE /api/customers/:id`

### Orders

- `GET /api/orders`
- `GET /api/orders/:id`
- `POST /api/orders`
- `PUT /api/orders/:id/status`

### Menu

- `GET /api/menu`
- `GET /api/menu/:id`
- `POST /api/menu`
- `PUT /api/menu/:id`
- `DELETE /api/menu/:id`

### Settings

- `GET /api/settings`
- `PUT /api/settings`

## Structure du projet

```text
restaurant-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── customers/
│   │   │   ├── menu/
│   │   │   ├── orders/
│   │   │   └── settings/
│   │   ├── shared/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   │   └── images/
│   │       └── menu/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   ├── design-system/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── features/
│   │   │   ├── customers/
│   │   │   ├── home/
│   │   │   ├── menu/
│   │   │   ├── orders/
│   │   │   └── settings/
│   │   └── lib/
│   │       ├── api/
│   │       ├── constants/
│   │       ├── design-system/
│   │       └── utils/
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── scripts/
│   └── dev.mjs
└── package.json
```

## Design system

Le design system documenté couvre :

- fondations : couleurs, spacing, radius, shadows, typography, motion, layout
- composants : boutons, badges, cards, inputs, selects, dropdowns, dialogs, tables, pagination, tabs, tooltips, toasts
- composants dashboard : page header, metric cards, stat cards, inset cards, toggle rows, menu item image, charts
- patterns UX : loading, empty, error, confirmation, feedback
- accessibilité : focus visible, labels, contraste, navigation clavier
- règles d’usage : choix des patterns, gouvernance et réutilisation

## Suite possible

Si le projet devait être prolongé, les prochaines étapes naturelles seraient :

- brancher PostgreSQL réellement
- ajouter une couche de validation plus riche côté backend
- ajouter React Query ou équivalent pour gérer le cache serveur
- couvrir les flows critiques par tests
- ajouter une authentification simple et des rôles
