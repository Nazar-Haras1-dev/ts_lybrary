import { Validation } from '../../utils/validators';
import { createForm } from './Form';

export type BookFormValues = Record<'title' | 'author' | 'year', string>;

export function BookForm(onSubmit: (values: BookFormValues) => void): HTMLElement {
  return createForm<keyof BookFormValues>({
    title: 'Додати Книгу',
    fields: [
      { name: 'title', placeholder: 'Назва книги' },
      { name: 'author', placeholder: 'Автор' },
      { name: 'year', placeholder: 'Рік видання' },
    ],
    submitLabel: 'Додати Книгу',
    validate: Validation.validateBook,
    onSubmit,
  });
}
