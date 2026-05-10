import type { RestaurantSettings, UpdateSettingsInput } from "./settings.types";
import { createMockSettings } from "./settings.mock";

let settings: RestaurantSettings = createMockSettings();

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
