# Restaurant Dashboard

Application fullstack de test technique autour d’un dashboard SaaS restaurant.

Le projet est organisé en monorepo :

- `frontend/` : Next.js, TypeScript, Tailwind CSS
- `backend/` : Node.js, Express, TypeScript

Le frontend sert actuellement de fondation UI avec un design system documenté.  
Le backend expose une API légère avec des données mockées en mémoire pour simuler les domaines `customers`, `orders`, `menu` et `settings`.

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

## État actuel du projet

### Inclus

- shell dashboard responsive
- design system documenté
- bibliothèque de composants UI
- routes backend mockées
- endpoints REST de base

### Non inclus pour l’instant

- authentification
- persistance PostgreSQL branchée
- pages métier finales `Home`, `CRM`, `Orders`, `Menu`, `Settings`

## Note PostgreSQL

La stack cible du test inclut PostgreSQL, mais cette itération du projet utilise volontairement des données mockées en mémoire côté backend.

Conséquence :

- aucun serveur PostgreSQL n’est requis pour lancer le projet aujourd’hui
- la documentation ci-dessous permet de lancer et tester l’application telle qu’elle existe réellement

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

Depuis la racine :

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
- design system : `http://localhost:3000/design-system`
- backend : `http://localhost:4000`
- healthcheck : `http://localhost:4000/api/health`

## Vérifications utiles

```bash
npm run typecheck
npm run lint
npm run check
```

## Build de production

### Frontend

```bash
npm run build -w frontend
npm run start -w frontend
```

### Backend

```bash
npm run build -w backend
npm run start -w backend
```

### Build complet

```bash
npm run build
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

## Structure

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
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   │   ├── constants/
│   │   │   ├── design-system/
│   │   │   └── utils/
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
- composants : buttons, badges, cards, inputs, selects, dropdowns, dialogs, tables, tabs, tooltips
- patterns UX : loading, empty, error, confirmation, feedback
- accessibilité : focus visible, labels, contraste, navigation clavier
- règles d’usage : choix des patterns, gouvernance et réutilisation

## Points d’attention

- lancer `npm install` depuis la racine, pas depuis `frontend/` ou `backend/`
- le backend actuel est mocké, donc aucun setup PostgreSQL n’est nécessaire pour tester le projet
- le build frontend utilise `next/font/google` pour `Manrope`, donc une connexion réseau peut être nécessaire lors du build
