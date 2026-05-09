import { randomUUID } from "node:crypto";

import type { CreateMenuItemInput, MenuCategory, MenuItem, UpdateMenuItemInput } from "./menu.types";

const menuItems: MenuItem[] = [
  {
    id: "fce2ad29-8550-4567-905c-560d9e9f9e31",
    name: "Tataki de saumon",
    description: "Sésame noir, ponzu agrumes.",
    category: "starter",
    price: 18,
    available: true,
    imageUrl: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "ce4829ef-988d-44fb-a418-e79907ed8a37",
    name: "Risotto citron & thym",
    description: "Parmesan affiné, thym frais, zestes de citron.",
    category: "main",
    price: 24,
    available: true,
    imageUrl: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "b4a94e7f-3e83-4ba3-b2f0-f8a77b8c54da",
    name: "Cheesecake yuzu",
    description: "Texture légère et base spéculoos.",
    category: "dessert",
    price: 11,
    available: false,
    imageUrl: null,
    createdAt: new Date().toISOString(),
  },
];

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

  async create(input: CreateMenuItemInput) {
    const item: MenuItem = {
      id: randomUUID(),
      name: input.name,
      description: input.description,
      category: input.category,
      price: input.price,
      available: input.available,
      imageUrl: input.imageUrl ?? null,
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

    menuItems[index] = {
      ...menuItems[index],
      ...input,
      imageUrl: input.imageUrl === undefined ? menuItems[index].imageUrl : input.imageUrl,
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
