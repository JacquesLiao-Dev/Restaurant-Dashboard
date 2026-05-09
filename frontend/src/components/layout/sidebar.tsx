"use client";

import { X } from "lucide-react";

import { navigationItems } from "@/lib/constants/navigation";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { cn } from "@/lib/utils/cn";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
};

export function Sidebar({ isOpen, onClose, pathname }: SidebarProps) {
  return (
    <>
      <div
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm transition lg:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border/60 bg-[#fffaf6] px-5 py-6 transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Restaurant SaaS</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">Système de design</h1>
          </div>

          <button
            type="button"
            aria-label="Fermer le menu"
            className="rounded-md p-2 text-muted-foreground transition hover:bg-accent lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <SidebarNav items={navigationItems} onNavigate={onClose} pathname={pathname} />
      </aside>
    </>
  );
}
