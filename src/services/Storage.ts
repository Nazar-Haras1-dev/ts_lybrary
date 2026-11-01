// Мінімальний контракт, який виконує і localStorage, і тестова заглушка
export interface StorageBackend {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

export class Storage {
  constructor(private readonly backend: StorageBackend = localStorage) {}

  save<T>(key: string, value: T): void {
    this.backend.setItem(key, JSON.stringify(value));
  }

  load<T>(key: string, fallback: T): T {
    const raw = this.backend.getItem(key);
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  remove(key: string): void {
    this.backend.removeItem(key);
  }

  clear(): void {
    this.backend.clear();
  }
}
