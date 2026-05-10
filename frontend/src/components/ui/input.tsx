import * as React from "react";

import { buildFieldDescriptionIds, FieldHint, FieldLabel, FieldShell, fieldControlStyles } from "@/components/ui/field";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, error, hint, id, label, required, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <FieldShell className={containerClassName}>
        <FieldLabel htmlFor={inputId} label={label} required={required} />
        <input
          aria-describedby={buildFieldDescriptionIds(hintId, errorId)}
          aria-invalid={Boolean(error)}
          className={cn(fieldControlStyles, error ? "border-error focus-visible:ring-error" : "", className)}
          id={inputId}
          ref={ref}
          required={required}
          {...props}
        />
        <FieldHint error={error} errorId={errorId} hint={hint} hintId={hintId} />
      </FieldShell>
    );
  },
);

Input.displayName = "Input";
