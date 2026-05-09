"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { getPageTitle } from "@/lib/constants/navigation";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <div className="min-h-screen">
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} pathname={pathname} />
      <div className="lg:pl-72">
        <Topbar onOpenMenu={() => setMobileMenuOpen(true)} title={title} />
        <main>{children}</main>
      </div>
    </div>
  );
}
