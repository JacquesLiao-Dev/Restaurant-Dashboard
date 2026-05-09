import type { RuleItem, SectionLink, TokenItem } from "@/lib/design-system/types";

export const sectionLinks: SectionLink[] = [
  {
    id: "introduction",
    href: "/design-system/introduction",
    label: "Introduction",
    description: "Objectifs, principes et zones du système.",
  },
  {
    id: "foundations",
    href: "/design-system/foundations",
    label: "Fondations",
    description: "Tokens, typographie, mouvement et layout.",
  },
  {
    id: "components",
    href: "/design-system/components",
    label: "Composants",
    description: "Composants UI et variantes réutilisables.",
  },
  {
    id: "ux-patterns",
    href: "/design-system/ux-patterns",
    label: "Patterns UX",
    description: "Comportements de chargement, vide, erreur et feedback.",
  },
  {
    id: "accessibility",
    href: "/design-system/accessibility",
    label: "Accessibilité",
    description: "Focus visible, labels, contraste et clavier.",
  },
  {
    id: "usage-guidelines",
    href: "/design-system/usage-guidelines",
    label: "Règles d'usage",
    description: "Quand utiliser chaque pattern sans ambiguite.",
  },
];

export const semanticColors: TokenItem[] = [
  {
    name: "Primaire",
    token: "--primary",
    value: "hsl(14 74% 56%)",
    usage: "Actions principales, CTA, liens d'accent et actions a fort impact.",
    className: "bg-primary text-primary-foreground",
  },
  {
    name: "Secondaire",
    token: "--secondary",
    value: "hsl(153 18% 34%)",
    usage: "Actions secondaires, navigation persistante et zones calmes.",
    className: "bg-secondary text-secondary-foreground",
  },
  {
    name: "Accent",
    token: "--accent",
    value: "hsl(41 67% 92%)",
    usage: "Surfaces chaudes, highlights premium et contextes d'accompagnement.",
    className: "bg-accent text-accent-foreground",
  },
  {
    name: "Succes",
    token: "--success",
    value: "hsl(148 48% 36%)",
    usage: "Validation, disponibilite produit, progression positive et confirmations.",
    className: "bg-success text-white",
  },
  {
    name: "Alerte",
    token: "--warning",
    value: "hsl(35 91% 54%)",
    usage: "Attention moderee, stock bas, verification ou blocage non critique.",
    className: "bg-warning text-white",
  },
  {
    name: "Erreur",
    token: "--error",
    value: "hsl(356 70% 48%)",
    usage: "Suppression, incident, indisponibilite et erreurs bloquantes.",
    className: "bg-error text-white",
  },
  {
    name: "Information",
    token: "--info",
    value: "hsl(203 78% 50%)",
    usage: "Aide contextuelle, notification neutre et contenu explicatif.",
    className: "bg-info text-white",
  },
];

export const neutralColors: TokenItem[] = [
  {
    name: "Neutral 50",
    token: "neutral.50",
    value: "#FCFAF7",
    usage: "Fond global, surfaces tres legeres et zones de respiration.",
    className: "bg-neutral-50 text-neutral-900",
  },
  {
    name: "Neutral 100",
    token: "neutral.100",
    value: "#F5EEE7",
    usage: "Cartes claires, arriere-plans doux et separations subtiles.",
    className: "bg-neutral-100 text-neutral-900",
  },
  {
    name: "Neutral 200",
    token: "neutral.200",
    value: "#E8DBCF",
    usage: "Bordures, separateurs et fonds de zones secondaires.",
    className: "bg-neutral-200 text-neutral-900",
  },
  {
    name: "Neutral 400",
    token: "neutral.400",
    value: "#B79A86",
    usage: "Texte secondaire, icones discretes et états desactives lisibles.",
    className: "bg-neutral-400 text-neutral-900",
  },
  {
    name: "Neutral 600",
    token: "neutral.600",
    value: "#71584A",
    usage: "Texte intermediaire et contrastes moderes sur fonds clairs.",
    className: "bg-neutral-600 text-white",
  },
  {
    name: "Neutral 800",
    token: "neutral.800",
    value: "#342822",
    usage: "Texte principal, titres et contrastes forts.",
    className: "bg-neutral-800 text-white",
  },
];

export const spacingTokens: TokenItem[] = [
  { name: "4", token: "space-4", value: "0.25rem", usage: "Micro spacing, separateurs fins, decalages d'icones." },
  { name: "8", token: "space-8", value: "0.5rem", usage: "Groupes compacts, badges, aides textuelles courtes." },
  {
    name: "12",
    token: "space-12",
    value: "0.75rem",
    usage: "Espacement compact entre label, helper et champ associe.",
  },
  {
    name: "16",
    token: "space-16",
    value: "1rem",
    usage: "Padding standard mobile et composition par defaut des composants.",
  },
  { name: "24", token: "space-24", value: "1.5rem", usage: "Cartes, colonnes internes et sections compactes." },
  {
    name: "32",
    token: "space-32",
    value: "2rem",
    usage: "Respirations de sections et mises en page desktop courantes.",
  },
  {
    name: "40",
    token: "space-40",
    value: "2.5rem",
    usage: "Separations plus genereuses entre groupes de contenu riches.",
  },
  {
    name: "48",
    token: "space-48",
    value: "3rem",
    usage: "Bandeaux d'introduction et blocs de documentation importants.",
  },
  {
    name: "64",
    token: "space-64",
    value: "4rem",
    usage: "Grandes respirations desktop et transitions entre grandes sections.",
  },
];

export const radiusTokens: TokenItem[] = [
  { name: "sm", token: "--radius-sm", value: "0.75rem", usage: "Inputs, badges et petits conteneurs fonctionnels." },
  { name: "md", token: "--radius-md", value: "1rem", usage: "Boutons, petites cards et blocs d'actions standards." },
  { name: "lg", token: "--radius-lg", value: "1.5rem", usage: "Cards principales, panneaux riches et surfaces premium." },
  { name: "xl", token: "radius.xl", value: "2rem", usage: "Panels hero, overlays et presentation marketing interne." },
  { name: "full", token: "rounded-full", value: "9999px", usage: "Pills, statuts tres compacts et marqueurs circulaires." },
];

export const shadowTokens: TokenItem[] = [
  {
    name: "soft",
    token: "shadow-soft",
    value: "0 10px 30px rgba(38, 28, 23, 0.08)",
    usage: "Cartes standards et surfaces legerement surelevees.",
  },
  {
    name: "panel",
    token: "shadow-panel",
    value: "0 14px 42px rgba(38, 28, 23, 0.08)",
    usage: "Sidebar, panneaux persistants et sections structurantes.",
  },
  {
    name: "floating",
    token: "shadow-floating",
    value: "0 18px 50px rgba(38, 28, 23, 0.14)",
    usage: "Modals, dropdowns et contenus flottants a forte priorite.",
  },
  {
    name: "focus",
    token: "shadow-focus",
    value: "0 0 0 4px hsl(var(--ring) / 0.18)",
    usage: "Focus visible accessible sur les elements interactifs.",
  },
];

export const typographyTokens: TokenItem[] = [
  { name: "display", token: "text-display", value: "56px / 700", usage: "Messages d'introduction et contenus de reference majeurs." },
  { name: "h1", token: "text-h1", value: "36px / 700", usage: "Entrees de page et titres de sections fortes." },
  { name: "h2", token: "text-h2", value: "30px / 700", usage: "Sous-sections majeures et groupes de contenu importants." },
  { name: "h3", token: "text-h3", value: "24px / 600", usage: "Titres de cartes, panneaux et blocs detaillees." },
  { name: "body", token: "text-body", value: "16px / 400", usage: "Texte courant, descriptions et contenu principal." },
  { name: "body-sm", token: "text-body-sm", value: "14px / 400", usage: "Descriptions compactes et texte secondaire encore lisible." },
  { name: "caption", token: "text-caption", value: "12px / 500", usage: "Metadonnees, aide concise et contexte discret." },
  { name: "label", token: "text-label", value: "14px / 600", usage: "Labels de champ, navigation et micro-interface." },
];

export const motionTokens: TokenItem[] = [
  { name: "fast", token: "duration-fast", value: "160ms", usage: "Hover, focus et feedback immediats." },
  { name: "base", token: "duration-base", value: "240ms", usage: "Transitions standards de composants et changements d'etat." },
  { name: "slow", token: "duration-slow", value: "360ms", usage: "Apparitions plus visibles, overlays et panneaux." },
  { name: "standard", token: "ease-standard", value: "ease-out", usage: "Interactions courantes qui doivent rester sobres et rapides." },
  {
    name: "expressive",
    token: "ease-expressive",
    value: "cubic-bezier(0.22, 1, 0.36, 1)",
    usage: "Mouvements de panneaux, reveal de sections et modalites premium.",
  },
];

export const layoutRules: RuleItem[] = [
  {
    title: "Shell principal",
    description: "Le contenu reste centre dans une largeur maximale de 1440px avec une sidebar fixe sur desktop.",
  },
  {
    title: "Progression responsive",
    description: "Le systeme passe d'une colonne mobile a deux ou trois colonnes sans duplication de contenu.",
  },
  {
    title: "Gouttieres de page",
    description: "Les marges laterales montent progressivement de 1rem a 2rem pour garder une lecture confortable.",
  },
  {
    title: "Sections scannables",
    description: "Chaque groupe de contenu doit tenir dans des cartes ou sections clairement delimitees et titrees.",
  },
];

export const readabilityRules: RuleItem[] = [
  {
    title: "Contraste stable",
    description: "Le texte principal utilise toujours un contraste fort. Le gris secondaire n'est jamais la seule information critique.",
  },
  {
    title: "Hiérarchie simple",
    description: "Les niveaux typographiques restent limites pour eviter les variations locales difficiles a maintenir.",
  },
  {
    title: "Respiration",
    description: "Les sections longues utilisent des stacks reguliers plutot que des espacements arbitraires disperses.",
  },
  {
    title: "Couleur avec intention",
    description: "Une couleur semantique n'apparait que si son role produit est clair et non purement decoratif.",
  },
];
