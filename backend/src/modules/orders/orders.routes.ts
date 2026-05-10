import { Router } from "express";

import { createOrder, getOrderById, listOrders, updateOrderStatus } from "./orders.controller";

export const ordersRouter = Router();

ordersRouter.get("/", listOrders);
ordersRouter.get("/:id", getOrderById);
ordersRouter.post("/", createOrder);
ordersRouter.put("/:id/status", updateOrderStatus);
