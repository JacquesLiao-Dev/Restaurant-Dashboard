import type { NextFunction, Request, Response } from "express";

import { OrdersService } from "./orders.service";
import { createOrderSchema, orderStatusSchema, updateOrderStatusSchema } from "./orders.types";

const ordersService = new OrdersService();

export async function listOrders(request: Request, response: Response, next: NextFunction) {
  try {
    const parsedStatus =
      typeof request.query.status === "string" ? orderStatusSchema.safeParse(request.query.status) : undefined;

    const orders = await ordersService.list(parsedStatus?.success ? parsedStatus.data : undefined);
    return response.json(orders);
  } catch (error) {
    return next(error);
  }
}

export async function getOrderById(request: Request, response: Response, next: NextFunction) {
  try {
    const order = await ordersService.getById(request.params.id);
    return response.json(order);
  } catch (error) {
    return next(error);
  }
}

export async function createOrder(request: Request, response: Response, next: NextFunction) {
  try {
    const payload = createOrderSchema.parse(request.body);
    const order = await ordersService.create(payload);
    return response.status(201).json(order);
  } catch (error) {
    return next(error);
  }
}

export async function updateOrderStatus(request: Request, response: Response, next: NextFunction) {
  try {
    const payload = updateOrderStatusSchema.parse(request.body);
    const order = await ordersService.updateStatus(request.params.id, payload.status);
    return response.json(order);
  } catch (error) {
    return next(error);
  }
}
