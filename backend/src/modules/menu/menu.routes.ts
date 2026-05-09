import { Router } from "express";

import { createMenuItem, deleteMenuItem, getMenuItemById, listMenuItems, updateMenuItem } from "./menu.controller";

export const menuRouter = Router();

menuRouter.get("/", listMenuItems);
menuRouter.get("/:id", getMenuItemById);
menuRouter.post("/", createMenuItem);
menuRouter.put("/:id", updateMenuItem);
menuRouter.delete("/:id", deleteMenuItem);
