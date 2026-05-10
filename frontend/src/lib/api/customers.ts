import { apiRequest } from "@/lib/api/client";
import type { CreateCustomerInput, Customer, CustomerStatus, UpdateCustomerInput } from "@/lib/api/types";

export function listCustomers(filters?: { search?: string; status?: CustomerStatus }) {
  return apiRequest<Customer[]>("/customers", {
    query: filters,
  });
}

export function getCustomer(id: string) {
  return apiRequest<Customer>(`/customers/${id}`);
}

export function createCustomer(payload: CreateCustomerInput) {
  return apiRequest<Customer>("/customers", {
    method: "POST",
    body: payload,
  });
}

export function updateCustomer(id: string, payload: UpdateCustomerInput) {
  return apiRequest<Customer>(`/customers/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteCustomer(id: string) {
  return apiRequest<void>(`/customers/${id}`, {
    method: "DELETE",
  });
}
