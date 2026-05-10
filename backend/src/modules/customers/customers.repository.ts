import { randomUUID } from "node:crypto";

import { createMockCustomers } from "./customers.mock";
import type {
  CreateCustomerInput,
  Customer,
  CustomerStatus,
  UpdateCustomerInput,
} from "./customers.types";

const customers: Customer[] = createMockCustomers();

export class CustomersRepository {
  async findAll(filters?: { search?: string; status?: CustomerStatus }) {
    const search = filters?.search?.toLowerCase().trim();

    return customers.filter((customer) => {
      const matchesSearch =
        !search ||
        customer.name.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search) ||
        customer.phone.toLowerCase().includes(search);

      const matchesStatus = !filters?.status || customer.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }

  async findById(id: string) {
    return customers.find((customer) => customer.id === id) ?? null;
  }

  async create(input: CreateCustomerInput) {
    const customer: Customer = {
      id: randomUUID(),
      name: input.name,
      email: input.email,
      phone: input.phone,
      ordersCount: 0,
      lastOrderAt: null,
      status: input.status,
      createdAt: new Date().toISOString(),
    };

    customers.unshift(customer);

    return customer;
  }

  async update(id: string, input: UpdateCustomerInput) {
    const index = customers.findIndex((customer) => customer.id === id);

    if (index === -1) {
      return null;
    }

    customers[index] = {
      ...customers[index],
      ...input,
    };

    return customers[index];
  }

  async recordOrderById(id: string, orderedAt: string) {
    const index = customers.findIndex((customer) => customer.id === id);

    if (index === -1) {
      return null;
    }

    customers[index] = {
      ...customers[index],
      ordersCount: customers[index].ordersCount + 1,
      lastOrderAt: orderedAt,
    };

    return customers[index];
  }

  async delete(id: string) {
    const index = customers.findIndex((customer) => customer.id === id);

    if (index === -1) {
      return false;
    }

    customers.splice(index, 1);
    return true;
  }
}
