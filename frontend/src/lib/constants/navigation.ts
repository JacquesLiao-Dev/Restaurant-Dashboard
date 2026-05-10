import type { LucideIcon } from "lucide-react";
import { House, Palette, Settings2, ShoppingBag, Soup, Users } from "lucide-react";
import { sectionLinks } from "@/lib/design-system";

export type NavigationChild = {
  href: string;
  label: string;
};

export type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  children?: NavigationChild[];
};

export const navigationItems: NavigationItem[] = [
  {
    href: "/home",
    label: "Accueil",
    icon: House,
  },
  {
    href: "/customers",
    label: "CRM",
    icon: Users,
  },
  {
    href: "/orders",
    label: "Commandes",
    icon: ShoppingBag,
  },
  {
    href: "/menu",
    label: "Menu",
    icon: Soup,
  },
  {
    href: "/settings",
    label: "Paramètres",
    icon: Settings2,
  },
  {
    href: "/design-system",
    label: "Système",
    icon: Palette,
    children: sectionLinks.map((section) => ({
      href: section.href,
      label: section.label,
    })),
  },
];

export function getPageTitle(pathname: string) {
  for (const item of navigationItems) {
    if (item.children) {
      const child = item.children.find((entry) => pathname === entry.href || pathname.startsWith(`${entry.href}/`));

      if (child) {
        return child.label;
      }
    }

    if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
      return item.label;
    }
  }

  return "Dashboard";
}
