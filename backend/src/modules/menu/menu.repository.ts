import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { AppError } from "../../shared/app-error";
import type {
  CreateMenuItemInput,
  MenuCategory,
  MenuImageUploadInput,
  MenuItem,
  UpdateMenuItemInput,
} from "./menu.types";

const menuImageDirectory = path.resolve(__dirname, "../../../../frontend/public/images/menu");
const allowedMimeTypes: Record<MenuImageUploadInput["mimeType"], string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};
const maxUploadSizeInBytes = 4 * 1024 * 1024;

function slugifyFileName(value: string) {
  const baseName = value.replace(/\.[^/.]+$/, "");

  return (
    baseName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "menu-item"
  );
}

function parseImageUpload(upload: MenuImageUploadInput) {
  const extension = allowedMimeTypes[upload.mimeType];
  const pattern = new RegExp(`^data:${upload.mimeType};base64,(.+)$`);
  const match = upload.dataUrl.match(pattern);

  if (!match) {
    throw new AppError("Invalid image payload", 400);
  }

  const buffer = Buffer.from(match[1], "base64");

  if (buffer.byteLength > maxUploadSizeInBytes) {
    throw new AppError("Image file is too large", 400);
  }

  return {
    buffer,
    extension,
    slug: slugifyFileName(upload.fileName),
  };
}

async function storeMenuImage(upload: MenuImageUploadInput) {
  const { buffer, extension, slug } = parseImageUpload(upload);

  await mkdir(menuImageDirectory, { recursive: true });

  const fileName = `${slug}-${Date.now()}.${extension}`;
  const targetPath = path.join(menuImageDirectory, fileName);

  await writeFile(targetPath, buffer);

  return `/images/menu/${fileName}`;
}

const menuItems: MenuItem[] = [
  {
    id: "5b4ff458-7d90-4d20-a26f-9ca07ea30231",
    name: "Futomaki signature",
    description: "Riz vinaigré, avocat et finition sésame.",
    category: "main",
    price: 19,
    available: true,
    imageUrl: "/images/menu/futomaki.png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "9af7271a-a321-4236-a3bf-fcd4f61c88a6",
    name: "Maki saumon",
    description: "Saumon fondant et riz assaisonné minute.",
    category: "starter",
    price: 14,
    available: true,
    imageUrl: "/images/menu/maki-saumon.png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "f53b8b4b-1cc4-4f95-850d-91d6478f6d3a",
    name: "Plateau sushi maki",
    description: "Assortiment premium pour partage ou formule déjeuner.",
    category: "main",
    price: 32,
    available: true,
    imageUrl: "/images/menu/menu-sushi-maki.jpg",
    createdAt: new Date().toISOString(),
  },
  {
    id: "06b1b9d2-c2f8-4f92-b72f-e878035dbe33",
    name: "Rolls signature",
    description: "Sélection de rolls contemporains à forte rotation.",
    category: "main",
    price: 28,
    available: true,
    imageUrl: "/images/menu/menu-sushi-rolls.jpg",
    createdAt: new Date().toISOString(),
  },
  {
    id: "7df66c25-fd5b-4c03-8b56-812d87bfda0d",
    name: "Sushi poulpe snacké",
    description: "Poulpe tendre, touche grillée et condiment citronné.",
    category: "starter",
    price: 17,
    available: true,
    imageUrl: "/images/menu/suchi-poulpe.png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ab5a99af-e0d7-4a43-aaef-817594f3027e",
    name: "Nem croustillant",
    description: "Entrée croustillante servie avec herbes fraîches.",
    category: "starter",
    price: 12,
    available: true,
    imageUrl: "/images/starter/nem.png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "46c7b4ba-9f1e-4270-a1ad-ef12d048cf8a",
    name: "Glace vanille",
    description: "Dessert minute à la vanille, simple et efficace.",
    category: "dessert",
    price: 7,
    available: true,
    imageUrl: "/images/dessert/vanilla-ice-cream.png",
    createdAt: new Date().toISOString(),
  },
  {
    id: "74f3dad8-3ea8-4f63-9d72-3f3932dd9a8d",
    name: "Bière artisanale",
    description: "Bière fraîche servie en bouteille ou en pression.",
    category: "drink",
    price: 8,
    available: true,
    imageUrl: "/images/drink/beer.jpg",
    createdAt: new Date().toISOString(),
  },
  {
    id: "c8f41ba9-2da4-40e4-9e1a-2d2863842e8f",
    name: "Café serré",
    description: "Café court pour clôturer le repas.",
    category: "drink",
    price: 4,
    available: true,
    imageUrl: "/images/drink/cafee.png",
    createdAt: new Date().toISOString(),
  },
];

export class MenuRepository {
  async findAll(filters?: { search?: string; category?: MenuCategory }) {
    const search = filters?.search?.toLowerCase().trim();

    return menuItems.filter((item) => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search);

      const matchesCategory = !filters?.category || item.category === filters.category;

      return matchesSearch && matchesCategory;
    });
  }

  async findById(id: string) {
    return menuItems.find((item) => item.id === id) ?? null;
  }

  async findManyByIds(ids: string[]) {
    return menuItems.filter((item) => ids.includes(item.id));
  }

  async create(input: CreateMenuItemInput) {
    const imageUrl = input.imageUpload ? await storeMenuImage(input.imageUpload) : input.imageUrl ?? null;
    const item: MenuItem = {
      id: randomUUID(),
      name: input.name,
      description: input.description,
      category: input.category,
      price: input.price,
      available: input.available,
      imageUrl,
      createdAt: new Date().toISOString(),
    };

    menuItems.unshift(item);
    return item;
  }

  async update(id: string, input: UpdateMenuItemInput) {
    const index = menuItems.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    let imageUrl = menuItems[index].imageUrl;

    if (input.imageUpload) {
      imageUrl = await storeMenuImage(input.imageUpload);
    } else if (input.imageUrl !== undefined) {
      imageUrl = input.imageUrl;
    }

    const { imageUpload: _imageUpload, imageUrl: _providedImageUrl, ...rest } = input;

    menuItems[index] = {
      ...menuItems[index],
      ...rest,
      imageUrl,
    };

    return menuItems[index];
  }

  async delete(id: string) {
    const index = menuItems.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    menuItems.splice(index, 1);
    return true;
  }
}
