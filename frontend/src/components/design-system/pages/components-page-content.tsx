import { RefreshCcw } from "lucide-react";

import {
  ButtonsShowcase,
  DialogsShowcase,
  DropdownsShowcase,
  FormFieldsShowcase,
  SidebarShowcase,
  TablesListsShowcase,
  TabsShowcase,
  TopbarShowcase,
  TooltipsShowcase,
} from "@/components/design-system/component-library-demos";
import { ComponentPreview } from "@/components/design-system/component-preview";
import { ToastDemo } from "@/components/design-system/interaction-demos";
import { SectionHeader } from "@/components/design-system/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Loader } from "@/components/ui/loader";
import { Skeleton } from "@/components/ui/skeleton";
import { badgeVariants, buttonVariants } from "@/lib/design-system";

export function ComponentsPageContent() {
  return (
    <div className="page-shell space-y-space-32">
      <SectionHeader
        description="La bibliothèque ci-dessous constitue la base UI du dashboard. Chaque composant réutilise les tokens, expose ses états essentiels et prépare les futurs écrans métier."
        eyebrow="Composants"
        title="Bibliothèque de composants"
      />

      <div className="space-y-6 xl:columns-2 xl:gap-6 xl:space-y-0">
        <ComponentPreview
          description="Les boutons couvrent les variantes produit, les tailles et tous les états à prévoir dans les flux du dashboard."
          guidelines={buttonVariants.map((item) => `${item.name} : ${item.usage}`)}
          preview={<ButtonsShowcase />}
          title="Buttons"
        />

        <ComponentPreview
          description="Les badges servent aux statuts, à la disponibilité ou aux informations contextuelles discrètes."
          guidelines={badgeVariants.map((item) => `${item.name} : ${item.usage}`)}
          preview={
            <div className="flex flex-wrap gap-3">
              <Badge>Par défaut</Badge>
              <Badge variant="secondary">Secondaire</Badge>
              <Badge variant="success">Succès</Badge>
              <Badge variant="warning">Alerte</Badge>
              <Badge variant="error">Erreur</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="neutral">Neutre</Badge>
            </div>
          }
          title="Badges"
        />

        <ComponentPreview
          description="Les cards doivent rester cohérentes en padding, élévation et hiérarchie, quel que soit l'écran."
          preview={
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Card par défaut</CardTitle>
                  <CardDescription>Surface standard du dashboard.</CardDescription>
                </CardHeader>
              </Card>
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Card elevated</CardTitle>
                  <CardDescription>Convient aux panneaux plus structurants.</CardDescription>
                </CardHeader>
              </Card>
              <Card variant="interactive">
                <CardHeader>
                  <CardTitle>Card interactive</CardTitle>
                  <CardDescription>Pour une ligne cliquable ou un groupe actionnable.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="p-4" variant="metric">
                <p className="text-body-sm text-muted-foreground">Chiffre d’affaires du jour</p>
                <p className="mt-3 text-h2 text-foreground">€ 4 280</p>
              </Card>
            </div>
          }
          title="Cards"
        />

        <ComponentPreview
          description="Les champs de formulaire exposent labels, aides, erreurs, désactivation et hiérarchie de lecture."
          guidelines={[
            "Toujours afficher un label visible et un message d'erreur compréhensible.",
            "Garder une hauteur stable entre input, select et textarea.",
            "Le placeholder complète le champ, il ne remplace jamais le label.",
          ]}
          preview={<FormFieldsShowcase />}
          title="Champs de formulaire"
        />

        <ComponentPreview
          description="Les dropdowns et selects personnalisés gardent une apparence cohérente et des interactions maîtrisées."
          guidelines={[
            "Réserver un menu d'actions aux opérations secondaires ou contextuelles.",
            "Utiliser un select pour choisir une valeur unique parmi une liste stable.",
            "Préserver une zone cliquable confortable et un focus visible.",
          ]}
          preview={<DropdownsShowcase />}
          title="Dropdowns et selects"
        />

        <ComponentPreview
          description="Les modales et dialogs doivent rester réservés aux tâches courtes, confirmations sensibles ou formulaires compacts."
          guidelines={[
            "Toujours afficher un titre, une description et des actions explicites.",
            "Prévoir un bouton Annuler et une fermeture par la touche Échap.",
            "Ne pas empiler plusieurs modales dans un même flux.",
          ]}
          preview={<DialogsShowcase />}
          title="Modals et dialogs"
        />

        <ComponentPreview
          description="La sidebar structure les sections principales, les sous-rubriques et les raccourcis persistants du dashboard."
          guidelines={[
            "Conserver une hiérarchie stable entre groupe parent et sous-pages.",
            "Afficher l'état actif sans dépendre uniquement du hover.",
            "Réserver le bas de sidebar à un scope ou une aide utile.",
          ]}
          preview={<SidebarShowcase />}
          title="Sidebar"
        />

        <ComponentPreview
          description="Le topbar rappelle le contexte courant et regroupe les actions globales sans alourdir la lecture."
          guidelines={[
            "Limiter les actions visibles aux raccourcis réellement globaux.",
            "Garder le titre courant lisible même sur mobile.",
            "Éviter les blocs décoratifs inutiles dans cet espace.",
          ]}
          preview={<TopbarShowcase />}
          title="Topbar"
        />

        <ComponentPreview
          description="Les tables et listes montrent comment présenter des données denses sans perdre en lisibilité ni en responsive."
          guidelines={[
            "Sur mobile, prévoir un fallback carte ou un overflow maîtrisé.",
            "Le header doit rester explicite et stable.",
            "Ne jamais exposer une table vide sans explication.",
          ]}
          preview={<TablesListsShowcase />}
          title="Tables et listes"
        />

        <ComponentPreview
          description="Les tabs servent à basculer entre vues proches sans casser le contexte de lecture de la page."
          guidelines={[
            "Limiter le nombre d'onglets visibles simultanément.",
            "Éviter les tabs si l'ordre de lecture est strict ou séquentiel.",
            "Le libellé de l'onglet doit rester court et explicite.",
          ]}
          preview={<TabsShowcase />}
          title="Tabs"
        />

        <ComponentPreview
          description="Les tooltips apportent une aide courte et complémentaire sur des actions ou icônes déjà compréhensibles."
          guidelines={[
            "Ne jamais cacher une information critique uniquement dans un tooltip.",
            "Réserver le tooltip aux aides brèves ou labels d'icônes.",
            "Préserver l'accessibilité clavier et le focus visible.",
          ]}
          preview={<TooltipsShowcase />}
          title="Tooltips"
        />

        <ComponentPreview
          description="Les toasts fournissent un feedback court après mutation sans casser le contexte de travail."
          guidelines={[
            "Utiliser un message bref, centré sur le résultat.",
            "Ne pas utiliser un toast pour expliquer une erreur complexe.",
            "Préférer succès, erreur, alerte ou info selon la criticité.",
          ]}
          preview={<ToastDemo />}
          title="Toasts"
        />

        <ComponentPreview
          description="Les skeletons et loaders aident à gérer l'attente sans figer l'utilisateur sur une interface vide."
          preview={
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                <Skeleton className="h-28 rounded-lg" />
                <Skeleton className="h-28 rounded-lg" />
                <Skeleton className="h-28 rounded-lg" />
              </div>
              <Loader label="Chargement d'une liste de commandes" />
            </div>
          }
          title="Skeletons et loaders"
        />

        <ComponentPreview
          description="Un empty state doit être compréhensible, rassurant et proposer une prochaine action claire si elle existe."
          preview={
            <EmptyState
              action={<Button>Ajouter un premier client</Button>}
              description="Ajoutez votre premier client pour commencer à suivre l'activité et la fidélité."
              title="Aucun client pour le moment"
            />
          }
          title="Empty state"
        />

        <ComponentPreview
          description="Un error state ne montre jamais un message technique brut. Il explique le problème et propose une issue."
          preview={
            <ErrorState
              action={
                <Button variant="outline">
                  <RefreshCcw className="h-4 w-4" />
                  Réessayer
                </Button>
              }
              description="Impossible de récupérer les clients pour le moment. Vérifiez la connexion puis relancez le chargement."
              title="Le chargement a échoué"
            />
          }
          title="Error state"
        />
      </div>
    </div>
  );
}
