"use client";

import { SidebarPanel } from "@/components/layout/sidebar-panel";
import { navigationItems } from "@/lib/constants/navigation";
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
        <SidebarPanel
          eyebrow="Restaurant SaaS"
          items={navigationItems}
          onClose={onClose}
          onNavigate={onClose}
          pathname={pathname}
          showCloseButton
          title="Système de design"
        />
      </aside>
    </>
  );
}
