type Child = Node | string;

// Типізований «hyperscript»: h('div', { className: 'x' }, дитина1, дитина2)
export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  Object.assign(el, props);
  el.append(...children);
  return el;
}

export function button(text: string, className: string, onClick: () => void): HTMLButtonElement {
  return h('button', { type: 'button', className, textContent: text, onclick: onClick });
}

export function card(title: string, ...children: Child[]): HTMLElement {
  return h(
    'div',
    { className: 'card shadow-sm mb-3' },
    h(
      'div',
      { className: 'card-body' },
      h('h2', { className: 'h4 mb-3', textContent: title }),
      ...children,
    ),
  );
}
