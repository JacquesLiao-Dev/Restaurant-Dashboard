import { apiRequest } from "@/lib/api/client";
import type { RestaurantSettings, UpdateSettingsInput } from "@/lib/api/types";

export function getSettings() {
  return apiRequest<RestaurantSettings>("/settings");
}

export function updateSettings(payload: UpdateSettingsInput) {
  return apiRequest<RestaurantSettings>("/settings", {
    method: "PUT",
    body: payload,
  });
}
