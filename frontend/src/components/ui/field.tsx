import * as React from "react";

import { cn } from "@/lib/utils/cn";

export const fieldControlStyles =
  "flex h-11 w-full rounded-sm border border-input bg-white px-4 text-sm text-foreground shadow-inset transition duration-base ease-expressive placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:bg-muted/45 disabled:text-muted-foreground";

type FieldShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function FieldShell({ children, className }: FieldShellProps) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

type FieldLabelProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
};

export function FieldLabel({ htmlFor, label, required }: FieldLabelProps) {
  return (
    <label className="block text-label text-foreground" htmlFor={htmlFor}>
      {label}
      {required ? <span className="ml-1 text-error">*</span> : null}
    </label>
  );
}

type FieldHintProps = {
  hint?: string;
  error?: string;
  hintId?: string;
  errorId?: string;
};

export function FieldHint({ hint, error, hintId, errorId }: FieldHintProps) {
  return (
    <>
      {hint ? (
        <p className="text-body-sm text-muted-foreground" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="text-body-sm font-medium text-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}

export function buildFieldDescriptionIds(hintId?: string, errorId?: string) {
  return [hintId, errorId].filter(Boolean).join(" ") || undefined;
}
