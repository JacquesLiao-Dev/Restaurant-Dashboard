import { z } from "zod";

export const orderStatusSchema = z.enum(["pending", "preparing", "ready", "delivered", "cancelled"]);

export type OrderStatus = z.infer<typeof orderStatusSchema>;

export type Order = {
  id: string;
  orderNumber: number;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  itemsCount: number;
  createdAt: string;
};

export const createOrderSchema = z.object({
  customerName: z.string().min(2).max(120),
  totalAmount: z.coerce.number().positive(),
  itemsCount: z.coerce.number().int().positive(),
});

export const updateOrderStatusSchema = z.object({
  status: orderStatusSchema,
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
