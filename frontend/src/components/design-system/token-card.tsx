import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type TokenCardProps = {
  title: string;
  token: string;
  value: string;
  usage: string;
  preview?: ReactNode;
  className?: string;
};

export function TokenCard({ className, preview, title, token, usage, value }: TokenCardProps) {
  return (
    <div className={cn("rounded-lg border border-border/70 bg-white p-4 shadow-soft", className)}>
      {preview ? <div className="mb-4">{preview}</div> : null}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-label text-foreground">{title}</p>
            <p className="text-caption text-muted-foreground">{token}</p>
          </div>
          <p className="text-caption text-muted-foreground">{value}</p>
        </div>
        <p className="text-body-sm text-muted-foreground">{usage}</p>
      </div>
    </div>
  );
}
