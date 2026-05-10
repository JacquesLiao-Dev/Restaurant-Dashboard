"use client";

import { useEffect, useState } from "react";

import {
  DialogBody,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { CreateCustomerInput, Customer } from "@/lib/api";
import { customerStatusOptions } from "@/lib/domain/constants";

type CustomerFormDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  customer?: Customer | null;
  saving?: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: CreateCustomerInput) => void;
};

const initialCustomerForm: CreateCustomerInput = {
  name: "",
  email: "",
  phone: "",
  status: "new",
};

export function CustomerFormDialog({
  customer,
  mode,
  onOpenChange,
  onSubmit,
  open,
  saving,
}: CustomerFormDialogProps) {
  const [form, setForm] = useState<CreateCustomerInput>(initialCustomerForm);

  useEffect(() => {
    if (open) {
      setForm(
        customer
          ? {
              name: customer.name,
              email: customer.email,
              phone: customer.phone,
              status: customer.status,
            }
          : initialCustomerForm,
      );
    }
  }, [customer, open]);

  function updateField<Key extends keyof CreateCustomerInput>(key: Key, value: CreateCustomerInput[Key]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(form);
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Créer un client" : "Modifier le client"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Ajoutez un client au CRM pour suivre son historique et ses commandes."
              : "Mettez à jour les informations du client sans quitter le dashboard."}
          </DialogDescription>
        </DialogHeader>

        <form noValidate onSubmit={handleSubmit}>
          <DialogBody className="space-y-4">
            <Input
              label="Nom complet"
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Camille Laurent"
              required
              value={form.name}
            />
            <Input
              label="Adresse e-mail"
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="camille@restaurant.fr"
              required
              type="email"
              value={form.email}
            />
            <Input
              label="Téléphone"
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="+33 6 12 34 56 78"
              required
              value={form.phone}
            />
            <Select
              label="Statut"
              onValueChange={(value) => updateField("status", value as CreateCustomerInput["status"])}
              options={customerStatusOptions}
              value={form.status}
            />
          </DialogBody>

          <DialogFooter className="border-t border-border/60 pt-4">
            <Button onClick={() => onOpenChange(false)} type="button" variant="ghost">
              Annuler
            </Button>
            <Button loading={saving} type="submit">
              {mode === "create" ? "Créer le client" : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
