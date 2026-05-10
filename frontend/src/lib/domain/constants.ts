import type { CustomerStatus, MenuCategory, OrderStatus } from "@/lib/api/types";

export const customerStatusLabels: Record<CustomerStatus, string> = {
  active: "Actif",
  new: "Nouveau",
  vip: "VIP",
  inactive: "Inactif",
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: "En attente",
  preparing: "En préparation",
  ready: "Prête",
  delivered: "Livrée",
  cancelled: "Annulée",
};

export const menuCategoryLabels: Record<MenuCategory, string> = {
  starter: "Entrées",
  main: "Plats",
  dessert: "Desserts",
  drink: "Boissons",
};

export const customerStatusOptions = Object.entries(customerStatusLabels).map(([value, label]) => ({
  value,
  label,
}));

export const orderStatusOptions = Object.entries(orderStatusLabels).map(([value, label]) => ({
  value,
  label,
}));

export const menuCategoryOptions = Object.entries(menuCategoryLabels).map(([value, label]) => ({
  value,
  label,
}));

export function getCustomerBadgeVariant(status: CustomerStatus) {
  if (status === "vip") {
    return "warning" as const;
  }

  if (status === "new") {
    return "info" as const;
  }

  if (status === "inactive") {
    return "neutral" as const;
  }

  return "success" as const;
}

export function getOrderBadgeVariant(status: OrderStatus) {
  if (status === "pending") {
    return "warning" as const;
  }

  if (status === "preparing") {
    return "info" as const;
  }

  if (status === "cancelled") {
    return "error" as const;
  }

  if (status === "delivered") {
    return "secondary" as const;
  }

  return "success" as const;
}
