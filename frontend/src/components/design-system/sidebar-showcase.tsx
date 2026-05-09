"use client";

import { useState } from "react";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { navigationItems } from "@/lib/constants/navigation";

export function SidebarShowcase() {
  const [pathname, setPathname] = useState("/design-system/components");

  return (
    <div className="overflow-hidden rounded-lg border border-border/70 bg-[#fffaf6]">
      <aside className="flex min-h-[430px] flex-col gap-6 bg-[#fffaf6] p-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Restaurant SaaS</p>
          <h3 className="mt-2 text-h3 text-foreground">Système de design</h3>
          <p className="mt-1 text-body-sm text-muted-foreground">
            Navigation latérale persistante pour les sections et sous-rubriques.
          </p>
        </div>

        <SidebarNav
          items={navigationItems}
          navigationMode="button"
          onSelectPath={setPathname}
          pathname={pathname}
        />

        <div className="mt-auto rounded-lg border border-primary/10 bg-primary/5 p-4">
          <p className="text-label text-foreground">Zone persistante</p>
          <p className="mt-1 text-body-sm text-muted-foreground">
            Réserver le bas de sidebar à un scope, une aide courte ou une action globale secondaire.
          </p>
        </div>
      </aside>
    </div>
  );
}
