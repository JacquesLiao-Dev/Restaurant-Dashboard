"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

type TopbarProps = {
  onOpenMenu: () => void;
  title: string;
};

const topbarDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export function Topbar({ onOpenMenu, title }: TopbarProps) {
  const today = topbarDateFormatter.format(new Date());

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-background/75 backdrop-blur">
      <div className="page-shell flex items-center justify-between pb-4 pt-4">
        <div className="flex items-center gap-3">
          <Button aria-label="Ouvrir le menu" variant="ghost" size="icon" className="lg:hidden" onClick={onOpenMenu}>
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{today}</p>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          </div>
        </div>
      </div>
    </header>
  );
}
