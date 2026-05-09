import { SectionHeader } from "@/components/design-system/section-header";
import { UsageGuideline } from "@/components/design-system/usage-guideline";
import { DeleteConfirmationDemo } from "@/components/design-system/interaction-demos";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { readabilityRules, uxPatternItems } from "@/lib/design-system";

export function UxPatternsPageContent() {
  return (
    <div className="page-shell space-y-space-32">
      <SectionHeader
        description="Les patterns UX cadrent les comportements reussis du produit : chargement, vide, erreur, confirmation et feedback de mutation."
        eyebrow="Patterns UX"
        title="Comportements d&apos;usage"
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-white/80 bg-white/90">
          <CardHeader>
            <CardTitle>Bibliothèque de patterns</CardTitle>
            <CardDescription>Chaque pattern indique quand il doit apparaitre dans le dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {uxPatternItems.map((item) => (
              <UsageGuideline description={item.description} key={item.title} title={item.title} />
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/80 bg-white/90">
          <CardHeader>
            <CardTitle>Flow create / edit</CardTitle>
            <CardDescription>Le meme squelette de formulaire doit couvrir creation et edition pour rester lisible.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <UsageGuideline description="Titre clair, contexte et CTA principal unique." title="1. Entrer dans le flux" />
              <UsageGuideline description="Labels visibles, helper text, validation et focus visibles." title="2. Remplir le formulaire" />
              <UsageGuideline description="Feedback de chargement sur l&apos;action principale." title="3. Soumettre" />
              <UsageGuideline description="Toast de succes ou message d&apos;erreur comprehensible." title="4. Retour utilisateur" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button loading loadingText="Enregistrement">Enregistrer</Button>
              <DeleteConfirmationDemo />
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/80 bg-white/90 xl:col-span-2">
          <CardHeader>
            <CardTitle>Règles de lisibilité</CardTitle>
            <CardDescription>
              Ces garde-fous evitent qu&apos;un futur ecran produit devienne trop dense, trop colore ou trop fragile.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {readabilityRules.map((rule) => (
              <UsageGuideline description={rule.description} key={rule.title} title={rule.title} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
