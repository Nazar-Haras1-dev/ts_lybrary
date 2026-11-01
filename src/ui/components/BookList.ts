import { Book } from '../../models/Book';
import { button } from '../dom';
import { renderList } from './ListView';

export interface BookListHandlers {
  onBorrow: (book: Book) => void;
  onReturn: (book: Book) => void;
  onDelete: (book: Book) => void;
  onPage: (page: number) => void;
}

export function BookList(
  books: Book[],
  page: number,
  perPage: number,
  hd: BookListHandlers,
): HTMLElement {
  return renderList<Book>({
    items: books,
    page,
    perPage,
    emptyText: 'Книг не знайдено.',
    label: (b) => b.toString(),
    onPage: hd.onPage,
    actions: (b) => [
      b.isBorrowed
        ? button('Повернути', 'btn btn-warning btn-sm', () => hd.onReturn(b))
        : button('Позичити', 'btn btn-primary btn-sm', () => hd.onBorrow(b)),
      button('Видалити', 'btn btn-outline-danger btn-sm', () => hd.onDelete(b)),
    ],
  });
}
