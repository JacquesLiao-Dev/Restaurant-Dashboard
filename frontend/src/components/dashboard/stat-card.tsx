import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

type StatCardProps = {
  label: string;
  value: ReactNode;
  helper?: ReactNode;
  className?: string;
};

export function StatCard({ className, helper, label, value }: StatCardProps) {
  return (
    <Card className={cn("p-5", className)}>
      <p className="text-body-sm text-muted-foreground">{label}</p>
      <p className="mt-3 text-h2 text-foreground">{value}</p>
      {helper ? <p className="mt-2 text-body-sm text-muted-foreground">{helper}</p> : null}
    </Card>
  );
}
