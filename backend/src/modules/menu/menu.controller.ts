import type { NextFunction, Request, Response } from "express";

import { MenuService } from "./menu.service";
import { createMenuItemSchema, menuCategorySchema, updateMenuItemSchema } from "./menu.types";

const menuService = new MenuService();

export async function listMenuItems(request: Request, response: Response, next: NextFunction) {
  try {
    const search = typeof request.query.search === "string" ? request.query.search : undefined;
    const parsedCategory =
      typeof request.query.category === "string" ? menuCategorySchema.safeParse(request.query.category) : undefined;

    const menuItems = await menuService.list({
      search,
      category: parsedCategory?.success ? parsedCategory.data : undefined,
    });

    return response.json(menuItems);
  } catch (error) {
    return next(error);
  }
}

export async function getMenuItemById(request: Request, response: Response, next: NextFunction) {
  try {
    const item = await menuService.getById(request.params.id);
    return response.json(item);
  } catch (error) {
    return next(error);
  }
}

export async function createMenuItem(request: Request, response: Response, next: NextFunction) {
  try {
    const payload = createMenuItemSchema.parse(request.body);
    const item = await menuService.create(payload);
    return response.status(201).json(item);
  } catch (error) {
    return next(error);
  }
}

export async function updateMenuItem(request: Request, response: Response, next: NextFunction) {
  try {
    const payload = updateMenuItemSchema.parse(request.body);
    const item = await menuService.update(request.params.id, payload);
    return response.json(item);
  } catch (error) {
    return next(error);
  }
}

export async function deleteMenuItem(request: Request, response: Response, next: NextFunction) {
  try {
    await menuService.delete(request.params.id);
    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
}
