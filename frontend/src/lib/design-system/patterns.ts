import type { RuleItem } from "@/lib/design-system/types";

export const uxPatternItems: RuleItem[] = [
  {
    title: "Chargement",
    description: "Preferer des skeletons structures plutot qu'un spinner unique si la page a une forte densite d'information.",
  },
  {
    title: "Etat vide",
    description: "Expliquer l'absence de donnees et proposer une action primaire claire si l'utilisateur peut debloquer la situation.",
  },
  {
    title: "Etat d'erreur",
    description: "Montrer un message comprehensible, jamais brut, avec un bouton de reprise ou de rechargement.",
  },
  {
    title: "Confirmation de suppression",
    description: "Demander confirmation uniquement sur les actions irreversibles ou a fort impact.",
  },
  {
    title: "Creation / edition",
    description: "Utiliser les memes champs et la meme structure de formulaire pour creer et modifier afin de reduire la charge cognitive.",
  },
  {
    title: "Feedback apres action",
    description: "Une mutation doit renvoyer un toast court ou une confirmation inline, sans laisser l'utilisateur dans le doute.",
  },
];

export const accessibilityItems: RuleItem[] = [
  {
    title: "Focus visible",
    description: "Tous les boutons, liens et champs affichent un ring visible sans dependre du hover.",
  },
  {
    title: "Contraste lisible",
    description: "Les textes secondaires restent lisibles sur fond clair et les cartes colorees gardent un contraste suffisant.",
  },
  {
    title: "Labels et aides",
    description: "Chaque champ de formulaire porte un label visible, un helper si necessaire et une erreur comprehensible.",
  },
  {
    title: "Navigation clavier",
    description: "Les modals, boutons, liens et listes doivent pouvoir etre parcourus et actives sans souris.",
  },
  {
    title: "Erreurs compréhensibles",
    description: "Les messages d'erreur parlent metier et orientent vers l'action suivante au lieu d'exposer un message technique brut.",
  },
];
