import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

import { cn } from "@/lib/utils/cn";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: LucideIcon;
  className?: string;
};

export function EmptyState({
  action,
  className,
  description,
  icon: Icon = Inbox,
  title,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 rounded-lg border border-dashed border-border bg-background/70 p-6 text-left",
        className,
      )}
    >
      <div className="rounded-full bg-accent p-3 text-primary">
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
