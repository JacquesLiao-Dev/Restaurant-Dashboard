import Image from "next/image";

import { cn } from "@/lib/utils/cn";

type MenuItemImageProps = {
  src: string | null;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes: string;
  contain?: boolean;
};

export function MenuItemImage({
  alt,
  className,
  contain = false,
  imageClassName,
  sizes,
  src,
}: MenuItemImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border/70 bg-[radial-gradient(circle_at_top_left,_rgba(235,102,57,0.16),_transparent_52%),linear-gradient(135deg,_rgba(245,235,214,0.95),_rgba(255,250,246,0.92))]",
        className,
      )}
    >
      {src ? (
        <Image
          alt={alt}
          className={cn(contain ? "object-contain p-2" : "object-cover object-center", imageClassName)}
          fill
          sizes={sizes}
          src={src}
          unoptimized={src.startsWith("data:")}
        />
      ) : (
        <div className="flex h-full items-center justify-center px-4 text-center">
          <p className="text-body-sm font-medium text-muted-foreground">Aperçu visuel du plat</p>
        </div>
      )}
    </div>
  );
}
