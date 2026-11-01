import { ValidationErrors } from '../../types';
import { button, card, h } from '../dom';

export interface FieldConfig<K extends string> {
  name: K;
  placeholder: string;
}

export interface FormOptions<K extends string> {
  title: string;
  fields: FieldConfig<K>[];
  submitLabel: string;
  validate: (values: Record<K, string>) => ValidationErrors<K>;
  onSubmit: (values: Record<K, string>) => void;
}

// Generic-форма: одна реалізація для книг і користувачів
export function createForm<K extends string>(o: FormOptions<K>): HTMLElement {
  const inputs = new Map<K, HTMLInputElement>();
  const errors = new Map<K, HTMLElement>();

  const rows = o.fields.map((f) => {
    const input = h('input', { className: 'form-control', placeholder: f.placeholder });
    const error = h('div', { className: 'text-danger small' });
    inputs.set(f.name, input);
    errors.set(f.name, error);
    return h('div', { className: 'mb-2' }, input, error);
  });

  const submit = button(o.submitLabel, 'btn btn-success', () => {
    const values = {} as Record<K, string>;
    o.fields.forEach((f) => {
      values[f.name] = inputs.get(f.name)?.value ?? '';
    });
    const result = o.validate(values);
    o.fields.forEach((f) => {
      const el = errors.get(f.name);
      if (el) el.textContent = result[f.name] ?? '';
    });
    if (Object.values(result).some(Boolean)) return;
    o.onSubmit(values);
    inputs.forEach((i) => {
      i.value = '';
    });
  });

  return card(o.title, ...rows, submit);
}
