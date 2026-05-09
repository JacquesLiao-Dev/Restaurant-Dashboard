import { SectionHeader } from "@/components/design-system/section-header";
import { UsageGuideline } from "@/components/design-system/usage-guideline";
import { usageGuidelineGroups } from "@/lib/design-system";

export function UsageGuidelinesPageContent() {
  return (
    <div className="page-shell space-y-space-32">
      <SectionHeader
        description="Ces règles donnent le cadre d&apos;usage du système pour eviter les detournements frequents quand le dashboard s&apos;agrandira."
        eyebrow="Règles d&apos;usage"
        title="Guidelines d&apos;utilisation"
      />

      <div className="space-y-space-32">
        {usageGuidelineGroups.map((group) => (
          <section className="space-y-6" key={group.title}>
            <div className="space-y-2">
              <h3 className="text-h3 text-foreground">{group.title}</h3>
              <p className="max-w-3xl text-body-sm text-muted-foreground">{group.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item) => (
                <UsageGuideline className="h-full" description={item.description} key={item.title} title={item.title} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
