import type { RuleItem, VariantItem } from "@/lib/design-system/types";

export const buttonVariants: VariantItem[] = [
  { name: "Primaire", value: "primary", usage: "A reserver aux actions principales d'une zone ou d'un parcours." },
  { name: "Secondaire", value: "secondary", usage: "Pour les actions utiles mais non dominantes." },
  {
    name: "Outline",
    value: "outline",
    usage: "Pour proposer une alternative visible sans voler la priorite du CTA principal.",
  },
  { name: "Ghost", value: "ghost", usage: "Pour les actions discretes dans les listes, toolbars ou menus secondaires." },
  { name: "Danger", value: "danger", usage: "Uniquement pour les actions destructives, irreversibles ou sensibles." },
];

export const badgeVariants: VariantItem[] = [
  { name: "Par defaut", value: "default", usage: "Statut actif ou information contextuelle standard." },
  { name: "Succes", value: "success", usage: "Disponibilite, validation ou evolution positive." },
  { name: "Alerte", value: "warning", usage: "Attention moderee, verification ou tension operationnelle." },
  { name: "Erreur", value: "error", usage: "Indisponibilite, incident ou echec." },
  { name: "Info", value: "info", usage: "Aide, statut neutre ou retour d'information sans criticite." },
  { name: "Neutre", value: "neutral", usage: "Categorie, segment ou metadonnees sans valence forte." },
];

export const componentPrinciples: RuleItem[] = [
  {
    title: "Tokens avant exceptions",
    description: "Les composants doivent consommer les tokens de couleur, taille, radius et ombre avant d'introduire une nouvelle valeur.",
  },
  {
    title: "Un composant, plusieurs états",
    description: "Chaque composant de base doit gerer au minimum hover, focus, disabled et, si pertinent, loading ou error.",
  },
  {
    title: "Documentation exploitable",
    description: "La page design system documente les usages et ne se contente pas d'exposer des captures de composants.",
  },
];
