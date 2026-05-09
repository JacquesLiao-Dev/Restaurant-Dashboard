import { z } from "zod";

export const customerStatusSchema = z.enum(["active", "new", "vip", "inactive"]);

export type CustomerStatus = z.infer<typeof customerStatusSchema>;

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  lastOrderAt: string | null;
  status: CustomerStatus;
  createdAt: string;
};

export const createCustomerSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(32),
  status: customerStatusSchema.default("new"),
});

export const updateCustomerSchema = createCustomerSchema.partial();

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
