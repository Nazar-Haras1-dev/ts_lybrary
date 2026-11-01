import { User } from '../../models/User';
import { button } from '../dom';
import { renderList } from './ListView';

export function UserList(
  users: User[],
  page: number,
  perPage: number,
  onDelete: (user: User) => void,
  onPage: (page: number) => void,
): HTMLElement {
  return renderList<User>({
    items: users,
    page,
    perPage,
    emptyText: 'Користувачів ще немає.',
    label: (u) => u.toString(),
    onPage,
    actions: (u) => [button('Видалити', 'btn btn-outline-danger btn-sm', () => onDelete(u))],
  });
}
