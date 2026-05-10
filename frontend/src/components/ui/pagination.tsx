import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type PaginationProps = {
  page: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
  className?: string;
};

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}

function getVisiblePages(page: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages] as const;
  }

  if (page >= totalPages - 3) {
    return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages] as const;
}

export function Pagination({
  className,
  itemLabel = "éléments",
  onPageChange,
  page,
  pageSize,
  totalItems,
  totalPages,
}: PaginationProps) {
  const safePage = clampPage(page, totalPages);
  const rangeStart = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const rangeEnd = Math.min(safePage * pageSize, totalItems);
  const visiblePages = getVisiblePages(safePage, totalPages);

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between", className)}>
      <p className="text-body-sm text-muted-foreground">
        Affichage de <span className="font-medium text-foreground">{rangeStart}</span> à{" "}
        <span className="font-medium text-foreground">{rangeEnd}</span> sur{" "}
        <span className="font-medium text-foreground">{totalItems}</span> {itemLabel}.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          disabled={safePage === 1}
          onClick={() => onPageChange(safePage - 1)}
          size="sm"
          variant="outline"
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Button>

        {visiblePages.map((entry, index) =>
          entry === "ellipsis" ? (
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground"
              key={`ellipsis-${index}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </span>
          ) : (
            <Button
              aria-current={entry === safePage ? "page" : undefined}
              className={entry === safePage ? "pointer-events-none" : undefined}
              key={entry}
              onClick={() => onPageChange(entry)}
              size="sm"
              variant={entry === safePage ? "default" : "outline"}
            >
              {entry}
            </Button>
          ),
        )}

        <Button
          disabled={safePage === totalPages}
          onClick={() => onPageChange(safePage + 1)}
          size="sm"
          variant="outline"
        >
          Suivant
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
