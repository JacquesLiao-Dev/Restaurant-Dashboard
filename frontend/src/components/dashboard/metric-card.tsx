import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

type MetricCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  tone?: "default" | "accent" | "success";
  className?: string;
  trend?: {
    change: number | null;
    label: string;
  };
};

export function MetricCard({
  className,
  icon: Icon,
  title,
  tone = "default",
  trend,
  value,
}: MetricCardProps) {
  const roundedTrend =
    trend && trend.change !== null ? Number(trend.change.toFixed(1)) : trend?.change ?? null;
  const isPositiveTrend = roundedTrend === null ? null : roundedTrend >= 0;

  return (
    <Card
      className={cn(
        "p-5",
        tone === "accent" ? "bg-gradient-to-br from-white via-white to-accent/70" : "",
        tone === "success" ? "bg-gradient-to-br from-white via-white to-success/10" : "",
        className,
      )}
      variant="default"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-body-sm text-muted-foreground">{title}</p>
          <p className="text-h2 text-foreground">{value}</p>
        </div>
        <div className="rounded-full bg-accent p-3 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend ? (
        <div className="mt-4 flex items-center gap-2 text-body-sm">
          {roundedTrend === null ? (
            <span className="text-muted-foreground">{trend.label}</span>
          ) : (
            <>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium",
                  isPositiveTrend
                    ? "bg-success/12 text-success"
                    : "bg-error/10 text-error",
                )}
              >
                {isPositiveTrend ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {roundedTrend > 0 ? "+" : ""}
                {roundedTrend} %
              </span>
              <span className="text-muted-foreground">{trend.label}</span>
            </>
          )}
        </div>
      ) : null}
    </Card>
  );
}
