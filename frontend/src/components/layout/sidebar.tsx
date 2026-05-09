"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";

import { navigationItems } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
};

function isItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ isOpen, onClose, pathname }: SidebarProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      navigationItems.map((item) => [
        item.href,
        item.children?.some((child) => isItemActive(pathname, child.href)) ?? false,
      ]),
    ),
  );

  useEffect(() => {
    setOpenGroups((current) => {
      const next = { ...current };

      for (const item of navigationItems) {
        if (item.children?.some((child) => isItemActive(pathname, child.href))) {
          next[item.href] = true;
        }
      }

      return next;
    });
  }, [pathname]);

  function toggleGroup(href: string) {
    setOpenGroups((current) => ({
      ...current,
      [href]: !current[href],
    }));
  }

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
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/70 bg-[#fffaf6]/95 px-5 py-6 shadow-panel backdrop-blur transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Restaurant SaaS</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">Fondation UI</h1>
            <p className="mt-1 text-body-sm text-muted-foreground">
              Documentation, composants et standards reutilisables pour le dashboard.
            </p>
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

        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const active = isItemActive(pathname, item.href);
            const expanded = openGroups[item.href] ?? false;

            return (
              <div key={item.href} className="space-y-2">
                {item.children?.length ? (
                  <>
                    <button
                      aria-controls={`${item.label}-children`}
                      aria-expanded={expanded}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-medium transition duration-base ease-expressive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        active
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                      onClick={() => toggleGroup(item.href)}
                      type="button"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.label}</span>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 opacity-80 transition duration-base ease-expressive",
                          expanded ? "rotate-90" : "",
                        )}
                      />
                    </button>

                    <div
                      className={cn(
                        "ml-5 overflow-hidden border-l pl-4 transition-[max-height,opacity] duration-base ease-expressive",
                        expanded
                          ? "max-h-96 border-primary/20 opacity-100"
                          : "pointer-events-none max-h-0 border-primary/10 opacity-0",
                      )}
                      id={`${item.label}-children`}
                    >
                      <div className="space-y-1 py-2">
                        {item.children.map((child) => {
                          const childActive = isItemActive(pathname, child.href);

                          return (
                            <Link
                              aria-current={childActive ? "page" : undefined}
                              className={cn(
                                "block rounded-md border px-3 py-2.5 text-body-sm transition duration-base ease-expressive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                childActive
                                  ? "border-primary/20 bg-primary/12 font-semibold text-primary shadow-soft"
                                  : "border-transparent text-foreground/80 hover:border-primary/15 hover:bg-primary/10 hover:text-primary",
                              )}
                              href={child.href}
                              key={child.href}
                              onClick={onClose}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    aria-current={active ? "page" : undefined}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition duration-base ease-expressive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      active
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mt-auto rounded-lg border border-primary/10 bg-primary/5 p-4">
          <p className="text-sm font-semibold">Scope actuel</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Le frontend est volontairement recentré sur la UI library pour verrouiller les tokens et composants.
          </p>
        </div>
      </aside>
    </>
  );
}
