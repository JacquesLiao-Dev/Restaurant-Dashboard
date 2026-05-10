import { OrdersRepository } from "./orders.repository";
import type { CreateOrderInput, OrderStatus } from "./orders.types";
import { AppError } from "../../shared/app-error";
import { CustomersRepository } from "../customers/customers.repository";
import { MenuRepository } from "../menu/menu.repository";

export class OrdersService {
  constructor(
    private readonly repository = new OrdersRepository(),
    private readonly menuRepository = new MenuRepository(),
    private readonly customersRepository = new CustomersRepository(),
  ) {}

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
    const customer = await this.customersRepository.findById(input.customerId);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    const selectedMenuItems = await Promise.all(
      input.items.map(async (selection) => {
        const menuItem = await this.menuRepository.findById(selection.menuItemId);

        if (!menuItem) {
          throw new AppError("Menu item not found", 404);
        }

        if (!menuItem.available) {
          throw new AppError(`Menu item "${menuItem.name}" is unavailable`, 400);
        }

        return {
          menuItemId: menuItem.id,
          name: menuItem.name,
          category: menuItem.category,
          quantity: selection.quantity,
          unitPrice: menuItem.price,
          lineTotal: Number((menuItem.price * selection.quantity).toFixed(2)),
          imageUrl: menuItem.imageUrl,
        };
      }),
    );

    const totalAmount = Number(
      selectedMenuItems.reduce((total, item) => total + item.lineTotal, 0).toFixed(2),
    );
    const itemsCount = selectedMenuItems.reduce((total, item) => total + item.quantity, 0);

    const order = await this.repository.create({
      customerName: customer.name,
      totalAmount,
      itemsCount,
      items: selectedMenuItems,
      createdAt: input.purchasedAt,
    });

    await this.customersRepository.recordOrderById(customer.id, input.purchasedAt);

    return order;
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.repository.updateStatus(id, status);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    return order;
  }
}
