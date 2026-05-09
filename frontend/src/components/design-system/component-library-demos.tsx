import {
  Filter,
  HelpCircle,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";

import { DeleteConfirmationDemo, ModalDemo } from "@/components/design-system/interaction-demos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const customerRows = [
  {
    name: "Camille Laurent",
    email: "camille@demo.fr",
    status: "VIP",
    volume: "14 commandes",
  },
  {
    name: "Noah Bernard",
    email: "noah@demo.fr",
    status: "Actif",
    volume: "8 commandes",
  },
];

const orderCards = [
  {
    id: "#CMD-1042",
    customer: "Camille Laurent",
    amount: "38 €",
    status: "Prête",
  },
  {
    id: "#CMD-1043",
    customer: "Noah Bernard",
    amount: "24 €",
    status: "En préparation",
  },
];

export function ButtonsShowcase() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <Button>Primaire</Button>
        <Button variant="secondary">Secondaire</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>

      <div className="space-y-3">
        <p className="text-label text-foreground">Tailles</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Petit</Button>
          <Button size="md">Moyen</Button>
          <Button size="lg">Grand</Button>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-label text-foreground">États</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Par défaut</Button>
          <Button className="shadow-focus">Focus visible</Button>
          <Button className="translate-y-px brightness-95">Actif</Button>
          <Button disabled>Désactivé</Button>
          <Button loading loadingText="Enregistrement">
            Chargement
          </Button>
        </div>
      </div>
    </div>
  );
}

export function FormFieldsShowcase() {
  return (
    <div className="grid gap-4">
      <Input hint="Utiliser un libellé compréhensible par l'utilisateur." label="Nom du client" placeholder="Camille Laurent" />
      <div className="grid gap-4 md:grid-cols-2">
        <Input error="Cette adresse e-mail semble invalide." label="Adresse e-mail" placeholder="camille@demo.fr" type="email" />
        <Select
          defaultValue="vip"
          hint="Chaque champ de sélection garde un label visible."
          label="Statut client"
          options={[
            { label: "Nouveau", value: "new" },
            { label: "Actif", value: "active" },
            { label: "VIP", value: "vip" },
          ]}
        />
      </div>
      <Textarea
        disabled
        hint="Exemple d'état désactivé avec contraste lisible."
        label="Note interne"
        placeholder="Observations visibles uniquement par l'équipe."
      />
    </div>
  );
}

export function DropdownsShowcase() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <Select
        defaultValue="ready"
        hint="Le select réutilise un menu personnalisé cohérent avec le dashboard."
        label="Statut de commande"
        options={[
          { label: "En attente", value: "pending" },
          { label: "En préparation", value: "preparing" },
          { label: "Prête", value: "ready" },
          { label: "Livrée", value: "delivered" },
        ]}
      />

      <div className="space-y-2">
        <p className="text-label text-foreground">Menu d’actions</p>
        <div className="flex flex-wrap items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Actions rapides
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Client</DropdownMenuLabel>
              <DropdownMenuItem>
                <Users className="h-4 w-4 text-muted-foreground" />
                Voir la fiche
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 text-muted-foreground" />
                Modifier
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                Passer VIP
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-error focus:text-error data-[highlighted]:bg-error/8">
                <Trash2 className="h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label="Plus d'options" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Search className="h-4 w-4 text-muted-foreground" />
                Rechercher
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Filter className="h-4 w-4 text-muted-foreground" />
                Filtrer
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings2 className="h-4 w-4 text-muted-foreground" />
                Personnaliser
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export function DialogsShowcase() {
  return (
    <div className="flex flex-wrap gap-3">
      <ModalDemo />
      <DeleteConfirmationDemo />
    </div>
  );
}

export function TablesListsShowcase() {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-border/70">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Exemple de table utilisée pour le CRM ou les commandes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerRows.map((row) => (
                <TableRow key={row.email}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Badge variant={row.status === "VIP" ? "warning" : "success"}>{row.status}</Badge>
                  </TableCell>
                  <TableCell>{row.volume}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {orderCards.map((order) => (
          <Card className="p-4" key={order.id} variant="interactive">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-label text-foreground">{order.id}</p>
                <p className="mt-1 text-body-sm text-muted-foreground">{order.customer}</p>
              </div>
              <Badge variant={order.status === "Prête" ? "success" : "warning"}>{order.status}</Badge>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-body-sm text-muted-foreground">Montant estimé</p>
              <p className="text-body font-semibold text-foreground">{order.amount}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function NavigationShowcase() {
  return (
    <div className="overflow-hidden rounded-lg border border-border/70 bg-[#fffaf6]">
      <div className="grid min-h-[320px] lg:grid-cols-[220px_1fr]">
        <aside className="flex flex-col gap-5 border-b border-white/80 bg-[#fffaf6] p-4 md:border-b-0 md:border-r">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Restaurant SaaS</p>
            <h3 className="mt-2 text-h3 text-foreground">Fondation UI</h3>
            <p className="mt-1 text-body-sm text-muted-foreground">Shell principal pour la navigation et le contexte de page.</p>
          </div>

          <div className="space-y-2">
            <div className="rounded-md bg-primary px-3 py-2.5 text-body-sm font-semibold text-primary-foreground shadow-soft">
              Système
            </div>
            <div className="ml-4 space-y-1 border-l border-primary/15 pl-3">
              <div className="rounded-md border border-primary/20 bg-primary/12 px-3 py-2 text-body-sm font-semibold text-primary">
                Composants
              </div>
              <div className="rounded-md px-3 py-2 text-body-sm text-foreground/80">Fondations</div>
              <div className="rounded-md px-3 py-2 text-body-sm text-foreground/80">Accessibilité</div>
            </div>
          </div>

          <div className="mt-auto rounded-lg border border-primary/10 bg-primary/5 p-3">
            <p className="text-label text-foreground">Bloc latéral</p>
            <p className="mt-1 text-body-sm text-muted-foreground">
              Réserver cet espace à une aide courte, un scope ou une action persistante.
            </p>
          </div>
        </aside>

        <div className="min-w-0 bg-background/90">
          <div className="flex flex-col gap-3 border-b border-white/70 bg-background/80 px-4 py-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">samedi 9 mai</p>
              <p className="text-body font-semibold text-foreground">Composants</p>
            </div>
            <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
              <Button aria-label="Rechercher" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2">
            <Card className="p-4" variant="metric">
              <p className="text-body-sm text-muted-foreground">Commandes du jour</p>
              <p className="mt-3 text-h2 text-foreground">42</p>
            </Card>
            <Card className="p-4" variant="default">
              <p className="text-body-sm text-muted-foreground">Panier moyen</p>
              <p className="mt-3 text-h2 text-foreground">28 €</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TabsShowcase() {
  return (
    <Tabs className="space-y-4" defaultValue="overview">
      <TabsList className="w-full md:w-auto">
        <TabsTrigger value="overview">Vue d’ensemble</TabsTrigger>
        <TabsTrigger value="activity">Activité</TabsTrigger>
        <TabsTrigger value="settings">Réglages</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="success">Synchronisé</Badge>
          <p>Utiliser les tabs pour alterner entre vues proches sans recharger toute la page.</p>
        </div>
      </TabsContent>
      <TabsContent value="activity">
        <div className="space-y-2">
          <p className="text-label text-foreground">Activité récente</p>
          <p>Les sections restent dans le même contexte visuel et conservent le focus clavier.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="space-y-2">
          <p className="text-label text-foreground">Préférences rapides</p>
          <p>Éviter les tabs si l’ordre de lecture doit rester strict ou si le contenu est trop éloigné.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export function TooltipsShowcase() {
  return (
    <TooltipProvider delayDuration={120}>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button aria-label="Ajouter un client" size="icon" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ajouter un client</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button aria-label="Afficher les filtres" size="icon" variant="ghost">
                <Filter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Afficher les filtres avancés</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button aria-label="Aide contextuelle" size="icon" variant="secondary">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Utiliser un tooltip pour une aide courte, jamais pour une consigne critique.</TooltipContent>
          </Tooltip>
        </div>

        <div className="rounded-lg border border-border/70 bg-white p-4 text-body-sm text-muted-foreground">
          Les tooltips complètent l’interface, mais l’action doit rester compréhensible même sans survol.
        </div>
      </div>
    </TooltipProvider>
  );
}
