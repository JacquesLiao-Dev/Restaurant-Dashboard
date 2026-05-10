/* eslint-disable jsx-a11y/aria-proptypes */
"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { buildFieldDescriptionIds, FieldHint, FieldLabel, FieldShell, fieldControlStyles } from "@/components/ui/field";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils/cn";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export interface SelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "value" | "defaultValue" | "onChange"> {
  label: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
  containerClassName?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      containerClassName,
      defaultValue,
      disabled,
      error,
      hint,
      id,
      label,
      name,
      onValueChange,
      options,
      placeholder = "Selectionner une option",
      required,
      value,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    const hintId = hint ? `${selectId}-hint` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const selectedValue = value ?? internalValue;
    const selectedOption = options.find((option) => option.value === selectedValue);

    function handleValueChange(nextValue: string) {
      if (value === undefined) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    }

    return (
      <FieldShell className={containerClassName}>
        <FieldLabel htmlFor={selectId} label={label} required={required} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-describedby={buildFieldDescriptionIds(hintId, errorId)}
              className={cn(
                fieldControlStyles,
                "relative items-center justify-between text-left pr-11",
                error ? "border-error focus-visible:ring-error" : "",
                className,
              )}
              disabled={disabled}
              id={selectId}
              ref={ref}
              type="button"
              {...props}
            >
              <span className={cn("min-w-0 flex-1 truncate leading-none", !selectedOption ? "text-muted-foreground" : "")}>
                {selectedOption?.label ?? placeholder}
              </span>
              <ChevronDown aria-hidden="true" className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
            <DropdownMenuRadioGroup onValueChange={handleValueChange} value={selectedValue}>
              {options.map((option) => (
                <DropdownMenuRadioItem disabled={option.disabled} key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <input name={name} required={required} type="hidden" value={selectedValue} />
        <FieldHint error={error} errorId={errorId} hint={hint} hintId={hintId} />
      </FieldShell>
    );
  },
);

Select.displayName = "Select";
