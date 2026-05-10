"use client";

import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, RefreshCcw } from "lucide-react";

import { MenuItemImage } from "@/components/dashboard/menu-item-image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InsetCard } from "@/components/ui/inset-card";
import { Skeleton } from "@/components/ui/skeleton";
import { listCustomers, listMenuItems } from "@/lib/api";
import type { CreateOrderInput, Customer, MenuItem } from "@/lib/api";
import { customerStatusLabels, menuCategoryLabels } from "@/lib/domain/constants";
import { formatCurrency } from "@/lib/utils/format";

type OrderFormDialogProps = {
  open: boolean;
  saving?: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: CreateOrderInput) => void;
};

type OrderFormState = {
  customerId: string;
  purchasedAt: string;
  items: Array<{
    menuItemId: string;
    quantity: number;
  }>;
};

function toDateTimeLocalValue(date: Date) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

function buildInitialOrderForm(): OrderFormState {
  return {
    customerId: "",
    purchasedAt: toDateTimeLocalValue(new Date()),
    items: [],
  };
}

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function OrderFormDialog({
  onOpenChange,
  onSubmit,
  open,
  saving,
}: OrderFormDialogProps) {
  const [form, setForm] = useState<OrderFormState>(buildInitialOrderForm);
  const [search, setSearch] = useState("");
  const [customerQuery, setCustomerQuery] = useState("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [menuError, setMenuError] = useState(false);
  const [customerError, setCustomerError] = useState(false);
  const [customerListOpen, setCustomerListOpen] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  async function loadMenuCatalog() {
    try {
      setLoadingMenu(true);
      setMenuError(false);
      const items = await listMenuItems();
      setMenuItems(items.filter((item) => item.available));
    } catch {
      setMenuError(true);
    } finally {
      setLoadingMenu(false);
    }
  }

  async function loadCustomersCatalog() {
    try {
      setLoadingCustomers(true);
      setCustomerError(false);
      const nextCustomers = await listCustomers();
      setCustomers(nextCustomers);
    } catch {
      setCustomerError(true);
    } finally {
      setLoadingCustomers(false);
    }
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    setForm(buildInitialOrderForm());
    setSearch("");
    setCustomerQuery("");
    setAttemptedSubmit(false);
    setCustomerListOpen(false);
    void Promise.all([loadMenuCatalog(), loadCustomersCatalog()]);
  }, [open]);

  function updateField<Key extends keyof OrderFormState>(key: Key, value: OrderFormState[Key]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function getSelectedQuantity(menuItemId: string) {
    return form.items.find((item) => item.menuItemId === menuItemId)?.quantity ?? 0;
  }

  function updateItemQuantity(menuItemId: string, quantity: number) {
    setForm((current) => {
      const nextItems = current.items.filter((item) => item.menuItemId !== menuItemId);

      if (quantity > 0) {
        nextItems.push({ menuItemId, quantity });
      }

      return {
        ...current,
        items: nextItems,
      };
    });
  }

  function handleCustomerQueryChange(value: string) {
    setCustomerQuery(value);
    setCustomerListOpen(true);
    setAttemptedSubmit(false);

    const exactMatch = customers.find((customer) => normalize(customer.name) === normalize(value));
    updateField("customerId", exactMatch?.id ?? "");
  }

  function handleCustomerSelect(customer: Customer) {
    updateField("customerId", customer.id);
    setCustomerQuery(customer.name);
    setCustomerListOpen(false);
    setAttemptedSubmit(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttemptedSubmit(true);

    if (!form.customerId || form.items.length === 0) {
      return;
    }

    onSubmit({
      customerId: form.customerId,
      purchasedAt: new Date(form.purchasedAt).toISOString(),
      items: form.items,
    });
  }

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = normalize(customerQuery);
    const source = normalizedSearch
      ? customers.filter((customer) => {
        const customerStatus = customerStatusLabels[customer.status];

        return (
          normalize(customer.name).includes(normalizedSearch) ||
          normalize(customer.email).includes(normalizedSearch) ||
          normalize(customer.phone).includes(normalizedSearch) ||
          normalize(customerStatus).includes(normalizedSearch)
        );
      })
      : customers;

    return source.slice(0, 6);
  }, [customerQuery, customers]);

  const selectedCustomer = customers.find((customer) => customer.id === form.customerId) ?? null;
  const customerFieldError =
    attemptedSubmit && !selectedCustomer ? "Sélectionnez un client existant dans la liste." : undefined;
  const showCustomerSuggestions = customerListOpen && customerQuery.trim().length > 0;

  const filteredMenuItems = menuItems.filter((item) => {
    const normalizedSearch = search.toLowerCase().trim();

    if (!normalizedSearch) {
      return true;
    }

    return (
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.description.toLowerCase().includes(normalizedSearch)
    );
  });

  const selectedItems = form.items
    .map((selection) => {
      const menuItem = menuItems.find((item) => item.id === selection.menuItemId);

      if (!menuItem) {
        return null;
      }

      return {
        ...selection,
        menuItem,
        lineTotal: menuItem.price * selection.quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const totalAmount = selectedItems.reduce((total, item) => total + item.lineTotal, 0);
  const totalQuantity = selectedItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Créer une commande</DialogTitle>
        </DialogHeader>

        <form className="flex min-h-0 flex-1 flex-col" noValidate onSubmit={handleSubmit}>
          <DialogBody className="space-y-5">
            <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-3">
                <Input
                  error={customerFieldError}
                  hint={
                    selectedCustomer
                      ? `${selectedCustomer.email} • ${selectedCustomer.phone}`
                      : "Choisissez un client déjà présent dans le CRM."
                  }
                  label="Client"
                  onBlur={() => {
                    window.setTimeout(() => setCustomerListOpen(false), 100);
                  }}
                  onChange={(event) => handleCustomerQueryChange(event.target.value)}
                  onFocus={() => setCustomerListOpen(true)}
                  placeholder="Recherchez un client du CRM"
                  value={customerQuery}
                />

                {loadingCustomers ? (
                  <div className="space-y-2 rounded-lg border border-border/70 bg-background/70 p-3">
                    <Skeleton className="h-12 rounded-md" />
                    <Skeleton className="h-12 rounded-md" />
                    <Skeleton className="h-12 rounded-md" />
                  </div>
                ) : customerError ? (
                  <div className="rounded-lg border border-border/70 bg-background/70 p-3">
                    <p className="text-label text-foreground">Clients indisponibles</p>
                    <p className="mt-1 text-body-sm text-muted-foreground">
                      Impossible de charger la liste backend des clients.
                    </p>
                    <Button className="mt-3" onClick={loadCustomersCatalog} type="button" variant="outline">
                      <RefreshCcw className="h-4 w-4" />
                      Recharger les clients
                    </Button>
                  </div>
                ) : showCustomerSuggestions ? (
                  <div className="max-h-56 overflow-y-auto rounded-lg border border-border/70 bg-white p-2 shadow-soft">
                    {filteredCustomers.length === 0 ? (
                      <div className="px-3 py-2 text-body-sm text-muted-foreground">
                        Aucun client ne correspond à cette recherche.
                      </div>
                    ) : (
                      filteredCustomers.map((customer) => (
                        <button
                          className="flex w-full items-start justify-between gap-3 rounded-md px-3 py-3 text-left transition duration-base ease-expressive hover:bg-accent/65"
                          key={customer.id}
                          onClick={() => handleCustomerSelect(customer)}
                          onMouseDown={(event) => event.preventDefault()}
                          type="button"
                        >
                          <div className="min-w-0">
                            <p className="text-label text-foreground">{customer.name}</p>
                            <p className="mt-1 truncate text-body-sm text-muted-foreground">
                              {customer.email} • {customer.phone}
                            </p>
                          </div>
                          <span className="whitespace-nowrap text-caption font-medium uppercase tracking-[0.14em] text-primary">
                            {customerStatusLabels[customer.status]}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                ) : null}
              </div>

              <Input
                label="Date d’achat"
                onChange={(event) => updateField("purchasedAt", event.target.value)}
                required
                type="datetime-local"
                value={form.purchasedAt}
              />
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
              <Card className="p-5">
                <div className="space-y-1">
                  <p className="text-label text-foreground">Choix des menus</p>
                  <p className="text-body-sm text-muted-foreground">
                    Sélection compacte avec recherche, quantité et prix unitaire.
                  </p>
                </div>

                <div className="mt-4">
                  <Input
                    label="Recherche menu"
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Tataki, dessert, boisson..."
                    value={search}
                  />
                </div>

                <div className="mt-4 max-h-[26rem] space-y-3 overflow-y-auto pr-1">
                  {loadingMenu ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton className="h-20 rounded-lg" key={index} />
                    ))
                  ) : menuError ? (
                    <InsetCard>
                      <p className="text-label text-foreground">Catalogue indisponible</p>
                      <p className="mt-1 text-body-sm text-muted-foreground">
                        Impossible de charger les plats disponibles pour la commande.
                      </p>
                      <Button className="mt-3" onClick={loadMenuCatalog} type="button" variant="outline">
                        <RefreshCcw className="h-4 w-4" />
                        Réessayer
                      </Button>
                    </InsetCard>
                  ) : filteredMenuItems.length === 0 ? (
                    <InsetCard>
                      <p className="text-label text-foreground">Aucun item trouvé</p>
                      <p className="mt-1 text-body-sm text-muted-foreground">
                        Ajustez la recherche pour afficher d’autres plats du catalogue.
                      </p>
                    </InsetCard>
                  ) : (
                    filteredMenuItems.map((item) => {
                      const quantity = getSelectedQuantity(item.id);

                      return (
                        <div
                          className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/70 p-3"
                          key={item.id}
                        >
                          <MenuItemImage
                            alt={item.name}
                            className="h-16 w-16 shrink-0 rounded-md"
                            contain
                            sizes="64px"
                            src={item.imageUrl}
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-label text-foreground">{item.name}</p>
                                <p className="mt-1 text-body-sm text-muted-foreground">
                                  {menuCategoryLabels[item.category]} • {formatCurrency(item.price)}
                                </p>
                              </div>
                            </div>
                            <p className="mt-2 line-clamp-2 text-body-sm text-muted-foreground">{item.description}</p>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            <Button
                              aria-label={`Retirer ${item.name}`}
                              disabled={quantity === 0}
                              onClick={() => updateItemQuantity(item.id, Math.max(0, quantity - 1))}
                              size="icon"
                              type="button"
                              variant="outline"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <div className="w-8 text-center text-label text-foreground">{quantity}</div>
                            <Button
                              aria-label={`Ajouter ${item.name}`}
                              onClick={() => updateItemQuantity(item.id, quantity + 1)}
                              size="icon"
                              type="button"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </Card>

              <Card className="p-5">
                <div className="space-y-1">
                  <p className="text-label text-foreground">Résumé de commande</p>
                  <p className="text-body-sm text-muted-foreground">
                    Vérifiez la sélection, le total et l’historique d’achat associé à cette commande.
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <InsetCard>
                      <p className="text-body-sm text-muted-foreground">Articles</p>
                      <p className="mt-2 text-h3 text-foreground">{totalQuantity}</p>
                    </InsetCard>
                    <InsetCard>
                      <p className="text-body-sm text-muted-foreground">Total</p>
                      <p className="mt-2 text-h3 text-foreground">{formatCurrency(totalAmount)}</p>
                    </InsetCard>
                  </div>

                  <InsetCard>
                    <p className="text-label text-foreground">Historique d’achat</p>
                    <p className="mt-1 text-body-sm text-muted-foreground">
                      {selectedCustomer
                        ? `${selectedCustomer.ordersCount} commande(s) précédentes • dernière activité ${selectedCustomer.lastOrderAt ? new Date(selectedCustomer.lastOrderAt).toLocaleDateString("fr-FR") : "non renseignée"}`
                        : "Sélectionnez un client pour afficher son historique simplifié."}
                    </p>
                  </InsetCard>

                  <div className="max-h-[18rem] space-y-3 overflow-y-auto pr-1">
                    {selectedItems.length === 0 ? (
                      <InsetCard tone="dashed">
                        <p className="text-label text-foreground">Aucun item sélectionné</p>
                        <p className="mt-1 text-body-sm text-muted-foreground">
                          Ajoutez au moins un plat, dessert ou boisson depuis la recherche.
                        </p>
                      </InsetCard>
                    ) : (
                      selectedItems.map(({ menuItem, quantity, lineTotal }) => (
                        <div
                          className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-white px-4 py-3"
                          key={menuItem.id}
                        >
                          <div className="min-w-0">
                            <p className="truncate text-label text-foreground">{menuItem.name}</p>
                            <p className="mt-1 text-body-sm text-muted-foreground">
                              {quantity} × {formatCurrency(menuItem.price)}
                            </p>
                          </div>
                          <p className="text-label text-foreground">{formatCurrency(lineTotal)}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </DialogBody>

          <DialogFooter className="border-t border-border/60 pt-4">
            <Button onClick={() => onOpenChange(false)} type="button" variant="ghost">
              Annuler
            </Button>
            <Button disabled={!selectedCustomer || selectedItems.length === 0} loading={saving} type="submit">
              Créer la commande
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
