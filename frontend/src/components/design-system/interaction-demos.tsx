"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { notify } from "@/lib/design-system/notify";

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() =>
          notify.success("Client cree", {
            description: "Le nouveau profil a bien ete ajoute au CRM.",
          })
        }
      >
        Toast succes
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          notify.info("Service synchronise", {
            description: "Les donnees visibles sont a jour.",
          })
        }
      >
        Toast info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          notify.warning("Stock a verifier", {
            description: "Plus que 3 desserts disponibles pour le service.",
          })
        }
      >
        Toast alerte
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          notify.error("Suppression impossible", {
            description: "Cet element est encore lie a une commande active.",
          })
        }
      >
        Toast erreur
      </Button>
    </div>
  );
}

export function ModalDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ouvrir une modale</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creer un nouveau client</DialogTitle>
          <DialogDescription>
            Une modale convient aux actions courtes qui doivent rester dans le contexte de la page.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input hint="Visible dans la fiche client et les commandes." label="Nom complet" placeholder="Camille Laurent" />
          <Input label="Adresse e-mail" placeholder="camille@restaurant.fr" type="email" />
          <Textarea label="Note interne" placeholder="Preferences, allergies ou details de suivi." />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Annuler</Button>
          </DialogClose>
          <Button
            onClick={() =>
              toast.success("Client pret a etre enregistre", {
                description: "La structure du formulaire respecte labels, focus et hierarchie.",
              })
            }
          >
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteConfirmationDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="danger">Tester une suppression</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer ce client ?</DialogTitle>
          <DialogDescription>
            Utiliser une confirmation uniquement pour les actions irreversibles ou a forte consequence.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg border border-error/15 bg-error/5 p-4 text-body-sm text-muted-foreground">
          Ce client sera retire de la liste visible. Les donnees historiques associees doivent etre preservees ou
          traitees explicitement par le produit.
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Annuler</Button>
          </DialogClose>
          <Button
            variant="danger"
            onClick={() =>
              toast.error("Suppression simulee", {
                description: "Le pattern montre une action destructive clairement isolee.",
              })
            }
          >
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
