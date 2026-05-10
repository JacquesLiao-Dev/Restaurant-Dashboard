"use client";

import { useState } from "react";

import { SidebarPanel } from "@/components/layout/sidebar-panel";
import { navigationItems } from "@/lib/constants/navigation";

export function SidebarShowcase() {
  const [pathname, setPathname] = useState("/design-system/components");

  return (
    <div className="overflow-hidden rounded-lg border border-border/70 bg-[#fffaf6]">
      <SidebarPanel
        className="flex min-h-[430px] flex-col bg-[#fffaf6] p-5"
        description="Navigation latérale persistante pour les sections et sous-rubriques."
        eyebrow="Restaurant SaaS"
        footer={
          <div className="rounded-lg border border-primary/10 bg-primary/5 p-4">
            <p className="text-label text-foreground">Zone persistante</p>
            <p className="mt-1 text-body-sm text-muted-foreground">
              Réserver le bas de sidebar à un scope, une aide courte ou une action globale secondaire.
            </p>
          </div>
        }
        items={navigationItems}
        navigationMode="button"
        onSelectPath={setPathname}
        pathname={pathname}
        title="Système de design"
      />
    </div>
  );
}
