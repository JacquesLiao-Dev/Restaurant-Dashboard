import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils/cn";

type LoaderProps = {
  className?: string;
  label?: string;
};

export function Loader({ className, label = "Chargement" }: LoaderProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 text-body-sm text-muted-foreground", className)} role="status">
      <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin text-primary" />
      <span>{label}</span>
    </div>
  );
}
