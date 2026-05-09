import { randomUUID } from "node:crypto";

import type { CreateOrderInput, Order, OrderStatus } from "./orders.types";

let currentOrderNumber = 1049;

const orders: Order[] = [
  {
    id: "7b6fa1e0-1795-4cec-9be4-c7322258e748",
    orderNumber: 1048,
    customerName: "Camille Laurent",
    totalAmount: 42,
    status: "ready",
    itemsCount: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2367e233-bc99-4a3c-bfcf-9228806dcb78",
    orderNumber: 1047,
    customerName: "Noah Bernard",
    totalAmount: 28.5,
    status: "preparing",
    itemsCount: 1,
    createdAt: new Date(Date.now() - 1_800_000).toISOString(),
  },
  {
    id: "42d5bce7-8f19-45bf-84b0-5ce1d4d9f4ee",
    orderNumber: 1046,
    customerName: "Emma Petit",
    totalAmount: 56.2,
    status: "delivered",
    itemsCount: 3,
    createdAt: new Date(Date.now() - 3_600_000).toISOString(),
  },
];

export class OrdersRepository {
  async findAll(status?: OrderStatus) {
    return status ? orders.filter((order) => order.status === status) : orders;
  }

  async findById(id: string) {
    return orders.find((order) => order.id === id) ?? null;
  }

  async create(input: CreateOrderInput) {
    const order: Order = {
      id: randomUUID(),
      orderNumber: currentOrderNumber++,
      customerName: input.customerName,
      totalAmount: input.totalAmount,
      status: "pending",
      itemsCount: input.itemsCount,
      createdAt: new Date().toISOString(),
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
