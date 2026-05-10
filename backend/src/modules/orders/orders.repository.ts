import { randomUUID } from "node:crypto";

import type { Order, OrderStatus, PersistedOrderInput } from "./orders.types";
import { createMockOrders } from "./orders.mock";

const orders: Order[] = createMockOrders();

let currentOrderNumber = Math.max(...orders.map((order) => order.orderNumber)) + 1;

export class OrdersRepository {
  async findAll(status?: OrderStatus) {
    return status ? orders.filter((order) => order.status === status) : orders;
  }

  async findById(id: string) {
    return orders.find((order) => order.id === id) ?? null;
  }

  async create(input: PersistedOrderInput) {
    const order: Order = {
      id: randomUUID(),
      orderNumber: currentOrderNumber++,
      customerName: input.customerName,
      totalAmount: input.totalAmount,
      status: "pending",
      itemsCount: input.itemsCount,
      items: input.items,
      createdAt: input.createdAt,
    };

    orders.unshift(order);
    return order;
  }

  async updateStatus(id: string, status: OrderStatus) {
    const index = orders.findIndex((order) => order.id === id);

    if (index === -1) {
      return null;
    }

    orders[index] = {
      ...orders[index],
      status,
    };

    return orders[index];
  }
}
