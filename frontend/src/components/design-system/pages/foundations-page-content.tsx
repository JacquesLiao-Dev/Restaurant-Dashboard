import { ColorSwatch } from "@/components/design-system/color-swatch";
import { SectionHeader } from "@/components/design-system/section-header";
import { TokenCard } from "@/components/design-system/token-card";
import { UsageGuideline } from "@/components/design-system/usage-guideline";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  layoutRules,
  motionTokens,
  neutralColors,
  radiusTokens,
  semanticColors,
  shadowTokens,
  spacingTokens,
  typographyTokens,
} from "@/lib/design-system";

export function FoundationsPageContent() {
  return (
    <div className="page-shell space-y-space-32">
      <SectionHeader
        description="Les foundations couvrent les tokens de couleur, l&apos;espacement, la typographie, le mouvement et les regles de layout. Ce sont les references a reutiliser partout."
        eyebrow="Fondations"
        title="Fondations visuelles"
      />

      <Card className="border-white/80 bg-white/90">
        <CardHeader>
          <CardTitle>Couleurs sémantiques</CardTitle>
          <CardDescription>
            Une palette chaude et premium, avec un role clair pour chaque couleur forte afin d&apos;eviter les interfaces
            trop bruyantes.
          </CardDescription>
        </CardHeader>
        <CardContent className="token-grid">
          {semanticColors.map((color) => (
            <ColorSwatch
              className={color.className ?? "bg-primary text-primary-foreground"}
              key={color.name}
              title={color.name}
              token={color.token}
              usage={color.usage}
              value={color.value}
            />
          ))}
        </CardContent>
      </Card>

      <Card className="border-white/80 bg-white/90">
        <CardHeader>
          <CardTitle>Neutres</CardTitle>
          <CardDescription>
            L&apos;echelle de neutres gere les fonds, bordures et niveaux de texte sans introduire de nouvelles couleurs
            arbitraires.
          </CardDescription>
        </CardHeader>
        <CardContent className="token-grid">
          {neutralColors.map((color) => (
            <ColorSwatch
              className={color.className ?? "bg-neutral-100 text-neutral-900"}
              key={color.name}
              title={color.name}
              token={color.token}
              usage={color.usage}
              value={color.value}
            />
          ))}
        </CardContent>
      </Card>

      <div className="section-grid">
        <Card className="border-white/80 bg-white/90">
          <CardHeader>
            <CardTitle>Espacements</CardTitle>
            <CardDescription>
              L&apos;echelle reste volontairement simple pour stabiliser les marges et paddings sur toutes les pages.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {spacingTokens.map((token) => (
              <TokenCard key={token.name} title={token.name} token={token.token} usage={token.usage} value={token.value} />
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/80 bg-white/90">
          <CardHeader>
            <CardTitle>Rayons et élévations</CardTitle>
            <CardDescription>
              Les surfaces arrondies et les elevations restent coherentes pour garder l&apos;identite premium du produit.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {radiusTokens.map((token) => (
              <TokenCard
                key={token.name}
                title={`Radius ${token.name}`}
                token={token.token}
                usage={token.usage}
                value={token.value}
              />
            ))}

            {shadowTokens.map((token) => (
              <TokenCard
                key={token.name}
                preview={<div className="h-16 rounded-lg border border-border/70 bg-white" style={{ boxShadow: token.value }} />}
                title={`Shadow ${token.name}`}
                token={token.token}
                usage={token.usage}
                value={token.value}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/80 bg-white/90">
        <CardHeader>
          <CardTitle>Typographie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border/70 bg-background/70 p-5">
            <p className="text-label text-foreground">Famille principale</p>
            <p className="mt-2 text-body text-muted-foreground">
              Manrope sert de police sans-serif principale. Elle reste lisible sur dashboard et conserve une
              personnalite plus premium qu&apos;une stack systeme trop neutre.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {typographyTokens.map((token) => (
              <TokenCard
                key={token.name}
                preview={
                  <div className={`${token.token} text-foreground`}>
                    {token.name === "body-sm" ? "Texte secondaire" : `Aperçu ${token.name}`}
                  </div>
                }
                title={token.name}
                token={token.token}
                usage={token.usage}
                value={token.value}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="section-grid">
        <Card className="border-white/80 bg-white/90">
          <CardHeader>
            <CardTitle>Mouvements et transitions</CardTitle>
            <CardDescription>
              Les animations sont utilitaires : elles guident les transitions, sans devenir un effet decoratif permanent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {motionTokens.map((token) => (
              <TokenCard key={token.name} title={token.name} token={token.token} usage={token.usage} value={token.value} />
            ))}
            <div className="grid gap-3 md:grid-cols-3">
              <button className="motion-demo motion-demo-fade" type="button">
                <p className="text-label">Fondu</p>
              </button>
              <button className="motion-demo motion-demo-slide" type="button">
                <p className="text-label">Glissement</p>
              </button>
              <button className="motion-demo motion-demo-pulse" type="button">
                <p className="text-label">Pulse doux</p>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/80 bg-white/90">
          <CardHeader>
            <CardTitle>Layout responsive</CardTitle>
            <CardDescription>
              Le systeme vise une progression simple desktop, tablette, mobile sans casser la lecture ni dupliquer les
              composants.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {layoutRules.map((rule) => (
              <UsageGuideline description={rule.description} key={rule.title} title={rule.title} />
            ))}
            <div className="grid gap-3 md:grid-cols-3">
              <UsageGuideline description="1 colonne, actions tactiles lisibles, pas de scroll horizontal global." title="Mobile" />
              <UsageGuideline description="2 colonnes si utile, sidebar reduite, rythme plus aere." title="Tablette" />
              <UsageGuideline description="Sidebar fixe, largeurs maitrisees, grilles de 2 a 4 colonnes selon le contexte." title="Desktop" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
