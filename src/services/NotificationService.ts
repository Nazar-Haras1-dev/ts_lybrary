import { NotificationKind } from '../types';

type Handler = (message: string, kind: NotificationKind) => void;

// Сервіс не знає про DOM: UI сам підписується і вирішує, як показати
export class NotificationService {
  private handlers: Handler[] = [];

  subscribe(handler: Handler): void {
    this.handlers.push(handler);
  }

  notify(message: string, kind: NotificationKind = 'info'): void {
    this.handlers.forEach((h) => h(message, kind));
  }
}
