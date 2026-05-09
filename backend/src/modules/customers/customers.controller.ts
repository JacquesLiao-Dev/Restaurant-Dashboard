import type { NextFunction, Request, Response } from "express";

import { CustomersService } from "./customers.service";
import { createCustomerSchema, customerStatusSchema, updateCustomerSchema } from "./customers.types";

const customersService = new CustomersService();

export async function listCustomers(request: Request, response: Response, next: NextFunction) {
  try {
    const search = typeof request.query.search === "string" ? request.query.search : undefined;
    const parsedStatus =
      typeof request.query.status === "string" ? customerStatusSchema.safeParse(request.query.status) : undefined;

    const customers = await customersService.list({
      search,
      status: parsedStatus?.success ? parsedStatus.data : undefined,
    });

    return response.json(customers);
  } catch (error) {
    return next(error);
  }
}

export async function getCustomerById(request: Request, response: Response, next: NextFunction) {
  try {
    const customer = await customersService.getById(request.params.id);
    return response.json(customer);
  } catch (error) {
    return next(error);
  }
}

export async function createCustomer(request: Request, response: Response, next: NextFunction) {
  try {
    const payload = createCustomerSchema.parse(request.body);
    const customer = await customersService.create(payload);
    return response.status(201).json(customer);
  } catch (error) {
    return next(error);
  }
}

export async function updateCustomer(request: Request, response: Response, next: NextFunction) {
  try {
    const payload = updateCustomerSchema.parse(request.body);
    const customer = await customersService.update(request.params.id, payload);
    return response.json(customer);
  } catch (error) {
    return next(error);
  }
}

export async function deleteCustomer(request: Request, response: Response, next: NextFunction) {
  try {
    await customersService.delete(request.params.id);
    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
}
