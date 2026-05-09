import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { LoaderCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition duration-base ease-expressive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        primary: "interactive-solid bg-primary text-primary-foreground",
        default: "interactive-solid bg-primary text-primary-foreground",
        secondary: "interactive-solid bg-secondary text-secondary-foreground",
        outline: "border border-border bg-white text-foreground hover:-translate-y-0.5 hover:border-primary/25 hover:bg-accent/70 hover:shadow-soft",
        ghost: "text-foreground hover:bg-accent/80",
        danger: "interactive-danger border border-error/30 bg-background text-error shadow-soft focus-visible:ring-error",
      },
      size: {
        sm: "h-10 px-3.5 text-sm",
        md: "h-11 px-4",
        lg: "h-12 px-6 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, asChild = false, loading = false, loadingText, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
        {loading && loadingText ? loadingText : children}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button };
