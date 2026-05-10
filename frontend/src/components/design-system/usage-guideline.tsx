import { cn } from "@/lib/utils/cn";

type UsageGuidelineProps = {
  title: string;
  description: string;
  className?: string;
};

export function UsageGuideline({ className, description, title }: UsageGuidelineProps) {
  return (
    <div className={cn("rounded-lg border border-border/70 bg-background/70 p-5", className)}>
      <p className="text-label text-foreground">{title}</p>
      <p className="mt-2 text-body-sm text-muted-foreground">{description}</p>
    </div>
  );
}
