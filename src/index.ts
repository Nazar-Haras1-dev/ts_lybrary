import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';
import { IBook } from './models/interfaces/IBook';
import { IUser } from './models/interfaces/IUser';
import { Book } from './models/Book';
import { User } from './models/User';
import { LendingService } from './services/Lending';
import { Library } from './services/Library';
import { NotificationService } from './services/NotificationService';
import { Storage } from './services/Storage';
import { Modal } from './ui/components/Modal';
import { App } from './ui/render';

const root = document.getElementById('app');
if (!root) throw new Error('Елемент #app не знайдено');

const store = new Storage();
const books = new Library<Book>(store.load<IBook[]>('books', []).map((d) => Book.fromJSON(d)));
const users = new Library<User>(store.load<IUser[]>('users', []).map((d) => User.fromJSON(d)));
const notifier = new NotificationService();

// UI підписується на сповіщення (замість alert)
notifier.subscribe((message, kind) => {
  void Modal.alert(message, kind === 'success' ? 'Зрозуміло!' : 'Закрити');
});

new App(root, { books, users, lending: new LendingService(books, users), notifier, store }).mount();
