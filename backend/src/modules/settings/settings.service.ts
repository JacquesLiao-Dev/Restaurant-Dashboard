import { SettingsRepository } from "./settings.repository";
import type { UpdateSettingsInput } from "./settings.types";

export class SettingsService {
  constructor(private readonly repository = new SettingsRepository()) {}

  async get() {
    return this.repository.get();
  }

  async update(input: UpdateSettingsInput) {
    return this.repository.update(input);
  }
}
