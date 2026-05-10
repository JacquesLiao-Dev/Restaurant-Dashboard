import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { UsageGuideline } from "@/components/design-system/usage-guideline";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { componentPrinciples, sectionLinks } from "@/lib/design-system";

export function IntroductionPageContent() {
  return (
    <div className="page-shell space-y-space-32">
      <Card className="border-white/80 bg-white/90" variant="elevated">
        <CardHeader className="space-y-4">
          <p className="eyebrow">Introduction</p>
          <div className="space-y-3">
            <CardTitle className="text-h1">Système de design</CardTitle>
            <CardDescription className="max-w-3xl text-body">
              Cette section documente les standards visuels, les composants UI et les patterns d&apos;usage qui serviront de
              fondation au dashboard restaurant.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {componentPrinciples.map((principle) => (
            <UsageGuideline description={principle.description} key={principle.title} title={principle.title} />
          ))}
        </CardContent>
      </Card>

      <Card className="border-white/80 bg-white/90">
        <CardHeader>
          <CardTitle>Arborescence documentaire</CardTitle>
          <CardDescription>
            Chaque categorie a maintenant sa propre page pour rendre la documentation plus legere et plus simple a
            parcourir.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sectionLinks.map((link) => (
            <Link
              className="group rounded-lg border border-border/70 bg-background/70 p-4 transition duration-base ease-expressive hover:border-primary/20 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href={link.href}
              key={link.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-label text-foreground">{link.label}</p>
                  <p className="mt-2 text-body-sm text-muted-foreground">{link.description}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
