import { z } from "zod";

export const openingHourSchema = z.object({
  day: z.string().min(2).max(32),
  open: z.string().min(4).max(5),
  close: z.string().min(4).max(5),
  closed: z.boolean(),
});

export const notificationsSchema = z.object({
  newOrders: z.boolean(),
  dailySummary: z.boolean(),
  lowStockAlerts: z.boolean(),
});

export const preferencesSchema = z.object({
  compactMode: z.boolean(),
  showRevenue: z.boolean(),
});

export type RestaurantSettings = {
  restaurantName: string;
  contactEmail: string;
  phone: string;
  address: string;
  openingHours: Array<z.infer<typeof openingHourSchema>>;
  notifications: z.infer<typeof notificationsSchema>;
  preferences: z.infer<typeof preferencesSchema>;
  updatedAt: string;
};

export const updateSettingsSchema = z.object({
  restaurantName: z.string().min(2).max(120).optional(),
  contactEmail: z.string().email().optional(),
  phone: z.string().min(7).max(32).optional(),
  address: z.string().min(5).max(255).optional(),
  openingHours: z.array(openingHourSchema).min(1).optional(),
  notifications: notificationsSchema.partial().optional(),
  preferences: preferencesSchema.partial().optional(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
