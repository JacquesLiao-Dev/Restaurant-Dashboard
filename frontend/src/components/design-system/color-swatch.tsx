import { TokenCard } from "@/components/design-system/token-card";

type ColorSwatchProps = {
  title: string;
  token: string;
  value: string;
  usage: string;
  className: string;
};

export function ColorSwatch({ className, title, token, usage, value }: ColorSwatchProps) {
  return (
    <TokenCard
      preview={<div className={`h-28 rounded-lg shadow-soft ${className}`} />}
      title={title}
      token={token}
      usage={usage}
      value={value}
    />
  );
}
