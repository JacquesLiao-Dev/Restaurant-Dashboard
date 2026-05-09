import { CustomersRepository } from "./customers.repository";
import type { CreateCustomerInput, CustomerStatus, UpdateCustomerInput } from "./customers.types";
import { AppError } from "../../shared/app-error";

export class CustomersService {
  constructor(private readonly repository = new CustomersRepository()) {}

  async list(filters?: { search?: string; status?: CustomerStatus }) {
    return this.repository.findAll(filters);
  }

  async getById(id: string) {
    const customer = await this.repository.findById(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    return customer;
  }

  async create(input: CreateCustomerInput) {
    return this.repository.create(input);
  }

  async update(id: string, input: UpdateCustomerInput) {
    const customer = await this.repository.update(id, input);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    return customer;
  }

  async delete(id: string) {
    const deleted = await this.repository.delete(id);

    if (!deleted) {
      throw new AppError("Customer not found", 404);
    }
  }
}
