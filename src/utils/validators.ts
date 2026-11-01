import { ValidationErrors } from '../types';

type BookField = 'title' | 'author' | 'year';
type UserField = 'name' | 'email';

export namespace Validation {
  export const REQUIRED_MSG = "Це поле є обов'язковим";
  // Рік: 1000-1999 або 2000-2099
  export const YEAR_REGEX = /^(1\d{3}|20\d{2})$/;
  const DIGITS_REGEX = /^\d+$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  export function isRequired(value: string): boolean {
    return value.trim().length > 0;
  }

  export function isDigitsOnly(value: string): boolean {
    return DIGITS_REGEX.test(value.trim());
  }

  export function isValidYear(
    value: string,
    currentYear: number = new Date().getFullYear(),
  ): boolean {
    return YEAR_REGEX.test(value.trim()) && Number(value) <= currentYear;
  }

  export function isValidEmail(value: string): boolean {
    return EMAIL_REGEX.test(value.trim());
  }

  // Повертає текст помилки або null, якщо id коректний
  export function validateUserId(id: string): string | null {
    if (!isRequired(id)) return REQUIRED_MSG;
    if (!isDigitsOnly(id)) return 'ID має містити лише цифри';
    return null;
  }

  export function validateBook(v: Record<BookField, string>): ValidationErrors<BookField> {
    const errors: ValidationErrors<BookField> = {};
    if (!isRequired(v.title)) errors.title = REQUIRED_MSG;
    if (!isRequired(v.author)) errors.author = REQUIRED_MSG;
    if (!isRequired(v.year)) errors.year = REQUIRED_MSG;
    else if (!isDigitsOnly(v.year)) errors.year = 'Рік має містити лише цифри';
    else if (!isValidYear(v.year)) errors.year = 'Введіть коректний рік (від 1000 до поточного)';
    return errors;
  }

  export function validateUser(v: Record<UserField, string>): ValidationErrors<UserField> {
    const errors: ValidationErrors<UserField> = {};
    if (!isRequired(v.name)) errors.name = REQUIRED_MSG;
    if (!isRequired(v.email)) errors.email = REQUIRED_MSG;
    else if (!isValidEmail(v.email)) errors.email = 'Некоректний email';
    return errors;
  }
}
