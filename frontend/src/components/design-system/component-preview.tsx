import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

type ComponentPreviewProps = {
  title: string;
  description: string;
  preview: ReactNode;
  guidelines?: string[];
  className?: string;
};

export function ComponentPreview({
  className,
  description,
  guidelines,
  preview,
  title,
}: ComponentPreviewProps) {
  return (
    <Card className={cn("overflow-hidden border-white/80 bg-white/92", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-lg border border-border/60 bg-background/55 p-4 backdrop-blur-sm">{preview}</div>
        {guidelines?.length ? (
          <div className="space-y-2">
            {guidelines.map((guideline) => (
              <div
                key={guideline}
                className="rounded-md border border-border/60 bg-background/55 px-3 py-2 text-body-sm text-muted-foreground"
              >
                {guideline}
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
