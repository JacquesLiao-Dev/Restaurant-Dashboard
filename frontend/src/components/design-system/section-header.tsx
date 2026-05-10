import { cn } from "@/lib/utils/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  id?: string;
  className?: string;
};

export function SectionHeader({ className, description, eyebrow, id, title }: SectionHeaderProps) {
  return (
    <div className={cn("space-y-3 scroll-mt-28", className)} id={id}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <div className="space-y-2">
        <h2 className="text-h2 text-foreground">{title}</h2>
        <p className="max-w-3xl text-body text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
