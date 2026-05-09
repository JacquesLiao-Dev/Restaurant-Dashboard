import type { RestaurantSettings, UpdateSettingsInput } from "./settings.types";

let settings: RestaurantSettings = {
  restaurantName: "Fuwasaki",
  contactEmail: "contact@fuwasaki.fr",
  phone: "+33 1 45 67 89 10",
  address: "18 rue des Halles, Paris",
  openingHours: [
    { day: "Lundi", open: "12:00", close: "22:30", closed: false },
    { day: "Mardi", open: "12:00", close: "22:30", closed: false },
    { day: "Mercredi", open: "12:00", close: "22:30", closed: false },
    { day: "Jeudi", open: "12:00", close: "22:30", closed: false },
    { day: "Vendredi", open: "12:00", close: "23:30", closed: false },
    { day: "Samedi", open: "12:00", close: "23:30", closed: false },
    { day: "Dimanche", open: "12:00", close: "21:30", closed: false },
  ],
  notifications: {
    newOrders: true,
    dailySummary: true,
    lowStockAlerts: false,
  },
  preferences: {
    compactMode: false,
    showRevenue: true,
  },
  updatedAt: new Date().toISOString(),
};

export class SettingsRepository {
  async get() {
    return settings;
  }

  async update(input: UpdateSettingsInput) {
    settings = {
      ...settings,
      ...input,
      notifications: {
        ...settings.notifications,
        ...input.notifications,
      },
      preferences: {
        ...settings.preferences,
        ...input.preferences,
      },
      updatedAt: new Date().toISOString(),
    };

    return settings;
  }
}
