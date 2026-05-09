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

export const createMenuItemSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().min(2).max(400),
  category: menuCategorySchema,
  price: z.coerce.number().positive(),
  available: z.boolean().default(true),
  imageUrl: z.string().url().nullable().optional(),
});

export const updateMenuItemSchema = createMenuItemSchema.partial();

export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;
