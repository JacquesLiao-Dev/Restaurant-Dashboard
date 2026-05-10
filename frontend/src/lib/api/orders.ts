import { apiRequest } from "@/lib/api/client";
import type { CreateOrderInput, Order, OrderStatus } from "@/lib/api/types";

export function listOrders(status?: OrderStatus) {
  return apiRequest<Order[]>("/orders", {
    query: {
      status,
    },
  });
}

export function getOrder(id: string) {
  return apiRequest<Order>(`/orders/${id}`);
}

export function createOrder(payload: CreateOrderInput) {
  return apiRequest<Order>("/orders", {
    method: "POST",
    body: payload,
  });
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  return apiRequest<Order>(`/orders/${id}/status`, {
    method: "PUT",
    body: {
      status,
    },
  });
}
