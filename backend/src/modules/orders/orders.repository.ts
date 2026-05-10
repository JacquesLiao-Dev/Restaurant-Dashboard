import { randomUUID } from "node:crypto";

import type { Order, OrderLineItem, OrderStatus, PersistedOrderInput } from "./orders.types";

type CatalogItem = {
  id: string;
  name: string;
  category: OrderLineItem["category"];
  price: number;
  imageUrl: string | null;
};

const catalog: Record<string, CatalogItem> = {
  futomaki: {
    id: "5b4ff458-7d90-4d20-a26f-9ca07ea30231",
    name: "Futomaki signature",
    category: "main",
    price: 19,
    imageUrl: "/images/menu/futomaki.png",
  },
  makiSaumon: {
    id: "9af7271a-a321-4236-a3bf-fcd4f61c88a6",
    name: "Maki saumon",
    category: "starter",
    price: 14,
    imageUrl: "/images/menu/maki-saumon.png",
  },
  plateauMaki: {
    id: "f53b8b4b-1cc4-4f95-850d-91d6478f6d3a",
    name: "Plateau sushi maki",
    category: "main",
    price: 32,
    imageUrl: "/images/menu/menu-sushi-maki.jpg",
  },
  rolls: {
    id: "06b1b9d2-c2f8-4f92-b72f-e878035dbe33",
    name: "Rolls signature",
    category: "main",
    price: 28,
    imageUrl: "/images/menu/menu-sushi-rolls.jpg",
  },
  poulpe: {
    id: "7df66c25-fd5b-4c03-8b56-812d87bfda0d",
    name: "Sushi poulpe snacké",
    category: "starter",
    price: 17,
    imageUrl: "/images/menu/suchi-poulpe.png",
  },
  nem: {
    id: "ab5a99af-e0d7-4a43-aaef-817594f3027e",
    name: "Nem croustillant",
    category: "starter",
    price: 12,
    imageUrl: "/images/starter/nem.png",
  },
  glace: {
    id: "46c7b4ba-9f1e-4270-a1ad-ef12d048cf8a",
    name: "Glace vanille",
    category: "dessert",
    price: 7,
    imageUrl: "/images/dessert/vanilla-ice-cream.png",
  },
  biere: {
    id: "74f3dad8-3ea8-4f63-9d72-3f3932dd9a8d",
    name: "Bière artisanale",
    category: "drink",
    price: 8,
    imageUrl: "/images/drink/beer.png",
  },
  cafe: {
    id: "c8f41ba9-2da4-40e4-9e1a-2d2863842e8f",
    name: "Café serré",
    category: "drink",
    price: 4,
    imageUrl: "/images/drink/cafee.png",
  },
};

function createRelativeDate(daysAgo: number, hour: number, minute: number) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, minute, 0, 0);

  return date.toISOString();
}

function line(item: CatalogItem, quantity: number): OrderLineItem {
  return {
    menuItemId: item.id,
    name: item.name,
    category: item.category,
    quantity,
    unitPrice: item.price,
    lineTotal: Number((item.price * quantity).toFixed(2)),
    imageUrl: item.imageUrl,
  };
}

function buildSeedOrder(input: {
  id: string;
  orderNumber: number;
  customerName: string;
  status: OrderStatus;
  createdAt: string;
  items: OrderLineItem[];
}): Order {
  const totalAmount = Number(input.items.reduce((total, item) => total + item.lineTotal, 0).toFixed(2));
  const itemsCount = input.items.reduce((total, item) => total + item.quantity, 0);

  return {
    id: input.id,
    orderNumber: input.orderNumber,
    customerName: input.customerName,
    totalAmount,
    status: input.status,
    itemsCount,
    items: input.items,
    createdAt: input.createdAt,
  };
}

const orders: Order[] = [
  buildSeedOrder({
    id: "7b6fa1e0-1795-4cec-9be4-c7322258e748",
    orderNumber: 1048,
    customerName: "Camille Laurent",
    status: "ready",
    createdAt: createRelativeDate(0, 12, 15),
    items: [line(catalog.futomaki, 1), line(catalog.biere, 1)],
  }),
  buildSeedOrder({
    id: "2367e233-bc99-4a3c-bfcf-9228806dcb78",
    orderNumber: 1047,
    customerName: "Noah Bernard",
    status: "preparing",
    createdAt: createRelativeDate(0, 13, 40),
    items: [line(catalog.plateauMaki, 1)],
  }),
  buildSeedOrder({
    id: "42d5bce7-8f19-45bf-84b0-5ce1d4d9f4ee",
    orderNumber: 1046,
    customerName: "Emma Petit",
    status: "delivered",
    createdAt: createRelativeDate(0, 15, 10),
    items: [line(catalog.makiSaumon, 2), line(catalog.glace, 1), line(catalog.cafe, 1)],
  }),
  buildSeedOrder({
    id: "f0f9593f-0f12-4baa-953b-50d75a6f54f7",
    orderNumber: 1045,
    customerName: "Léa Moreau",
    status: "pending",
    createdAt: createRelativeDate(0, 19, 5),
    items: [line(catalog.rolls, 1), line(catalog.biere, 2)],
  }),
  buildSeedOrder({
    id: "bdf81584-9576-4985-bb9b-44989c0dcd98",
    orderNumber: 1044,
    customerName: "Sofia Nguyen",
    status: "delivered",
    createdAt: createRelativeDate(1, 12, 20),
    items: [line(catalog.futomaki, 2)],
  }),
  buildSeedOrder({
    id: "5f2f9502-ab04-4995-b4f5-c34f0226ca11",
    orderNumber: 1043,
    customerName: "Camille Laurent",
    status: "delivered",
    createdAt: createRelativeDate(1, 14, 10),
    items: [line(catalog.makiSaumon, 1), line(catalog.nem, 1), line(catalog.cafe, 2)],
  }),
  buildSeedOrder({
    id: "6811c8f8-a9b1-4fcc-86b4-7ea6196d8ef1",
    orderNumber: 1042,
    customerName: "Noah Bernard",
    status: "cancelled",
    createdAt: createRelativeDate(1, 20, 30),
    items: [line(catalog.plateauMaki, 1)],
  }),
  buildSeedOrder({
    id: "0ee0b38f-1a78-49ff-b287-bddc66914318",
    orderNumber: 1041,
    customerName: "Emma Petit",
    status: "delivered",
    createdAt: createRelativeDate(2, 13, 0),
    items: [line(catalog.poulpe, 1), line(catalog.biere, 1)],
  }),
  buildSeedOrder({
    id: "3a3ab5db-63b2-4464-801d-1ff6cf8141e3",
    orderNumber: 1040,
    customerName: "Léa Moreau",
    status: "ready",
    createdAt: createRelativeDate(2, 21, 15),
    items: [line(catalog.rolls, 1), line(catalog.glace, 2)],
  }),
  buildSeedOrder({
    id: "10a47af6-5c91-455f-86a7-b3c5e78fcb46",
    orderNumber: 1039,
    customerName: "Camille Laurent",
    status: "delivered",
    createdAt: createRelativeDate(3, 12, 40),
    items: [line(catalog.futomaki, 1), line(catalog.makiSaumon, 1), line(catalog.cafe, 1)],
  }),
  buildSeedOrder({
    id: "a67b8f17-277c-4a60-a9e0-5c1153a601b3",
    orderNumber: 1038,
    customerName: "Sofia Nguyen",
    status: "delivered",
    createdAt: createRelativeDate(4, 18, 0),
    items: [line(catalog.plateauMaki, 1), line(catalog.biere, 1)],
  }),
  buildSeedOrder({
    id: "8a6e4d8b-6406-42b2-81f7-f5b5162a3a46",
    orderNumber: 1037,
    customerName: "Hugo Martin",
    status: "cancelled",
    createdAt: createRelativeDate(5, 13, 30),
    items: [line(catalog.nem, 2), line(catalog.cafe, 1)],
  }),
  buildSeedOrder({
    id: "9b56ebbf-e442-4258-9352-82ae9476dd15",
    orderNumber: 1036,
    customerName: "Noah Bernard",
    status: "delivered",
    createdAt: createRelativeDate(6, 19, 45),
    items: [line(catalog.rolls, 2)],
  }),
  buildSeedOrder({
    id: "c1b774f9-66e5-4135-83eb-5db9fbf07490",
    orderNumber: 1035,
    customerName: "Léa Moreau",
    status: "delivered",
    createdAt: createRelativeDate(8, 12, 5),
    items: [line(catalog.makiSaumon, 3), line(catalog.biere, 1)],
  }),
  buildSeedOrder({
    id: "0c0ef1d1-2443-4142-9e52-c9f1cb6d5370",
    orderNumber: 1034,
    customerName: "Camille Laurent",
    status: "delivered",
    createdAt: createRelativeDate(10, 20, 0),
    items: [line(catalog.plateauMaki, 1), line(catalog.glace, 1)],
  }),
  buildSeedOrder({
    id: "688e8df3-45e0-49b4-8d5b-b23f8e8e4f49",
    orderNumber: 1033,
    customerName: "Sofia Nguyen",
    status: "delivered",
    createdAt: createRelativeDate(18, 18, 20),
    items: [line(catalog.futomaki, 2), line(catalog.makiSaumon, 2)],
  }),
  buildSeedOrder({
    id: "384448b9-0e22-4168-b50f-e2a22b0d68d5",
    orderNumber: 1032,
    customerName: "Noah Bernard",
    status: "delivered",
    createdAt: createRelativeDate(38, 19, 5),
    items: [line(catalog.rolls, 1), line(catalog.biere, 2), line(catalog.glace, 1)],
  }),
  buildSeedOrder({
    id: "b2cfec9c-a28e-4b30-b899-9f39c8284435",
    orderNumber: 1031,
    customerName: "Camille Laurent",
    status: "delivered",
    createdAt: createRelativeDate(72, 20, 15),
    items: [line(catalog.plateauMaki, 1), line(catalog.cafe, 2), line(catalog.nem, 1)],
  }),
  buildSeedOrder({
    id: "ab067b48-fb07-4b1d-b355-90cce9a5d6d9",
    orderNumber: 1030,
    customerName: "Léa Moreau",
    status: "delivered",
    createdAt: createRelativeDate(102, 12, 50),
    items: [line(catalog.futomaki, 1), line(catalog.poulpe, 2)],
  }),
].sort((left, right) => right.createdAt.localeCompare(left.createdAt));

let currentOrderNumber = Math.max(...orders.map((order) => order.orderNumber)) + 1;

export class OrdersRepository {
  async findAll(status?: OrderStatus) {
    return status ? orders.filter((order) => order.status === status) : orders;
  }

  async findById(id: string) {
    return orders.find((order) => order.id === id) ?? null;
  }

  async create(input: PersistedOrderInput) {
    const order: Order = {
      id: randomUUID(),
      orderNumber: currentOrderNumber++,
      customerName: input.customerName,
      totalAmount: input.totalAmount,
      status: "pending",
      itemsCount: input.itemsCount,
      items: input.items,
      createdAt: input.createdAt,
    };

    orders.unshift(order);
    return order;
  }

  async updateStatus(id: string, status: OrderStatus) {
    const index = orders.findIndex((order) => order.id === id);

    if (index === -1) {
      return null;
    }

    orders[index] = {
      ...orders[index],
      status,
    };

    return orders[index];
  }
}
