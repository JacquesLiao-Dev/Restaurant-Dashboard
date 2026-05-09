import { OrdersRepository } from "./orders.repository";
import type { CreateOrderInput, OrderStatus } from "./orders.types";
import { AppError } from "../../shared/app-error";

export class OrdersService {
  constructor(private readonly repository = new OrdersRepository()) {}

  async list(status?: OrderStatus) {
    return this.repository.findAll(status);
  }

  async getById(id: string) {
    const order = await this.repository.findById(id);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    return order;
  }

  async create(input: CreateOrderInput) {
    return this.repository.create(input);
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.repository.updateStatus(id, status);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    return order;
  }
}
