export type SectionLink = {
  id: string;
  href: string;
  label: string;
  description: string;
};

export type TokenItem = {
  name: string;
  token: string;
  value: string;
  usage: string;
  className?: string;
};

export type RuleItem = {
  title: string;
  description: string;
};

export type RuleGroup = {
  title: string;
  description: string;
  items: RuleItem[];
};

export type VariantItem = {
  name: string;
  value: string;
  usage: string;
};
