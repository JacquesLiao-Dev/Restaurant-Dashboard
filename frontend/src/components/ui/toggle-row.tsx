import { Switch } from "@/components/ui/switch";
import { InsetCard } from "@/components/ui/inset-card";
import { cn } from "@/lib/utils/cn";

type ToggleRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export function ToggleRow({
  checked,
  className,
  description,
  disabled,
  onCheckedChange,
  title,
}: ToggleRowProps) {
  return (
    <InsetCard className={cn("flex items-center justify-between gap-4", className)} density="compact" tone="subtle">
      <div>
        <p className="text-label text-foreground">{title}</p>
        <p className="text-body-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} disabled={disabled} onCheckedChange={onCheckedChange} />
    </InsetCard>
  );
}
