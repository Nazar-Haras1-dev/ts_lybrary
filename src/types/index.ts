export interface Identifiable {
  readonly id: string;
}

// Помилки валідації: ключ = назва поля, значення = текст помилки
export type ValidationErrors<K extends string = string> = Partial<Record<K, string>>;

export type NotificationKind = 'success' | 'error' | 'info';
