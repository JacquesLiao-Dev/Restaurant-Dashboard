"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MenuItemImage } from "@/components/dashboard/menu-item-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { CreateMenuItemInput, MenuImageUploadInput, MenuItem } from "@/lib/api";
import { menuCategoryOptions } from "@/lib/domain/constants";

type MenuItemDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  item?: MenuItem | null;
  saving?: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: CreateMenuItemInput) => void;
};

const initialMenuForm: CreateMenuItemInput = {
  name: "",
  description: "",
  category: "starter",
  price: 18,
  available: true,
  imageUrl: "",
  imageUpload: null,
};

const acceptedImageTypes = ["image/png", "image/jpeg", "image/webp"] as const;
const maxImageSizeInBytes = 4 * 1024 * 1024;

type MenuFormState = CreateMenuItemInput;

export function MenuItemDialog({
  item,
  mode,
  onOpenChange,
  onSubmit,
  open,
  saving,
}: MenuItemDialogProps) {
  const [form, setForm] = useState<MenuFormState>(initialMenuForm);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setImageError(null);
      setForm(
        item
          ? {
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price,
            available: item.available,
            imageUrl: item.imageUrl ?? "",
            imageUpload: null,
          }
          : initialMenuForm,
      );
      setImagePreview(item?.imageUrl ?? null);
    }
  }, [item, open]);

  async function handleImageSelection(file: File | null) {
    if (!file) {
      setForm((current) => ({
        ...current,
        imageUpload: null,
      }));
      setImageError(null);
      setImagePreview(item?.imageUrl ?? null);
      return;
    }

    if (!acceptedImageTypes.includes(file.type as (typeof acceptedImageTypes)[number])) {
      setImageError("Formats autorisés : PNG, JPG/JPEG ou WEBP.");
      return;
    }

    if (file.size > maxImageSizeInBytes) {
      setImageError("Le fichier dépasse 4 Mo.");
      return;
    }

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Image loading failed"));
      reader.readAsDataURL(file);
    });

    const imageUpload: MenuImageUploadInput = {
      fileName: file.name,
      mimeType: file.type as MenuImageUploadInput["mimeType"],
      dataUrl,
    };

    setForm((current) => ({
      ...current,
      imageUrl: current.imageUpload ? "" : current.imageUrl,
      imageUpload,
    }));
    setImagePreview(dataUrl);
    setImageError(null);
  }

  function clearLocalImageSelection() {
    const fallbackImage = currentImageUrl(form.imageUrl) ?? item?.imageUrl ?? null;

    setForm((current) => ({
      ...current,
      imageUpload: null,
    }));
    setImageError(null);
    setImagePreview(fallbackImage);
  }

  function currentImageUrl(imageUrl: string | null | undefined) {
    return imageUrl && imageUrl.length > 0 ? imageUrl : null;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      ...form,
      imageUrl: form.imageUpload ? null : form.imageUrl || null,
    });
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Ajouter un plat" : "Modifier le plat"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Ajoutez un nouvel item au menu pour enrichir l’offre du restaurant."
              : "Mettez à jour les informations du plat, son prix ou sa disponibilité."}
          </DialogDescription>
        </DialogHeader>

        <form className="flex min-h-0 flex-1 flex-col" noValidate onSubmit={handleSubmit}>
          <DialogBody className="space-y-4">
            <Input
              label="Nom du plat"
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Tataki de saumon"
              required
              value={form.name}
            />
            <Textarea
              label="Description"
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              placeholder="Description courte du plat"
              required
              value={form.description}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Catégorie"
                onValueChange={(value) => setForm((current) => ({ ...current, category: value as CreateMenuItemInput["category"] }))}
                options={menuCategoryOptions}
                value={form.category}
              />
              <Input
                label="Prix"
                min="1"
                onChange={(event) => setForm((current) => ({ ...current, price: Number(event.target.value) }))}
                required
                step="0.01"
                type="number"
                value={String(form.price)}
              />
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-label text-foreground">Image locale</p>
                <p className="text-body-sm text-muted-foreground">
                  PNG, JPG/JPEG ou WEBP, 4 Mo maximum. Le backend enregistrera le fichier dans le dossier public.
                </p>
              </div>
              <input
                accept="image/png,image/jpeg,image/webp"
                className="block w-full rounded-sm border border-border/70 bg-white px-4 py-3 text-body-sm text-foreground file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-3 file:py-2 file:text-body-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                onChange={(event) => handleImageSelection(event.target.files?.[0] ?? null)}
                type="file"
              />
              {form.imageUpload ? (
                <Button onClick={clearLocalImageSelection} type="button" variant="ghost">
                  Retirer l’image locale
                </Button>
              ) : null}
              {imageError ? <p className="text-body-sm text-error">{imageError}</p> : null}
            </div>
            {imagePreview ? (
              <MenuItemImage
                alt={form.name || "Aperçu du plat"}
                className="h-56"
                contain
                sizes="(min-width: 768px) 640px, 100vw"
                src={imagePreview}
              />
            ) : null}
            <div className="flex items-center justify-between rounded-lg border border-border/70 bg-background/60 px-4 py-3">
              <div>
                <p className="text-label text-foreground">Disponible à la vente</p>
                <p className="text-body-sm text-muted-foreground">Active ou retire temporairement l’item de la carte.</p>
              </div>
              <Switch checked={form.available} onCheckedChange={(checked) => setForm((current) => ({ ...current, available: checked }))} />
            </div>
          </DialogBody>

          <DialogFooter className="border-t border-border/60 pt-4">
            <Button onClick={() => onOpenChange(false)} type="button" variant="ghost">
              Annuler
            </Button>
            <Button
              disabled={!form.name.trim() || !form.description.trim() || form.price <= 0}
              loading={saving}
              type="submit"
            >
              {mode === "create" ? "Créer le plat" : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
