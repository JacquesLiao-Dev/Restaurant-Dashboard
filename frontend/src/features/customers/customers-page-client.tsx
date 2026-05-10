"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Plus, RefreshCcw, Search, Trash2 } from "lucide-react";

import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
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
import { Input } from "@/components/ui/input";
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
import { createCustomer, deleteCustomer, listCustomers, updateCustomer } from "@/lib/api";
import { notify } from "@/lib/design-system/notify";
import type { CreateCustomerInput, Customer, CustomerStatus } from "@/lib/api";
import {
  customerStatusLabels,
  customerStatusOptions,
  getCustomerBadgeVariant,
} from "@/lib/domain/constants";
import { formatDateTime } from "@/lib/utils/format";

import { CustomerFormDialog } from "@/features/customers/customer-form-dialog";

type CustomerFormState = {
  open: boolean;
  mode: "create" | "edit";
  customer: Customer | null;
};

export function CustomersPageClient() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [formState, setFormState] = useState<CustomerFormState>({
    open: false,
    mode: "create",
    customer: null,
  });
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  async function loadCustomers(filters?: { search?: string; status?: CustomerStatus }) {
    try {
      setLoading(true);
      setError(false);
      const nextCustomers = await listCustomers(filters);
      setCustomers(nextCustomers);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadCustomers({
        search: search || undefined,
        status: (statusFilter || undefined) as CustomerStatus | undefined,
      });
    }, 220);

    return () => window.clearTimeout(timer);
  }, [search, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  async function handleSubmitCustomer(payload: CreateCustomerInput) {
    try {
      setSaving(true);

      if (formState.mode === "create") {
        await createCustomer(payload);
        notify.success("Client créé", {
          description: "Le client a été ajouté au CRM.",
        });
      } else if (formState.customer) {
        await updateCustomer(formState.customer.id, payload);
        notify.success("Client mis à jour", {
          description: "Les informations ont été enregistrées.",
        });
      }

      setFormState({
        open: false,
        mode: "create",
        customer: null,
      });
      await loadCustomers({
        search: search || undefined,
        status: (statusFilter || undefined) as CustomerStatus | undefined,
      });
    } catch {
      notify.error("Impossible d’enregistrer le client", {
        description: "Réessayez dans quelques instants.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteCustomer() {
    if (!customerToDelete) {
      return;
    }

    try {
      setDeleting(true);
      await deleteCustomer(customerToDelete.id);
      notify.success("Client supprimé", {
        description: "La fiche client a été retirée du CRM.",
      });
      setCustomerToDelete(null);
      setDetailsOpen(false);
      setSelectedCustomer(null);
      await loadCustomers({
        search: search || undefined,
        status: (statusFilter || undefined) as CustomerStatus | undefined,
      });
    } catch {
      notify.error("Suppression impossible", {
        description: "Le client n’a pas pu être supprimé.",
      });
    } finally {
      setDeleting(false);
    }
  }

  function openCreateDialog() {
    setFormState({
      open: true,
      mode: "create",
      customer: null,
    });
  }

  function openEditDialog(customer: Customer) {
    setFormState({
      open: true,
      mode: "edit",
      customer,
    });
  }

  function openDetails(customer: Customer) {
    setSelectedCustomer(customer);
    setDetailsOpen(true);
  }

  const vipCount = customers.filter((customer) => customer.status === "vip").length;
  const activeCount = customers.filter((customer) => customer.status === "active").length;
  const newCount = customers.filter((customer) => customer.status === "new").length;
  const totalPages = Math.max(1, Math.ceil(customers.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedCustomers = customers.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="page-shell space-y-8">
      <DashboardPageHeader
        actions={
          <Button onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            Ajouter un client
          </Button>
        }
        description="Gérez la base clients du restaurant, segmentez les profils et mettez à jour les fiches sans quitter le dashboard."
        eyebrow="CRM"
        title="Gestion des clients"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-body-sm text-muted-foreground">Clients visibles</p>
          <p className="mt-3 text-h2 text-foreground">{customers.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-body-sm text-muted-foreground">Profils VIP</p>
          <p className="mt-3 text-h2 text-foreground">{vipCount}</p>
        </Card>
        <Card className="p-5">
          <p className="text-body-sm text-muted-foreground">Actifs ou nouveaux</p>
          <p className="mt-3 text-h2 text-foreground">{newCount + activeCount}</p>
        </Card>
      </div>

      <Card className="p-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_220px_180px]">
          <Input
            className="bg-white"
            label="Recherche"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nom, e-mail ou téléphone"
            value={search}
          />
          <Select
            label="Filtre statut"
            onValueChange={setStatusFilter}
            options={[{ label: "Tous les statuts", value: "" }, ...customerStatusOptions]}
            value={statusFilter}
          />
          <div className="flex items-end">
            <Button
              className="w-full"
              onClick={() =>
                loadCustomers({
                  search: search || undefined,
                  status: (statusFilter || undefined) as CustomerStatus | undefined,
                })
              }
              variant="outline"
            >
              <Search className="h-4 w-4" />
              Rafraîchir
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
            <Button onClick={() => loadCustomers()} variant="outline">
              <RefreshCcw className="h-4 w-4" />
              Recharger
            </Button>
          }
          description="Impossible de récupérer la liste des clients."
          title="Le CRM n’a pas pu être chargé"
        />
      ) : customers.length === 0 ? (
        <EmptyState
          action={<Button onClick={openCreateDialog}>Créer un premier client</Button>}
          description="Aucun client ne correspond aux filtres courants."
          title="Le CRM est vide"
        />
      ) : (
        <>
          <Card className="hidden overflow-hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Commandes</TableHead>
                  <TableHead>Dernière activité</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <button
                        className="space-y-1 text-left transition hover:text-primary"
                        onClick={() => openDetails(customer)}
                        type="button"
                      >
                        <p className="text-label text-foreground">{customer.name}</p>
                        <p className="text-body-sm text-muted-foreground">{customer.email}</p>
                      </button>
                    </TableCell>
                    <TableCell>
                      <p className="text-body-sm text-muted-foreground">{customer.phone}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getCustomerBadgeVariant(customer.status)}>
                        {customerStatusLabels[customer.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.ordersCount}</TableCell>
                    <TableCell>{formatDateTime(customer.lastOrderAt)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="ghost">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openDetails(customer)}>Voir la fiche</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEditDialog(customer)}>Modifier</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-error focus:text-error"
                            onClick={() => setCustomerToDelete(customer)}
                          >
                            Supprimer
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
            {paginatedCustomers.map((customer) => (
              <Card className="p-5" key={customer.id} variant="interactive">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <button className="text-left" onClick={() => openDetails(customer)} type="button">
                      <p className="text-h3 text-foreground">{customer.name}</p>
                    </button>
                    <Badge variant={getCustomerBadgeVariant(customer.status)}>
                      {customerStatusLabels[customer.status]}
                    </Badge>
                  </div>
                  <Button onClick={() => openEditDialog(customer)} size="sm" variant="outline">
                    Modifier
                  </Button>
                </div>
                <div className="mt-4 space-y-2 text-body-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{customer.phone}</span>
                  </div>
                  <p>{customer.ordersCount} commande(s)</p>
                  <p>Dernière activité : {formatDateTime(customer.lastOrderAt)}</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <Button className="flex-1" onClick={() => openDetails(customer)} variant="ghost">
                    Détails
                  </Button>
                  <Button className="flex-1" onClick={() => setCustomerToDelete(customer)} variant="danger">
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          {customers.length > pageSize ? (
            <Pagination
              className="mt-4"
              itemLabel="clients"
              onPageChange={setCurrentPage}
              page={safePage}
              pageSize={pageSize}
              totalItems={customers.length}
              totalPages={totalPages}
            />
          ) : null}
        </>
      )}

      <CustomerFormDialog
        customer={formState.customer}
        mode={formState.mode}
        onOpenChange={(open) => setFormState((current) => ({ ...current, open }))}
        onSubmit={handleSubmitCustomer}
        open={formState.open}
        saving={saving}
      />

      <Dialog onOpenChange={setDetailsOpen} open={detailsOpen}>
        <DialogContent>
          {selectedCustomer ? (
            <>
              <DialogHeader>
                <DialogTitle>{selectedCustomer.name}</DialogTitle>
                <DialogDescription>
                  Fiche détaillée du client et informations utiles pour les commandes.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={getCustomerBadgeVariant(selectedCustomer.status)}>
                    {customerStatusLabels[selectedCustomer.status]}
                  </Badge>
                  <Badge variant="neutral">{selectedCustomer.ordersCount} commande(s)</Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="p-4">
                    <p className="text-body-sm text-muted-foreground">Adresse e-mail</p>
                    <p className="mt-2 text-label text-foreground">{selectedCustomer.email}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-body-sm text-muted-foreground">Téléphone</p>
                    <p className="mt-2 text-label text-foreground">{selectedCustomer.phone}</p>
                  </Card>
                </div>
                <Card className="p-4">
                  <p className="text-body-sm text-muted-foreground">Dernière activité</p>
                  <p className="mt-2 text-label text-foreground">{formatDateTime(selectedCustomer.lastOrderAt)}</p>
                </Card>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    setDetailsOpen(false);
                    openEditDialog(selectedCustomer);
                  }}
                  variant="outline"
                >
                  Modifier
                </Button>
                <Button onClick={() => setCustomerToDelete(selectedCustomer)} variant="danger">
                  Supprimer
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        confirmLabel="Supprimer le client"
        description={
          customerToDelete
            ? `La fiche de ${customerToDelete.name} sera supprimée du CRM. Cette action est irréversible.`
            : ""
        }
        loading={deleting}
        onConfirm={handleDeleteCustomer}
        onOpenChange={(open) => {
          if (!open) {
            setCustomerToDelete(null);
          }
        }}
        open={Boolean(customerToDelete)}
        title="Confirmer la suppression"
      />
    </div>
  );
}
