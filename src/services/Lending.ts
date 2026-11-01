import { Book } from '../models/Book';
import { User } from '../models/User';
import { Library } from './Library';

export const MAX_BORROWED = 3;

export interface LendingResult {
  ok: boolean;
  message: string;
}

export class LendingService {
  constructor(
    private readonly books: Library<Book>,
    private readonly users: Library<User>,
  ) {}

  borrowedBy(userId: string): Book[] {
    return this.books.find((b) => b.borrowedBy === userId);
  }

  borrow(bookId: string, userId: string): LendingResult {
    const book = this.books.findById(bookId);
    const user = this.users.findById(userId);
    if (!book) return { ok: false, message: 'Книгу не знайдено.' };
    if (!user) return { ok: false, message: `Користувача з ID ${userId} не знайдено.` };
    if (book.isBorrowed) return { ok: false, message: `${book} вже позичено.` };
    if (this.borrowedBy(userId).length >= MAX_BORROWED) {
      return {
        ok: false,
        message: `${user.name} вже позичив(ла) ${MAX_BORROWED} книги — це максимум. Спочатку поверніть одну з них.`,
      };
    }
    book.borrow(userId);
    return { ok: true, message: `${book} has been borrowed by ${user}.` };
  }

  giveBack(bookId: string): LendingResult {
    const book = this.books.findById(bookId);
    if (!book || !book.isBorrowed) return { ok: false, message: 'Ця книга не була позичена.' };
    book.giveBack();
    return { ok: true, message: `${book} has been returned.` };
  }
}
