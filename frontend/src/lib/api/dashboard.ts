import { listCustomers } from "@/lib/api/customers";
import { listMenuItems } from "@/lib/api/menu";
import { listOrders } from "@/lib/api/orders";
import { getSettings } from "@/lib/api/settings";

export async function getDashboardOverview() {
  const [customers, orders, menuItems, settings] = await Promise.all([
    listCustomers(),
    listOrders(),
    listMenuItems(),
    getSettings(),
  ]);

  return {
    customers,
    orders,
    menuItems,
    settings,
  };
}
