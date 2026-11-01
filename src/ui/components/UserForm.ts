import { Validation } from '../../utils/validators';
import { createForm } from './Form';

export type UserFormValues = Record<'name' | 'email', string>;

export function UserForm(onSubmit: (values: UserFormValues) => void): HTMLElement {
  return createForm<keyof UserFormValues>({
    title: 'Додати Користувача',
    fields: [
      { name: 'name', placeholder: "Ім'я" },
      { name: 'email', placeholder: 'Email' },
    ],
    submitLabel: 'Додати Користувача',
    validate: Validation.validateUser,
    onSubmit,
  });
}
