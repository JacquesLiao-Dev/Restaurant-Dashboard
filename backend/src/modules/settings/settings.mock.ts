import type { RestaurantSettings } from "./settings.types";

export function createMockSettings(): RestaurantSettings {
  return {
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
}
