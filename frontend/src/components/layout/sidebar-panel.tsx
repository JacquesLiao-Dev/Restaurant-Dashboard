"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";

import type { NavigationItem } from "@/lib/constants/navigation";
import { SidebarNav } from "@/components/layout/sidebar-nav";

type SidebarPanelProps = {
  eyebrow: string;
  title: string;
  items: NavigationItem[];
  pathname: string;
  description?: string;
  footer?: ReactNode;
  navigationMode?: "link" | "button";
  onClose?: () => void;
  onNavigate?: () => void;
  onSelectPath?: (href: string) => void;
  showCloseButton?: boolean;
  className?: string;
};

export function SidebarPanel({
  className,
  description,
  eyebrow,
  footer,
  items,
  navigationMode = "link",
  onClose,
  onNavigate,
  onSelectPath,
  pathname,
  showCloseButton = false,
  title,
}: SidebarPanelProps) {
  return (
    <div className={className}>
      <div className="mb-8 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
          <h1
            className="mt-2 max-w-full text-2xl font-semibold tracking-tight [overflow-wrap:anywhere]"
            title={title}
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-1 max-w-full text-body-sm text-muted-foreground [overflow-wrap:anywhere]">
              {description}
            </p>
          ) : null}
        </div>

        {showCloseButton && onClose ? (
          <button
            type="button"
            aria-label="Fermer le menu"
            className="rounded-md p-2 text-muted-foreground transition hover:bg-accent lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <SidebarNav
        items={items}
        navigationMode={navigationMode}
        onNavigate={onNavigate}
        onSelectPath={onSelectPath}
        pathname={pathname}
      />

      {footer ? <div className="mt-auto">{footer}</div> : null}
    </div>
  );
}
