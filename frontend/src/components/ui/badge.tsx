import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex min-h-6 items-center rounded-full px-2.5 py-1 text-xs font-semibold transition duration-fast ease-expressive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary/12 text-primary",
        secondary: "bg-secondary/12 text-secondary",
        success: "bg-success/12 text-success",
        warning: "bg-warning/12 text-warning",
        error: "bg-error/12 text-error",
        danger: "bg-error/12 text-error",
        info: "bg-info/12 text-info",
        neutral: "bg-muted text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
