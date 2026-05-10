import { ShieldCheck } from "lucide-react";

import { SectionHeader } from "@/components/design-system/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { accessibilityItems } from "@/lib/design-system";

export function AccessibilityPageContent() {
  return (
    <div className="page-shell space-y-space-32">
      <SectionHeader
        description="L&apos;accessibilite n&apos;est pas une section cosmetique. Elle doit etre pensee des composants de base jusqu&apos;aux messages de retour."
        eyebrow="Accessibilité"
        title="Accessibilité minimale"
      />

      <div className="section-grid">
        <Card className="border-white/80 bg-white/90">
          <CardHeader>
            <CardTitle>Checklist</CardTitle>
            <CardDescription>Base minimale inspiree des attentes d&apos;un produit SaaS exploitable.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {accessibilityItems.map((item) => (
              <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-background/70 p-4" key={item.title}>
                <ShieldCheck className="mt-0.5 h-4 w-4 text-success" />
                <div>
                  <p className="text-label text-foreground">{item.title}</p>
                  <p className="mt-1 text-body-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/80 bg-white/90">
          <CardHeader>
            <CardTitle>Exemples concrets</CardTitle>
            <CardDescription>Les patterns suivants montrent les bases a reutiliser dans les futurs formulaires.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Input hint="Le helper text apporte une information utile avant erreur." label="Nom du restaurant" placeholder="Le Quai Studio" />
            <Input
              error="Le numero de telephone est requis pour recevoir les notifications critiques."
              label="Telephone"
              placeholder="+33 1 45 67 89 10"
            />
            <div className="flex flex-wrap gap-3">
              <Button className="shadow-focus">Exemple de focus</Button>
              <Button disabled variant="secondary">
                Etat desactive
              </Button>
            </div>
            <div className="rounded-lg border border-border/70 bg-background/70 p-4 text-body-sm text-muted-foreground">
              La navigation clavier doit permettre d&apos;atteindre chaque lien, bouton, champ et modale sans dependre de la souris.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
