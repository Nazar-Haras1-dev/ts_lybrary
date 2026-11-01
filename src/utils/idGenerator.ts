let last = 0;

// Тільки цифри (мітка часу), унікальність гарантована навіть при швидких викликах
export function generateId(): string {
  const now = Date.now();
  last = now > last ? now : last + 1;
  return String(last);
}
