import { randomUUID } from "node:crypto";

import type {
  CreateCustomerInput,
  Customer,
  CustomerStatus,
  UpdateCustomerInput,
} from "./customers.types";

const customers: Customer[] = [
  {
    id: "0f6f8c33-c5d5-49f3-89bd-e5420c2cb1a1",
    name: "Camille Laurent",
    email: "camille@demo.fr",
    phone: "+33 6 12 34 56 78",
    ordersCount: 18,
    lastOrderAt: new Date().toISOString(),
    status: "vip",
    createdAt: new Date().toISOString(),
  },
  {
    id: "8300de93-d0a2-4db4-b9e8-f93d4a112c9a",
    name: "Noah Bernard",
    email: "noah@demo.fr",
    phone: "+33 6 98 76 54 32",
    ordersCount: 12,
    lastOrderAt: new Date(Date.now() - 86_400_000).toISOString(),
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "45e1d112-5179-448a-9b66-f38c0e90c2f4",
    name: "Emma Petit",
    email: "emma@demo.fr",
    phone: "+33 6 77 88 99 00",
    ordersCount: 4,
    lastOrderAt: new Date(Date.now() - 259_200_000).toISOString(),
    status: "new",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4a3158bc-d20b-43bf-99af-a5f29d40a7cc",
    name: "Léa Moreau",
    email: "lea@demo.fr",
    phone: "+33 6 44 55 66 77",
    ordersCount: 7,
    lastOrderAt: new Date(Date.now() - 172_800_000).toISOString(),
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "c4d2c0f5-9379-4f4e-96f7-58345fd3e53a",
    name: "Sofia Nguyen",
    email: "sofia@demo.fr",
    phone: "+33 6 22 11 33 55",
    ordersCount: 10,
    lastOrderAt: new Date(Date.now() - 604_800_000).toISOString(),
    status: "vip",
    createdAt: new Date().toISOString(),
  },
  {
    id: "319c9e81-97a0-4aef-bf88-b2cdfb52f1e9",
    name: "Hugo Martin",
    email: "hugo@demo.fr",
    phone: "+33 6 90 10 20 30",
    ordersCount: 2,
    lastOrderAt: new Date(Date.now() - 7_776_000_000).toISOString(),
    status: "inactive",
    createdAt: new Date().toISOString(),
  },
];

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

  async findByName(name: string) {
    return (
      customers.find((customer) => customer.name.trim().toLowerCase() === name.trim().toLowerCase()) ?? null
    );
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
