import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const insetCardVariants = cva("rounded-lg border", {
  variants: {
    tone: {
      default: "border-border/70 bg-background/60",
      subtle: "border-border/60 bg-background/50",
      solid: "border-border/70 bg-white",
      dashed: "border-dashed border-border/70 bg-background/50",
    },
    density: {
      default: "p-4",
      compact: "px-4 py-3",
      roomy: "p-5",
    },
  },
  defaultVariants: {
    tone: "default",
    density: "default",
  },
});

type InsetCardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof insetCardVariants>;

export const InsetCard = React.forwardRef<HTMLDivElement, InsetCardProps>(
  ({ className, density, tone, ...props }, ref) => (
    <div ref={ref} className={cn(insetCardVariants({ tone, density }), className)} {...props} />
  ),
);

InsetCard.displayName = "InsetCard";
