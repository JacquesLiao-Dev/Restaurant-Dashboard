"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal, Plus, RefreshCcw } from "lucide-react";

import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";
import { MenuItemImage } from "@/components/dashboard/menu-item-image";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleRow } from "@/components/ui/toggle-row";
import {
  createMenuItem,
  deleteMenuItem,
  listMenuItems,
  updateMenuItem,
} from "@/lib/api";
import type { CreateMenuItemInput, MenuCategory, MenuItem } from "@/lib/api";
import { notify } from "@/lib/design-system/notify";
import { menuCategoryLabels, menuCategoryOptions } from "@/lib/domain/constants";
import { formatCurrency } from "@/lib/utils/format";

import { MenuItemDialog } from "@/features/menu/menu-item-dialog";

type MenuDialogState = {
  open: boolean;
  mode: "create" | "edit";
  item: MenuItem | null;
};

export function MenuPageClient() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [dialogState, setDialogState] = useState<MenuDialogState>({
    open: false,
    mode: "create",
    item: null,
  });
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);

  async function loadMenu(filters?: { search?: string; category?: MenuCategory }) {
    try {
      setLoading(true);
      setError(false);
      const nextItems = await listMenuItems(filters);
      setItems(nextItems);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadMenu({
        search: search || undefined,
        category: (categoryFilter || undefined) as MenuCategory | undefined,
      });
    }, 220);

    return () => window.clearTimeout(timer);
  }, [categoryFilter, search]);

  async function handleSubmitItem(payload: CreateMenuItemInput) {
    try {
      setSaving(true);

      if (dialogState.mode === "create") {
        await createMenuItem(payload);
        notify.success("Plat ajouté", {
          description: "Le menu a été enrichi avec un nouvel item.",
        });
      } else if (dialogState.item) {
        await updateMenuItem(dialogState.item.id, payload);
        notify.success("Plat mis à jour", {
          description: "Les informations du plat ont été enregistrées.",
        });
      }

      setDialogState({
        open: false,
        mode: "create",
        item: null,
      });
      await loadMenu({
        search: search || undefined,
        category: (categoryFilter || undefined) as MenuCategory | undefined,
      });
    } catch {
      notify.error("Enregistrement impossible", {
        description: "Le menu n’a pas pu être mis à jour.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleAvailability(item: MenuItem, available: boolean) {
    try {
      await updateMenuItem(item.id, { available });
      notify.success("Disponibilité mise à jour", {
        description: `${item.name} est maintenant ${available ? "disponible" : "indisponible"}.`,
      });
      await loadMenu({
        search: search || undefined,
        category: (categoryFilter || undefined) as MenuCategory | undefined,
      });
    } catch {
      notify.error("Action impossible", {
        description: "La disponibilité de l’item n’a pas pu être changée.",
      });
    }
  }

  async function handleDeleteItem() {
    if (!itemToDelete) {
      return;
    }

    try {
      setDeleting(true);
      await deleteMenuItem(itemToDelete.id);
      notify.success("Plat supprimé", {
        description: "L’item a été retiré de la carte.",
      });
      setItemToDelete(null);
      await loadMenu({
        search: search || undefined,
        category: (categoryFilter || undefined) as MenuCategory | undefined,
      });
    } catch {
      notify.error("Suppression impossible", {
        description: "Le plat n’a pas pu être supprimé.",
      });
    } finally {
      setDeleting(false);
    }
  }

  const availableCount = items.filter((item) => item.available).length;
  const hiddenCount = items.filter((item) => !item.available).length;

  return (
    <div className="page-shell space-y-8">
      <DashboardPageHeader
        actions={
          <Button
            onClick={() =>
              setDialogState({
                open: true,
                mode: "create",
                item: null,
              })
            }
          >
            <Plus className="h-4 w-4" />
            Ajouter un plat
          </Button>
        }
        description="Pilotez la carte du restaurant, ses catégories, ses prix et la disponibilité de chaque plat."
        eyebrow="Menu"
        title="Gestion du menu"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Items visibles" value={availableCount} />
        <StatCard label="Items masqués" value={hiddenCount} />
        <StatCard label="Catalogue" value={items.length} />
      </div>

      <Card className="p-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_220px_180px]">
          <Input
            className="bg-white"
            label="Recherche"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nom ou description"
            value={search}
          />
          <Select
            label="Catégorie"
            onValueChange={setCategoryFilter}
            options={[{ label: "Toutes les catégories", value: "" }, ...menuCategoryOptions]}
            value={categoryFilter}
          />
          <div className="flex items-end">
            <Button
              className="w-full"
              onClick={() =>
                loadMenu({
                  search: search || undefined,
                  category: (categoryFilter || undefined) as MenuCategory | undefined,
                })
              }
              variant="outline"
            >
              <RefreshCcw className="h-4 w-4" />
              Recharger
            </Button>
          </div>
        </div>
      </Card>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className="h-[280px] rounded-lg" key={index} />
          ))}
        </div>
      ) : error ? (
        <ErrorState
          action={
            <Button onClick={() => loadMenu()} variant="outline">
              <RefreshCcw className="h-4 w-4" />
              Recharger
            </Button>
          }
          description="Impossible de récupérer les items du menu."
          title="Le catalogue n’a pas pu être chargé"
        />
      ) : items.length === 0 ? (
        <EmptyState
          action={
            <Button
              onClick={() =>
                setDialogState({
                  open: true,
                  mode: "create",
                  item: null,
                })
              }
            >
              Ajouter un premier plat
            </Button>
          }
          description="Aucun plat ne correspond aux filtres actuels."
          title="Le menu est vide"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Card className="p-5" key={item.id} variant="interactive">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <Badge variant={item.available ? "success" : "neutral"}>
                    {item.available ? "Disponible" : "Indisponible"}
                  </Badge>
                  <h2 className="text-h3 text-foreground">{item.name}</h2>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        setDialogState({
                          open: true,
                          mode: "edit",
                          item,
                        })
                      }
                    >
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-error focus:text-error" onClick={() => setItemToDelete(item)}>
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <MenuItemImage
                alt={item.name}
                className="mt-4 h-32"
                contain
                sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                src={item.imageUrl}
              />

              <div className="mt-4 flex items-center justify-between gap-3">
                <Badge variant="secondary">{menuCategoryLabels[item.category]}</Badge>
                <p className="text-body font-semibold text-foreground">{formatCurrency(item.price)}</p>
              </div>

              <p className="mt-3 text-body-sm text-muted-foreground">{item.description}</p>

              <ToggleRow
                checked={item.available}
                className="mt-5"
                description="Affiché dans la carte active."
                onCheckedChange={(checked) => handleToggleAvailability(item, checked)}
                title="Disponibilité"
              />
            </Card>
          ))}
        </div>
      )}

      <MenuItemDialog
        item={dialogState.item}
        mode={dialogState.mode}
        onOpenChange={(open) => setDialogState((current) => ({ ...current, open }))}
        onSubmit={handleSubmitItem}
        open={dialogState.open}
        saving={saving}
      />

      <ConfirmDialog
        confirmLabel="Supprimer le plat"
        description={
          itemToDelete ? `${itemToDelete.name} sera supprimé de la carte. Cette action est irréversible.` : ""
        }
        loading={deleting}
        onConfirm={handleDeleteItem}
        onOpenChange={(open) => {
          if (!open) {
            setItemToDelete(null);
          }
        }}
        open={Boolean(itemToDelete)}
        title="Confirmer la suppression"
      />
    </div>
  );
}
