import type { RuleGroup } from "@/lib/design-system/types";

export const usageGuidelineGroups: RuleGroup[] = [
  {
    title: "Actions et feedback",
    description: "Choisir le bon niveau d'action et le bon retour utilisateur sans brouiller la priorite visuelle.",
    items: [
      {
        title: "Couleur primaire",
        description: "La reserver aux CTA dominants d'une zone ou d'un parcours pour conserver son poids visuel sur l'ensemble du dashboard.",
      },
      {
        title: "Bouton danger",
        description: "L'utiliser uniquement pour les actions destructives, irreversibles ou fortement sensibles, jamais comme alternative stylistique au CTA principal.",
      },
      {
        title: "Modal ou dialog",
        description: "L'ouvrir pour confirmer une action sensible ou concentrer une tache courte sans faire quitter le contexte de la page.",
      },
      {
        title: "Toast",
        description: "L'afficher apres une mutation ou une sauvegarde pour confirmer rapidement un succes, une erreur ou une information utile.",
      },
      {
        title: "Tooltip",
        description: "L'ajouter pour une aide breve ou le label d'une icone, jamais pour une consigne critique ou une action indispensable a comprendre.",
      },
    ],
  },
  {
    title: "Navigation et lecture",
    description: "Structurer les parcours et la densite d'information avec le pattern le plus lisible selon le contexte.",
    items: [
      {
        title: "Champs de formulaire",
        description: "Reutiliser les champs de base avec label, aide et erreur visibles plutot que recreer une structure de formulaire locale pour chaque page.",
      },
      {
        title: "Select ou dropdown",
        description: "Utiliser un select pour choisir une valeur unique et stable dans un formulaire, et reserver le dropdown menu aux actions contextuelles secondaires.",
      },
      {
        title: "Tabs",
        description: "Les utiliser pour alterner entre vues proches dans un meme contexte. Les eviter si le contenu doit etre lu de facon sequentielle.",
      },
      {
        title: "Tables et listes",
        description: "Afficher une table lorsque la comparaison entre colonnes est utile. Sur petit ecran ou faible densite, preferer une liste de cartes.",
      },
      {
        title: "Etat vide",
        description: "Le montrer des qu'un module n'a pas encore de donnees afin d'expliquer la situation et proposer une action de demarrage si elle existe.",
      },
      {
        title: "Shell de navigation",
        description: "Confier a la sidebar les sections globales et au topbar le contexte courant ainsi que les actions transverses de la page.",
      },
    ],
  },
  {
    title: "Gouvernance du systeme",
    description: "Faire evoluer la bibliotheque sans multiplier les exceptions locales ni fragmenter les patterns.",
    items: [
      {
        title: "Reutiliser un composant existant",
        description: "Tout composant interactif doit reprendre les memes etats focus, disabled et loading afin d'eviter des comportements divergents d'une page a l'autre.",
      },
      {
        title: "Creer un nouveau token",
        description: "Une nouvelle valeur de couleur, d'ombre ou de rayon doit etre justifiee par un besoin produit reel, jamais par confort local.",
      },
      {
        title: "Extraire un pattern",
        description: "Si une meme structure commence a se repeter dans plusieurs vues, elle doit sortir vers un composant documente ou une section explicite du design system.",
      },
    ],
  },
];
