import { Router } from "express";

import { createCustomer, deleteCustomer, getCustomerById, listCustomers, updateCustomer } from "./customers.controller";

export const customersRouter = Router();

customersRouter.get("/", listCustomers);
customersRouter.get("/:id", getCustomerById);
customersRouter.post("/", createCustomer);
customersRouter.put("/:id", updateCustomer);
customersRouter.delete("/:id", deleteCustomer);
