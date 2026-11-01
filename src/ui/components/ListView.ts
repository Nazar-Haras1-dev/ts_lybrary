import { paginate } from '../../utils/paginate';
import { h } from '../dom';

export interface ListOptions<T> {
  items: T[];
  page: number;
  perPage: number;
  emptyText: string;
  label: (item: T) => string;
  actions: (item: T) => HTMLElement[];
  onPage: (page: number) => void;
}

function pageItem(
  label: string,
  target: number,
  active: boolean,
  disabled: boolean,
  onPage: (p: number) => void,
): HTMLElement {
  const cls = `page-item${active ? ' active' : ''}${disabled ? ' disabled' : ''}`;
  return h(
    'li',
    { className: cls },
    h('button', { className: 'page-link', textContent: label, onclick: () => onPage(target) }),
  );
}

// Generic-список з пагінацією (використовують BookList і UserList)
export function renderList<T>(o: ListOptions<T>): HTMLElement {
  if (o.items.length === 0)
    return h('p', { className: 'text-muted mb-0', textContent: o.emptyText });

  const { items, page, totalPages } = paginate(o.items, o.page, o.perPage);
  const list = h(
    'ul',
    { className: 'list-group list-group-flush' },
    ...items.map((item) =>
      h(
        'li',
        { className: 'list-group-item d-flex justify-content-between align-items-center px-0' },
        h('span', { textContent: o.label(item) }),
        h('div', { className: 'd-flex gap-2' }, ...o.actions(item)),
      ),
    ),
  );
  const root = h('div', {}, list);
  if (totalPages > 1) {
    const numbers = Array.from({ length: totalPages }, (_, i) =>
      pageItem(String(i + 1), i + 1, i + 1 === page, false, o.onPage),
    );
    root.append(
      h(
        'ul',
        { className: 'pagination justify-content-center mt-3 mb-0' },
        pageItem('«', page - 1, false, page === 1, o.onPage),
        ...numbers,
        pageItem('»', page + 1, false, page === totalPages, o.onPage),
      ),
    );
  }
  return root;
}
