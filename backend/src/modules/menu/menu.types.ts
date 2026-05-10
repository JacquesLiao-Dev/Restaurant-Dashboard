import { z } from "zod";

export const menuCategorySchema = z.enum(["starter", "main", "dessert", "drink"]);

export type MenuCategory = z.infer<typeof menuCategorySchema>;

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  available: boolean;
  imageUrl: string | null;
  createdAt: string;
};

export const menuImageUploadSchema = z.object({
  fileName: z.string().min(1).max(180),
  mimeType: z.enum(["image/png", "image/jpeg", "image/webp"]),
  dataUrl: z.string().min(20),
});

export type MenuImageUploadInput = z.infer<typeof menuImageUploadSchema>;

const menuImageUrlSchema = z
  .string()
  .trim()
  .refine((value) => value.startsWith("/images/") || z.string().url().safeParse(value).success, {
    message: "Invalid image URL",
  });

export const createMenuItemSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().min(2).max(400),
  category: menuCategorySchema,
  price: z.coerce.number().positive(),
  available: z.boolean().default(true),
  imageUrl: menuImageUrlSchema.nullable().optional(),
  imageUpload: menuImageUploadSchema.nullable().optional(),
});

export const updateMenuItemSchema = createMenuItemSchema.partial();

export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;
