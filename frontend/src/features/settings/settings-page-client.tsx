"use client";

import { useEffect, useState } from "react";
import { RefreshCcw, Save } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { getSettings, updateSettings } from "@/lib/api";
import { notify } from "@/lib/design-system/notify";
import type { RestaurantSettings } from "@/lib/api";
import { formatDateTime } from "@/lib/utils/format";

const timeOptions = Array.from({ length: 48 }, (_, index) => {
  const hours = String(Math.floor(index / 2)).padStart(2, "0");
  const minutes = index % 2 === 0 ? "00" : "30";
  const value = `${hours}:${minutes}`;

  return {
    label: value,
    value,
  };
});

export function SettingsPageClient() {
  const [initialSettings, setInitialSettings] = useState<RestaurantSettings | null>(null);
  const [draft, setDraft] = useState<RestaurantSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  async function loadSettings() {
    try {
      setLoading(true);
      setError(false);
      const settings = await getSettings();
      setInitialSettings(settings);
      setDraft(settings);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  async function handleSave() {
    if (!draft) {
      return;
    }

    try {
      setSaving(true);
      const updated = await updateSettings(draft);
      setInitialSettings(updated);
      setDraft(updated);
      window.dispatchEvent(new CustomEvent("restaurant-settings-updated", { detail: updated }));
      notify.success("Paramètres enregistrés", {
        description: "Les préférences du restaurant ont été mises à jour.",
      });
    } catch {
      notify.error("Enregistrement impossible", {
        description: "Les paramètres n’ont pas pu être sauvegardés.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="page-shell space-y-8">
        <DashboardPageHeader
          description="Chargement des paramètres restaurant, des horaires et des préférences de notifications."
          eyebrow="Settings"
          title="Paramètres"
        />
        <div className="grid gap-6 xl:grid-cols-2">
          <Skeleton className="h-[340px] rounded-lg" />
          <Skeleton className="h-[340px] rounded-lg" />
          <Skeleton className="h-[420px] rounded-lg xl:col-span-2" />
        </div>
      </div>
    );
  }

  if (error || !draft || !initialSettings) {
    return (
      <div className="page-shell">
        <ErrorState
          action={
            <Button onClick={loadSettings} variant="outline">
              <RefreshCcw className="h-4 w-4" />
              Réessayer
            </Button>
          }
          description="Impossible de récupérer les paramètres du restaurant."
          title="Le module Settings n’a pas pu être chargé"
        />
      </div>
    );
  }

  const isDirty = JSON.stringify(draft) !== JSON.stringify(initialSettings);

  return (
    <div className="page-shell space-y-8">
      <DashboardPageHeader
        actions={
          <>
            <Button
              disabled={!isDirty || saving}
              onClick={() => setDraft(initialSettings)}
              variant="ghost"
            >
              Réinitialiser
            </Button>
            <Button disabled={!isDirty} loading={saving} onClick={handleSave}>
              <Save className="h-4 w-4" />
              Enregistrer
            </Button>
          </>
        }
        description="Centralisez les informations du restaurant, les horaires, les notifications et les préférences d’affichage."
        eyebrow="Settings"
        title="Paramètres"
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-1">
            <h2 className="text-h3 text-foreground">Informations du restaurant</h2>
            <p className="text-body-sm text-muted-foreground">Base utilisée par les pages Home et Settings.</p>
          </div>
          <div className="mt-5 grid gap-4">
            <Input
              label="Nom du restaurant"
              onChange={(event) =>
                setDraft((current) => (current ? { ...current, restaurantName: event.target.value } : current))
              }
              value={draft.restaurantName}
            />
            <Input
              label="Adresse e-mail"
              onChange={(event) =>
                setDraft((current) => (current ? { ...current, contactEmail: event.target.value } : current))
              }
              type="email"
              value={draft.contactEmail}
            />
            <Input
              label="Téléphone"
              onChange={(event) =>
                setDraft((current) => (current ? { ...current, phone: event.target.value } : current))
              }
              value={draft.phone}
            />
            <Input
              label="Adresse"
              onChange={(event) =>
                setDraft((current) => (current ? { ...current, address: event.target.value } : current))
              }
              value={draft.address}
            />
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-1">
              <h2 className="text-h3 text-foreground">Notifications</h2>
              <p className="text-body-sm text-muted-foreground">
                Contrôlez les alertes visibles pour l’équipe et les opérations.
              </p>
            </div>
            <div className="mt-5 space-y-3">
              {[
                {
                  key: "newOrders" as const,
                  title: "Nouvelles commandes",
                  description: "Alerte immédiate lorsqu’une commande entre dans le flux.",
                },
                {
                  key: "dailySummary" as const,
                  title: "Résumé quotidien",
                  description: "Bilan synthétique de l’activité en fin de journée.",
                },
                {
                  key: "lowStockAlerts" as const,
                  title: "Alertes stock bas",
                  description: "Rappels opérationnels pour les items critiques du menu.",
                },
              ].map((item) => (
                <div
                  className="flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-background/60 px-4 py-3"
                  key={item.key}
                >
                  <div>
                    <p className="text-label text-foreground">{item.title}</p>
                    <p className="text-body-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={draft.notifications[item.key]}
                    onCheckedChange={(checked) =>
                      setDraft((current) =>
                        current
                          ? {
                              ...current,
                              notifications: {
                                ...current.notifications,
                                [item.key]: checked,
                              },
                            }
                          : current,
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-1">
              <h2 className="text-h3 text-foreground">Préférences d’interface</h2>
              <p className="text-body-sm text-muted-foreground">
                Ajustez la densité d’affichage et la visibilité des indicateurs sensibles.
              </p>
            </div>
            <div className="mt-5 space-y-3">
              {[
                {
                  key: "compactMode" as const,
                  title: "Mode compact",
                  description: "Réduit les respirations pour une lecture plus dense des listes.",
                },
                {
                  key: "showRevenue" as const,
                  title: "Afficher le chiffre d’affaires",
                  description: "Garde le CA visible sur Home et dans les cartes métriques.",
                },
              ].map((item) => (
                <div
                  className="flex items-center justify-between gap-4 rounded-lg border border-border/60 bg-background/60 px-4 py-3"
                  key={item.key}
                >
                  <div>
                    <p className="text-label text-foreground">{item.title}</p>
                    <p className="text-body-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={draft.preferences[item.key]}
                    onCheckedChange={(checked) =>
                      setDraft((current) =>
                        current
                          ? {
                              ...current,
                              preferences: {
                                ...current.preferences,
                                [item.key]: checked,
                              },
                            }
                          : current,
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <h2 className="text-h3 text-foreground">Horaires d’ouverture</h2>
            <p className="text-body-sm text-muted-foreground">
              Base hebdomadaire utilisée pour l’organisation du service et la communication produit.
            </p>
          </div>
          <Badge variant="info">Dernière mise à jour : {formatDateTime(draft.updatedAt)}</Badge>
        </div>

        <div className="mt-5 grid gap-3">
          {draft.openingHours.map((openingHour, index) => (
            <div
              className="grid gap-4 rounded-lg border border-border/60 bg-background/60 p-4 lg:grid-cols-[120px_1fr_1fr_180px]"
              key={openingHour.day}
            >
              <div className="flex items-center">
                <p className="text-label text-foreground">{openingHour.day}</p>
              </div>
              <Select
                disabled={openingHour.closed}
                label="Ouverture"
                onValueChange={(value) =>
                  setDraft((current) =>
                    current
                      ? {
                          ...current,
                          openingHours: current.openingHours.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, open: value } : item,
                          ),
                        }
                      : current,
                  )
                }
                options={timeOptions}
                value={openingHour.open}
              />
              <Select
                disabled={openingHour.closed}
                label="Fermeture"
                onValueChange={(value) =>
                  setDraft((current) =>
                    current
                      ? {
                          ...current,
                          openingHours: current.openingHours.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, close: value } : item,
                          ),
                        }
                      : current,
                  )
                }
                options={timeOptions}
                value={openingHour.close}
              />
              <div className="space-y-2">
                <p className="block text-label text-foreground">Service</p>
                <div className="flex h-11 items-center justify-between gap-3 rounded-sm border border-border/60 bg-white px-4">
                  <p className="text-label text-foreground">Fermé</p>
                  <Switch
                    checked={openingHour.closed}
                    onCheckedChange={(checked) =>
                      setDraft((current) =>
                        current
                          ? {
                              ...current,
                              openingHours: current.openingHours.map((item, itemIndex) =>
                                itemIndex === index ? { ...item, closed: checked } : item,
                              ),
                            }
                          : current,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
