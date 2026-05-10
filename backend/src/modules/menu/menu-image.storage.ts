import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { AppError } from "../../shared/app-error";
import type { MenuImageUploadInput } from "./menu.types";

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

export async function storeMenuImage(upload: MenuImageUploadInput) {
  const { buffer, extension, slug } = parseImageUpload(upload);

  await mkdir(menuImageDirectory, { recursive: true });

  const fileName = `${slug}-${Date.now()}.${extension}`;
  const targetPath = path.join(menuImageDirectory, fileName);

  await writeFile(targetPath, buffer);

  return `/images/menu/${fileName}`;
}
