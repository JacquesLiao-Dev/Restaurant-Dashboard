import * as React from "react";

import { cn } from "@/lib/utils/cn";

const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto rounded-lg border border-border/70 bg-white">
      <table className={cn("w-full caption-bottom text-sm", className)} ref={ref} {...props} />
    </div>
  ),
);

Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead className={cn("bg-background/75", className)} ref={ref} {...props} />,
);

TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody className={cn("[&_tr:last-child]:border-0", className)} ref={ref} {...props} />,
);

TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      className={cn(
        "border-b border-border/60 transition duration-fast ease-expressive hover:bg-accent/45",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      className={cn("h-12 px-4 text-left text-label text-muted-foreground [&:has([role=checkbox])]:pr-0", className)}
      ref={ref}
      {...props}
    />
  ),
);

TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td className={cn("px-4 py-4 align-middle text-body-sm [&:has([role=checkbox])]:pr-0", className)} ref={ref} {...props} />
  ),
);

TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption className={cn("mt-4 text-body-sm text-muted-foreground", className)} ref={ref} {...props} />
  ),
);

TableCaption.displayName = "TableCaption";

export { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow };
