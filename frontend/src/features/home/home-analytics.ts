import type { Customer, MenuItem, Order } from "@/lib/api";

export type ChartPoint = {
  label: string;
  shortLabel: string;
  secondaryLabel?: string;
  value: number;
};

export type MetricSnapshot = {
  current: number;
  previous: number;
  change: number | null;
};

export type TopMenuInsight = {
  id: string;
  name: string;
  category: MenuItem["category"];
  imageUrl: string | null;
  soldCount: number;
  revenue: number;
};

export type TopCustomerInsight = {
  id: string;
  name: string;
  status: Customer["status"] | "active";
  ordersCount: number;
  revenue: number;
  lastOrderAt: string;
};

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);

  return next;
}

function addDays(date: Date, value: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + value);

  return next;
}

function startOfWeek(date: Date) {
  const next = startOfDay(date);
  const day = next.getDay();
  const delta = day === 0 ? -6 : 1 - day;

  return addDays(next, delta);
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function calculateChange(current: number, previous: number) {
  if (previous === 0) {
    return current === 0 ? 0 : null;
  }

  return ((current - previous) / previous) * 100;
}

function toDate(value: string) {
  return new Date(value);
}

function buildDailyPoints(count: number) {
  const today = startOfDay(new Date());

  return Array.from({ length: count }, (_, index) => {
    const date = addDays(today, index - (count - 1));

    return {
      key: date.toISOString(),
      date,
      label: new Intl.DateTimeFormat("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      }).format(date),
      shortLabel: new Intl.DateTimeFormat("fr-FR", { weekday: "short" }).format(date),
      secondaryLabel: new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" }).format(date),
    };
  });
}

function buildWeeklyPoints(count: number) {
  const currentWeek = startOfWeek(new Date());

  return Array.from({ length: count }, (_, index) => {
    const date = addDays(currentWeek, (index - (count - 1)) * 7);
    const endDate = addDays(date, 6);

    return {
      key: date.toISOString(),
      date,
      label: `Semaine du ${new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short" }).format(date)} au ${new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(endDate)}`,
      shortLabel: `${new Intl.DateTimeFormat("fr-FR", { day: "2-digit" }).format(date)}-${new Intl.DateTimeFormat("fr-FR", { day: "2-digit" }).format(endDate)}`,
      secondaryLabel: new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(endDate),
    };
  });
}

function buildMonthlyPoints(count: number) {
  const currentMonth = startOfMonth(new Date());

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - (count - 1) + index, 1);

    return {
      key: date.toISOString(),
      date,
      label: new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(date),
      shortLabel: new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(date),
      secondaryLabel: new Intl.DateTimeFormat("fr-FR", { year: "numeric" }).format(date),
    };
  });
}

export function getRevenueSnapshot(orders: Order[]): MetricSnapshot {
  const today = startOfDay(new Date());
  const yesterday = addDays(today, -1);
  const todayRevenue = orders
    .filter((order) => isSameDay(toDate(order.createdAt), today))
    .reduce((total, order) => total + order.totalAmount, 0);
  const yesterdayRevenue = orders
    .filter((order) => isSameDay(toDate(order.createdAt), yesterday))
    .reduce((total, order) => total + order.totalAmount, 0);

  return {
    current: Number(todayRevenue.toFixed(2)),
    previous: Number(yesterdayRevenue.toFixed(2)),
    change: calculateChange(todayRevenue, yesterdayRevenue),
  };
}

export function getTodayOrdersSnapshot(orders: Order[]): MetricSnapshot {
  const today = startOfDay(new Date());
  const yesterday = addDays(today, -1);
  const todayOrders = orders.filter((order) => isSameDay(toDate(order.createdAt), today)).length;
  const yesterdayOrders = orders.filter((order) => isSameDay(toDate(order.createdAt), yesterday)).length;

  return {
    current: todayOrders,
    previous: yesterdayOrders,
    change: calculateChange(todayOrders, yesterdayOrders),
  };
}

export function getTrackedCustomersSnapshot(orders: Order[]): MetricSnapshot {
  const today = startOfDay(new Date());
  const yesterday = addDays(today, -1);
  const todayCustomers = new Set(
    orders.filter((order) => isSameDay(toDate(order.createdAt), today)).map((order) => order.customerName),
  ).size;
  const yesterdayCustomers = new Set(
    orders.filter((order) => isSameDay(toDate(order.createdAt), yesterday)).map((order) => order.customerName),
  ).size;

  return {
    current: todayCustomers,
    previous: yesterdayCustomers,
    change: calculateChange(todayCustomers, yesterdayCustomers),
  };
}

export function getTotalRevenue(orders: Order[]) {
  return Number(orders.reduce((total, order) => total + order.totalAmount, 0).toFixed(2));
}

export function getRevenueSeries(orders: Order[], period: "day" | "week" | "month"): ChartPoint[] {
  const points = period === "day" ? buildDailyPoints(7) : period === "week" ? buildWeeklyPoints(8) : buildMonthlyPoints(6);

  return points.map((point, index) => {
    const value = orders.reduce((total, order) => {
      const orderDate = toDate(order.createdAt);

      if (period === "day") {
        return isSameDay(orderDate, point.date) ? total + order.totalAmount : total;
      }

      if (period === "week") {
        const nextWeek = index === points.length - 1 ? addDays(point.date, 7) : points[index + 1].date;
        return orderDate >= point.date && orderDate < nextWeek ? total + order.totalAmount : total;
      }

      const nextMonth =
        index === points.length - 1
          ? new Date(point.date.getFullYear(), point.date.getMonth() + 1, 1)
          : points[index + 1].date;

      return orderDate >= point.date && orderDate < nextMonth ? total + order.totalAmount : total;
    }, 0);

    return {
      label: point.label,
      shortLabel: point.shortLabel,
      secondaryLabel: point.secondaryLabel,
      value: Number(value.toFixed(2)),
    };
  });
}

export function getOrdersSeries(orders: Order[], period: "day" | "month"): ChartPoint[] {
  const points = period === "day" ? buildDailyPoints(7) : buildMonthlyPoints(6);

  return points.map((point, index) => {
    const value = orders.filter((order) => {
      const orderDate = toDate(order.createdAt);

      if (period === "day") {
        return isSameDay(orderDate, point.date);
      }

      const nextMonth =
        index === points.length - 1
          ? new Date(point.date.getFullYear(), point.date.getMonth() + 1, 1)
          : points[index + 1].date;

      return orderDate >= point.date && orderDate < nextMonth;
    }).length;

    return {
      label: point.label,
      shortLabel: point.shortLabel,
      secondaryLabel: point.secondaryLabel,
      value,
    };
  });
}

export function getTopSellingMenuItems(orders: Order[], menuItems: MenuItem[]) {
  const insights = new Map<string, TopMenuInsight>();

  for (const order of orders) {
    for (const item of order.items) {
      const current = insights.get(item.menuItemId);
      const menuItem = menuItems.find((entry) => entry.id === item.menuItemId);

      insights.set(item.menuItemId, {
        id: item.menuItemId,
        name: item.name,
        category: menuItem?.category ?? item.category,
        imageUrl: menuItem?.imageUrl ?? item.imageUrl,
        soldCount: (current?.soldCount ?? 0) + item.quantity,
        revenue: Number(((current?.revenue ?? 0) + item.lineTotal).toFixed(2)),
      });
    }
  }

  return [...insights.values()]
    .sort((left, right) => right.soldCount - left.soldCount || right.revenue - left.revenue)
    .slice(0, 8);
}

export function getTopCustomers(orders: Order[], customers: Customer[]) {
  const insights = new Map<string, TopCustomerInsight>();

  for (const order of orders) {
    const current = insights.get(order.customerName);
    const customer = customers.find((entry) => entry.name === order.customerName);

    insights.set(order.customerName, {
      id: customer?.id ?? order.customerName,
      name: order.customerName,
      status: customer?.status ?? "active",
      ordersCount: (current?.ordersCount ?? 0) + 1,
      revenue: Number(((current?.revenue ?? 0) + order.totalAmount).toFixed(2)),
      lastOrderAt: current ? (current.lastOrderAt > order.createdAt ? current.lastOrderAt : order.createdAt) : order.createdAt,
    });
  }

  return [...insights.values()]
    .sort((left, right) => right.revenue - left.revenue || right.ordersCount - left.ordersCount)
    .slice(0, 5);
}
