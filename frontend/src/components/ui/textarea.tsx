import * as React from "react";

import { buildFieldDescriptionIds, FieldHint, FieldLabel, FieldShell, fieldControlStyles } from "@/components/ui/field";
import { cn } from "@/lib/utils/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, error, hint, id, label, required, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const hintId = hint ? `${textareaId}-hint` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;

    return (
      <FieldShell className={containerClassName}>
        <FieldLabel htmlFor={textareaId} label={label} required={required} />
        <textarea
          aria-describedby={buildFieldDescriptionIds(hintId, errorId)}
          aria-invalid={Boolean(error)}
          className={cn(
            fieldControlStyles,
            "min-h-[120px] resize-none py-3",
            error ? "border-error focus-visible:ring-error" : "",
            className,
          )}
          id={textareaId}
          ref={ref}
          required={required}
          {...props}
        />
        <FieldHint error={error} errorId={errorId} hint={hint} hintId={hintId} />
      </FieldShell>
    );
  },
);

Textarea.displayName = "Textarea";
