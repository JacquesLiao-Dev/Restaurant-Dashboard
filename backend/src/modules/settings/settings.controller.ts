import type { NextFunction, Request, Response } from "express";

import { SettingsService } from "./settings.service";
import { updateSettingsSchema } from "./settings.types";

const settingsService = new SettingsService();

export async function getSettings(_request: Request, response: Response, next: NextFunction) {
  try {
    const settings = await settingsService.get();
    return response.json(settings);
  } catch (error) {
    return next(error);
  }
}

export async function updateSettings(request: Request, response: Response, next: NextFunction) {
  try {
    const payload = updateSettingsSchema.parse(request.body);
    const settings = await settingsService.update(payload);
    return response.json(settings);
  } catch (error) {
    return next(error);
  }
}
