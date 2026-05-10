import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type DashboardPageHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
  actions?: ReactNode;
  className?: string;
};

export function DashboardPageHeader({
  actions,
  className,
  description,
  eyebrow,
  title,
}: DashboardPageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between", className)}>
      <div className="space-y-3">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <div className="space-y-2">
          <h1 className="text-h2 text-foreground">{title}</h1>
          <p className="max-w-3xl text-body text-muted-foreground">{description}</p>
        </div>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
