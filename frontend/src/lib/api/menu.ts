import { apiRequest } from "@/lib/api/client";
import type { CreateMenuItemInput, MenuCategory, MenuItem, UpdateMenuItemInput } from "@/lib/api/types";

export function listMenuItems(filters?: { search?: string; category?: MenuCategory }) {
  return apiRequest<MenuItem[]>("/menu", {
    query: filters,
  });
}

export function getMenuItem(id: string) {
  return apiRequest<MenuItem>(`/menu/${id}`);
}

export function createMenuItem(payload: CreateMenuItemInput) {
  return apiRequest<MenuItem>("/menu", {
    method: "POST",
    body: payload,
  });
}

export function updateMenuItem(id: string, payload: UpdateMenuItemInput) {
  return apiRequest<MenuItem>(`/menu/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteMenuItem(id: string) {
  return apiRequest<void>(`/menu/${id}`, {
    method: "DELETE",
  });
}
