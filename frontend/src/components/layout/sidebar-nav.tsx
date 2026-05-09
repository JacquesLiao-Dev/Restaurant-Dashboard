"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { NavigationItem } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";

type SidebarNavProps = {
  items: NavigationItem[];
  pathname: string;
  onNavigate?: () => void;
  onSelectPath?: (href: string) => void;
  navigationMode?: "link" | "button";
  className?: string;
};

function isItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SidebarNav({
  className,
  items,
  navigationMode = "link",
  onNavigate,
  onSelectPath,
  pathname,
}: SidebarNavProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      items.map((item) => [
        item.href,
        item.children?.some((child) => isItemActive(pathname, child.href)) ?? false,
      ]),
    ),
  );

  useEffect(() => {
    setOpenGroups((current) => {
      const next = { ...current };

      for (const item of items) {
        if (item.children?.some((child) => isItemActive(pathname, child.href))) {
          next[item.href] = true;
        }
      }

      return next;
    });
  }, [items, pathname]);

  function toggleGroup(href: string) {
    setOpenGroups((current) => ({
      ...current,
      [href]: !current[href],
    }));
  }

  function handleSelect(href: string) {
    onSelectPath?.(href);
    onNavigate?.();
  }

  return (
    <nav className={cn("space-y-1", className)}>
      {items.map((item) => {
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
                    active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                  onClick={() => toggleGroup(item.href)}
                  type="button"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight
                    className={cn("h-4 w-4 opacity-80 transition duration-base ease-expressive", expanded ? "rotate-90" : "")}
                  />
                </button>

                <div
                  className={cn(
                    "ml-5 overflow-hidden border-l pl-4 transition-[max-height,opacity] duration-base ease-expressive",
                    expanded ? "max-h-96 border-primary/20 opacity-100" : "pointer-events-none max-h-0 border-primary/10 opacity-0",
                  )}
                  id={`${item.label}-children`}
                >
                  <div className="space-y-1 py-2">
                    {item.children.map((child) => {
                      const childActive = isItemActive(pathname, child.href);
                      const itemClasses = cn(
                        "block w-full rounded-md border px-3 py-2.5 text-left text-body-sm transition duration-base ease-expressive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        childActive
                          ? "border-primary/20 bg-primary/12 font-semibold text-primary"
                          : "border-transparent text-foreground/80 hover:border-primary/15 hover:bg-primary/10 hover:text-primary",
                      );

                      return navigationMode === "button" ? (
                        <button
                          aria-current={childActive ? "page" : undefined}
                          className={itemClasses}
                          key={child.href}
                          onClick={() => handleSelect(child.href)}
                          type="button"
                        >
                          {child.label}
                        </button>
                      ) : (
                        <Link
                          aria-current={childActive ? "page" : undefined}
                          className={itemClasses}
                          href={child.href}
                          key={child.href}
                          onClick={onNavigate}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : navigationMode === "button" ? (
              <button
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-medium transition duration-base ease-expressive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
                onClick={() => handleSelect(item.href)}
                type="button"
              >
                <item.icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
              </button>
            ) : (
              <Link
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition duration-base ease-expressive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
                href={item.href}
                onClick={onNavigate}
              >
                <item.icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
