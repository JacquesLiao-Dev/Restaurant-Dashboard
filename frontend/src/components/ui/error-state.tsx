import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils/cn";

type ErrorStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: LucideIcon;
  className?: string;
};

export function ErrorState({
  action,
  className,
  description,
  icon: Icon = AlertTriangle,
  title,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 rounded-lg border border-error/20 bg-error/5 p-6 text-left",
        className,
      )}
      role="alert"
    >
      <div className="rounded-full bg-white p-3 text-error shadow-soft">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>
      <div className="space-y-2">
        <h3 className="text-h3 text-foreground">{title}</h3>
        <p className="max-w-md text-body-sm text-muted-foreground">{description}</p>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
