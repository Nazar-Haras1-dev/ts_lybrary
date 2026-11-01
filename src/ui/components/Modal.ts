import { button, h } from '../dom';

// Показує модальне вікно (Bootstrap-класи) і повертає Promise з результатом
function open<R>(build: (close: (value: R) => void) => HTMLElement): Promise<R> {
  return new Promise<R>((resolve) => {
    const overlay = h('div', { className: 'modal d-block' });
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    const close = (value: R): void => {
      overlay.remove();
      resolve(value);
    };
    overlay.append(h('div', { className: 'modal-dialog modal-dialog-centered' }, build(close)));
    document.body.append(overlay);
  });
}

export class Modal {
  static alert(message: string, buttonLabel = 'Зрозуміло!'): Promise<void> {
    return open<void>((close) =>
      h(
        'div',
        { className: 'modal-content' },
        h('div', { className: 'modal-body fs-5', textContent: message }),
        h(
          'div',
          { className: 'modal-footer' },
          button(buttonLabel, 'btn btn-primary', () => close()),
        ),
      ),
    );
  }

  // validate повертає текст помилки (вікно лишається відкритим) або null
  static prompt(
    title: string,
    validate?: (value: string) => string | null,
  ): Promise<string | null> {
    return open<string | null>((close) => {
      const input = h('input', { className: 'form-control form-control-lg', placeholder: 'ID' });
      const error = h('div', { className: 'text-danger small mt-1' });
      const save = button('Зберегти', 'btn btn-primary', () => {
        const message = validate ? validate(input.value) : null;
        if (message) {
          error.textContent = message;
          return;
        }
        close(input.value.trim());
      });
      return h(
        'div',
        { className: 'modal-content' },
        h(
          'div',
          { className: 'modal-header' },
          h('h5', { className: 'modal-title', textContent: title }),
        ),
        h('div', { className: 'modal-body' }, input, error),
        h(
          'div',
          { className: 'modal-footer' },
          button('Скасувати', 'btn btn-secondary', () => close(null)),
          save,
        ),
      );
    });
  }
}
