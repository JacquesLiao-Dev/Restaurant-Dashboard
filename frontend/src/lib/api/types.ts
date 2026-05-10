export type CustomerStatus = "active" | "new" | "vip" | "inactive";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  lastOrderAt: string | null;
  status: CustomerStatus;
  createdAt: string;
};

export type CreateCustomerInput = {
  name: string;
  email: string;
  phone: string;
  status: CustomerStatus;
};

export type UpdateCustomerInput = Partial<CreateCustomerInput>;

export type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled";

export type OrderLineItem = {
  menuItemId: string;
  name: string;
  category: MenuCategory;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  imageUrl: string | null;
};

export type Order = {
  id: string;
  orderNumber: number;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  itemsCount: number;
  items: OrderLineItem[];
  createdAt: string;
};

export type CreateOrderInput = {
  customerId: string;
  purchasedAt: string;
  items: Array<{
    menuItemId: string;
    quantity: number;
  }>;
};

export type MenuCategory = "starter" | "main" | "dessert" | "drink";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  available: boolean;
  imageUrl: string | null;
  createdAt: string;
};

export type MenuImageUploadInput = {
  fileName: string;
  mimeType: "image/png" | "image/jpeg" | "image/webp";
  dataUrl: string;
};

export type CreateMenuItemInput = {
  name: string;
  description: string;
  category: MenuCategory;
  price: number;
  available: boolean;
  imageUrl?: string | null;
  imageUpload?: MenuImageUploadInput | null;
};

export type UpdateMenuItemInput = Partial<CreateMenuItemInput>;

export type OpeningHour = {
  day: string;
  open: string;
  close: string;
  closed: boolean;
};

export type RestaurantSettings = {
  restaurantName: string;
  contactEmail: string;
  phone: string;
  address: string;
  openingHours: OpeningHour[];
  notifications: {
    newOrders: boolean;
    dailySummary: boolean;
    lowStockAlerts: boolean;
  };
  preferences: {
    compactMode: boolean;
    showRevenue: boolean;
  };
  updatedAt: string;
};

export type UpdateSettingsInput = Partial<RestaurantSettings> & {
  notifications?: Partial<RestaurantSettings["notifications"]>;
  preferences?: Partial<RestaurantSettings["preferences"]>;
};
