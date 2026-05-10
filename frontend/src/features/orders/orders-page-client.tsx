"use client";

import { useEffect, useState } from "react";
import { Eye, Plus, RefreshCcw } from "lucide-react";

import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Pagination } from "@/components/ui/pagination";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createOrder, listOrders, updateOrderStatus } from "@/lib/api";
import { notify } from "@/lib/design-system/notify";
import type { CreateOrderInput, Order, OrderStatus } from "@/lib/api";
import { getOrderBadgeVariant, orderStatusLabels, orderStatusOptions } from "@/lib/domain/constants";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";

import { OrderFormDialog } from "@/features/orders/order-form-dialog";

export function OrdersPageClient() {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [createOpen, setCreateOpen] = useState(false);
  const [createSaving, setCreateSaving] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusDraft, setStatusDraft] = useState<OrderStatus>("pending");
  const [statusSaving, setStatusSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  async function loadOrders(filter?: OrderStatus) {
    try {
      setLoading(true);
      setError(false);

      const [fullOrders, visibleOrders] = await Promise.all([
        listOrders(),
        filter ? listOrders(filter) : listOrders(),
      ]);

      setAllOrders(fullOrders);
      setOrders(visibleOrders);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders((statusFilter || undefined) as OrderStatus | undefined);
  }, [statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  async function handleCreateOrder(payload: CreateOrderInput) {
    try {
      setCreateSaving(true);
      await createOrder(payload);
      notify.success("Commande créée", {
        description: "La nouvelle commande a été ajoutée au flux de production.",
      });
      setCreateOpen(false);
      await loadOrders((statusFilter || undefined) as OrderStatus | undefined);
    } catch {
      notify.error("Création impossible", {
        description: "La commande n’a pas pu être créée.",
      });
    } finally {
      setCreateSaving(false);
    }
  }

  async function handleUpdateStatus() {
    if (!selectedOrder) {
      return;
    }

    try {
      setStatusSaving(true);
      const updatedOrder = await updateOrderStatus(selectedOrder.id, statusDraft);
      setSelectedOrder(updatedOrder);
      notify.success("Statut mis à jour", {
        description: `La commande #${updatedOrder.orderNumber} est maintenant ${orderStatusLabels[updatedOrder.status].toLowerCase()}.`,
      });
      await loadOrders((statusFilter || undefined) as OrderStatus | undefined);
    } catch {
      notify.error("Mise à jour impossible", {
        description: "Le statut de la commande n’a pas pu être changé.",
      });
    } finally {
      setStatusSaving(false);
    }
  }

  function openDetails(order: Order) {
    setSelectedOrder(order);
    setStatusDraft(order.status);
    setDetailsOpen(true);
  }

  const pendingCount = allOrders.filter((order) => order.status === "pending").length;
  const preparingCount = allOrders.filter((order) => order.status === "preparing").length;
  const readyCount = allOrders.filter((order) => order.status === "ready").length;
  const deliveredCount = allOrders.filter((order) => order.status === "delivered").length;
  const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedOrders = orders.slice((safePage - 1) * pageSize, safePage * pageSize);

  function renderOrderItemsPreview(order: Order) {
    const visibleItems = order.items.slice(0, 2).map((item) => `${item.quantity}× ${item.name}`);

    if (order.items.length <= 2) {
      return visibleItems.join(", ");
    }

    return `${visibleItems.join(", ")} +${order.items.length - 2} autre(s)`;
  }

  return (
    <div className="page-shell space-y-8">
      <DashboardPageHeader
        actions={
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            Nouvelle commande
          </Button>
        }
        description="Suivez la production en temps réel, filtrez les statuts et mettez à jour les commandes sans changer de contexte."
        eyebrow="Orders"
        title="Gestion des commandes"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="En attente" value={pendingCount} />
        <StatCard label="En préparation" value={preparingCount} />
        <StatCard label="Prêtes" value={readyCount} />
        <StatCard label="Livrées" value={deliveredCount} />
      </div>

      <Card className="p-5">
        <div className="grid gap-4 lg:grid-cols-[220px_auto]">
          <Select
            label="Filtrer par statut"
            onValueChange={setStatusFilter}
            options={[{ label: "Tous les statuts", value: "" }, ...orderStatusOptions]}
            value={statusFilter}
          />
          <div className="flex items-end">
            <Button className="w-full lg:w-auto" onClick={() => loadOrders((statusFilter || undefined) as OrderStatus | undefined)} variant="outline">
              <RefreshCcw className="h-4 w-4" />
              Recharger
            </Button>
          </div>
        </div>
      </Card>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-[360px] rounded-lg" />
        </div>
      ) : error ? (
        <ErrorState
          action={
            <Button onClick={() => loadOrders((statusFilter || undefined) as OrderStatus | undefined)} variant="outline">
              <RefreshCcw className="h-4 w-4" />
              Recharger
            </Button>
          }
          description="Impossible de récupérer les commandes."
          title="Le module Orders n’a pas pu être chargé"
        />
      ) : orders.length === 0 ? (
        <EmptyState
          action={<Button onClick={() => setCreateOpen(true)}>Créer une commande</Button>}
          description="Aucune commande ne correspond au filtre courant."
          title="Aucune commande visible"
        />
      ) : (
        <>
          <Card className="hidden overflow-hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commande</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Articles</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-label text-foreground">#{order.orderNumber}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-label text-foreground">{order.customerName}</p>
                        <p className="mt-1 text-body-sm text-muted-foreground">{renderOrderItemsPreview(order)}</p>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell>{order.itemsCount}</TableCell>
                    <TableCell>
                      <Badge variant={getOrderBadgeVariant(order.status)}>{orderStatusLabels[order.status]}</Badge>
                    </TableCell>
                    <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openDetails(order)}>
                            <Eye className="h-4 w-4" />
                            Voir le détail
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="grid gap-4 lg:hidden">
            {paginatedOrders.map((order) => (
              <Card className="p-5" key={order.id} variant="interactive">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-h3 text-foreground">#{order.orderNumber}</p>
                    <p className="mt-1 text-body-sm text-muted-foreground">{order.customerName}</p>
                  </div>
                  <Badge variant={getOrderBadgeVariant(order.status)}>{orderStatusLabels[order.status]}</Badge>
                </div>
                <div className="mt-4 space-y-2 text-body-sm text-muted-foreground">
                  <p>{renderOrderItemsPreview(order)}</p>
                  <p>{formatCurrency(order.totalAmount)}</p>
                  <p>{order.itemsCount} article(s)</p>
                  <p>Achat : {formatDateTime(order.createdAt)}</p>
                </div>
                <div className="mt-4">
                  <Button className="w-full" onClick={() => openDetails(order)} variant="outline">
                    Voir le détail
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          {orders.length > pageSize ? (
            <Pagination
              className="mt-4"
              itemLabel="commandes"
              onPageChange={setCurrentPage}
              page={safePage}
              pageSize={pageSize}
              totalItems={orders.length}
              totalPages={totalPages}
            />
          ) : null}
        </>
      )}

      <OrderFormDialog
        onOpenChange={setCreateOpen}
        onSubmit={handleCreateOrder}
        open={createOpen}
        saving={createSaving}
      />

      <Dialog onOpenChange={setDetailsOpen} open={detailsOpen}>
        <DialogContent>
          {selectedOrder ? (
            <>
              <DialogHeader>
                <DialogTitle>Commande #{selectedOrder.orderNumber}</DialogTitle>
                <DialogDescription>
                  Détail de la commande et changement de statut sans rechargement de page.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="p-4">
                    <p className="text-body-sm text-muted-foreground">Client</p>
                    <p className="mt-2 text-label text-foreground">{selectedOrder.customerName}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-body-sm text-muted-foreground">Montant total</p>
                    <p className="mt-2 text-label text-foreground">{formatCurrency(selectedOrder.totalAmount)}</p>
                  </Card>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="p-4">
                    <p className="text-body-sm text-muted-foreground">Articles</p>
                    <p className="mt-2 text-label text-foreground">{selectedOrder.itemsCount}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-body-sm text-muted-foreground">Date d’achat</p>
                    <p className="mt-2 text-label text-foreground">{formatDateTime(selectedOrder.createdAt)}</p>
                  </Card>
                </div>
                <Card className="p-4">
                  <p className="text-body-sm text-muted-foreground">Menus choisis</p>
                  <div className="mt-3 space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div
                        className="flex items-center justify-between gap-4 rounded-lg border border-border/70 bg-background/60 px-4 py-3"
                        key={`${selectedOrder.id}-${item.menuItemId}`}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-label text-foreground">{item.name}</p>
                          <p className="mt-1 text-body-sm text-muted-foreground">
                            {item.quantity} × {formatCurrency(item.unitPrice)}
                          </p>
                        </div>
                        <p className="text-label text-foreground">{formatCurrency(item.lineTotal)}</p>
                      </div>
                    ))}
                  </div>
                </Card>
                <Select
                  label="Statut"
                  onValueChange={(value) => setStatusDraft(value as OrderStatus)}
                  options={orderStatusOptions}
                  value={statusDraft}
                />
              </div>

              <DialogFooter>
                <Button onClick={() => setDetailsOpen(false)} variant="ghost">
                  Fermer
                </Button>
                <Button loading={statusSaving} onClick={handleUpdateStatus}>
                  Enregistrer le statut
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
