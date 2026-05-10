import { MenuRepository } from "./menu.repository";
import type { CreateMenuItemInput, MenuCategory, UpdateMenuItemInput } from "./menu.types";
import { AppError } from "../../shared/app-error";

export class MenuService {
  constructor(private readonly repository = new MenuRepository()) {}

  async list(filters?: { search?: string; category?: MenuCategory }) {
    return this.repository.findAll(filters);
  }

  async getById(id: string) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new AppError("Menu item not found", 404);
    }

    return item;
  }

  async create(input: CreateMenuItemInput) {
    return this.repository.create(input);
  }

  async update(id: string, input: UpdateMenuItemInput) {
    const item = await this.repository.update(id, input);

    if (!item) {
      throw new AppError("Menu item not found", 404);
    }

    return item;
  }

  async delete(id: string) {
    const deleted = await this.repository.delete(id);

    if (!deleted) {
      throw new AppError("Menu item not found", 404);
    }
  }
}
