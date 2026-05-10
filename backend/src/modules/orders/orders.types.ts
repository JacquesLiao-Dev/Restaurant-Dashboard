import { z } from "zod";

export const orderStatusSchema = z.enum(["pending", "preparing", "ready", "delivered", "cancelled"]);

export type OrderStatus = z.infer<typeof orderStatusSchema>;

export type OrderLineItem = {
  menuItemId: string;
  name: string;
  category: "starter" | "main" | "dessert" | "drink";
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  imageUrl: string | null;
};

export type Order = {
  id: string;
  orderNumber: number;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  itemsCount: number;
  items: OrderLineItem[];
  createdAt: string;
};

export const createOrderLineItemSchema = z.object({
  menuItemId: z.string().uuid(),
  quantity: z.coerce.number().int().positive().max(20),
});

export const createOrderSchema = z.object({
  customerId: z.string().uuid(),
  purchasedAt: z.string().datetime(),
  items: z.array(createOrderLineItemSchema).min(1).max(20),
});

export const updateOrderStatusSchema = z.object({
  status: orderStatusSchema,
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type CreateOrderLineItemInput = z.infer<typeof createOrderLineItemSchema>;

export type PersistedOrderInput = {
  customerName: string;
  totalAmount: number;
  itemsCount: number;
  items: OrderLineItem[];
  createdAt: string;
};
