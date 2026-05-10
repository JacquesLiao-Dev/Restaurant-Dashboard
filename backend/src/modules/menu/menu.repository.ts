import { randomUUID } from "node:crypto";

import { storeMenuImage } from "./menu-image.storage";
import { createMockMenuItems } from "./menu.mock";
import type {
  CreateMenuItemInput,
  MenuCategory,
  MenuItem,
  UpdateMenuItemInput,
} from "./menu.types";

const menuItems: MenuItem[] = createMockMenuItems();

export class MenuRepository {
  async findAll(filters?: { search?: string; category?: MenuCategory }) {
    const search = filters?.search?.toLowerCase().trim();

    return menuItems.filter((item) => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search);

      const matchesCategory = !filters?.category || item.category === filters.category;

      return matchesSearch && matchesCategory;
    });
  }

  async findById(id: string) {
    return menuItems.find((item) => item.id === id) ?? null;
  }

  async findManyByIds(ids: string[]) {
    return menuItems.filter((item) => ids.includes(item.id));
  }

  async create(input: CreateMenuItemInput) {
    const imageUrl = input.imageUpload ? await storeMenuImage(input.imageUpload) : input.imageUrl ?? null;
    const item: MenuItem = {
      id: randomUUID(),
      name: input.name,
      description: input.description,
      category: input.category,
      price: input.price,
      available: input.available,
      imageUrl,
      createdAt: new Date().toISOString(),
    };

    menuItems.unshift(item);
    return item;
  }

  async update(id: string, input: UpdateMenuItemInput) {
    const index = menuItems.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    let imageUrl = menuItems[index].imageUrl;

    if (input.imageUpload) {
      imageUrl = await storeMenuImage(input.imageUpload);
    } else if (input.imageUrl !== undefined) {
      imageUrl = input.imageUrl;
    }

    const { imageUpload: _imageUpload, imageUrl: _providedImageUrl, ...rest } = input;

    menuItems[index] = {
      ...menuItems[index],
      ...rest,
      imageUrl,
    };

    return menuItems[index];
  }

  async delete(id: string) {
    const index = menuItems.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    menuItems.splice(index, 1);
    return true;
  }
}
