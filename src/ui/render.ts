import { Book } from '../models/Book';
import { User } from '../models/User';
import { Library } from '../services/Library';
import { LendingResult, LendingService } from '../services/Lending';
import { NotificationService } from '../services/NotificationService';
import { Storage } from '../services/Storage';
import { generateId } from '../utils/idGenerator';
import { Validation } from '../utils/validators';
import { BookForm, BookFormValues } from './components/BookForm';
import { BookList } from './components/BookList';
import { Modal } from './components/Modal';
import { UserForm, UserFormValues } from './components/UserForm';
import { UserList } from './components/UserList';
import { card, h } from './dom';

const PER_PAGE = 5;

export interface AppDeps {
  books: Library<Book>;
  users: Library<User>;
  lending: LendingService;
  notifier: NotificationService;
  store: Storage;
}

export class App {
  private bookPage = 1;
  private userPage = 1;
  private query = '';
  private readonly booksBody = h('div');
  private readonly usersBody = h('div');

  constructor(
    private readonly root: HTMLElement,
    private readonly deps: AppDeps,
  ) {}

  // Каркас будується один раз; оновлюються лише тіла списків
  mount(): void {
    const search = h('input', {
      className: 'form-control mb-3',
      placeholder: 'Пошук за назвою або автором',
    });
    search.addEventListener('input', () => {
      this.query = search.value;
      this.bookPage = 1;
      this.refresh();
    });
    this.root.replaceChildren(
      h(
        'div',
        { className: 'container py-4' },
        h('h1', { className: 'text-center mb-4', textContent: 'Система Управління Бібліотекою' }),
        BookForm((v) => this.addBook(v)),
        UserForm((v) => this.addUser(v)),
        card('Список Книг', search, this.booksBody),
        card('Список Користувачів', this.usersBody),
      ),
    );
    this.refresh();
  }

  private refresh(): void {
    const q = this.query.trim().toLowerCase();
    const books = this.deps.books.find(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q),
    );
    this.booksBody.replaceChildren(
      BookList(books, this.bookPage, PER_PAGE, {
        onBorrow: (b) => void this.borrow(b),
        onReturn: (b) => this.finish(this.deps.lending.giveBack(b.id)),
        onDelete: (b) => this.removeBook(b),
        onPage: (p) => {
          this.bookPage = p;
          this.refresh();
        },
      }),
    );
    this.usersBody.replaceChildren(
      UserList(
        this.deps.users.getAll(),
        this.userPage,
        PER_PAGE,
        (u) => this.removeUser(u),
        (p) => {
          this.userPage = p;
          this.refresh();
        },
      ),
    );
  }

  private persist(): void {
    this.deps.store.save('books', this.deps.books.getAll());
    this.deps.store.save('users', this.deps.users.getAll());
  }

  private addBook(v: BookFormValues): void {
    this.deps.books.add(new Book(generateId(), v.title.trim(), v.author.trim(), Number(v.year)));
    this.persist();
    this.refresh();
  }

  private addUser(v: UserFormValues): void {
    this.deps.users.add(new User(generateId(), v.name.trim(), v.email.trim()));
    this.persist();
    this.refresh();
  }

  private removeBook(book: Book): void {
    if (book.isBorrowed) {
      this.deps.notifier.notify(`${book} зараз позичена. Спочатку поверніть її.`, 'error');
      return;
    }
    this.deps.books.remove(book.id);
    this.persist();
    this.refresh();
  }

  private removeUser(user: User): void {
    if (this.deps.lending.borrowedBy(user.id).length > 0) {
      this.deps.notifier.notify(`${user.name} має неповернені книги.`, 'error');
      return;
    }
    this.deps.users.remove(user.id);
    this.persist();
    this.refresh();
  }

  private async borrow(book: Book): Promise<void> {
    const id = await Modal.prompt(
      'Введіть ID користувача для позичення книги:',
      Validation.validateUserId,
    );
    if (id === null) return; // натиснули «Скасувати»
    this.finish(this.deps.lending.borrow(book.id, id));
  }

  private finish(result: LendingResult): void {
    if (result.ok) this.persist();
    this.refresh();
    this.deps.notifier.notify(result.message, result.ok ? 'success' : 'error');
  }
}
