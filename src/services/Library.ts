import { Identifiable } from '../types';

// Generic: одна реалізація працює і для Book, і для User (T має мати id)
export class Library<T extends Identifiable> {
  private items: T[];

  constructor(items: T[] = []) {
    this.items = [...items];
  }

  add(item: T): void {
    if (this.findById(item.id)) throw new Error(`Елемент з id ${item.id} вже існує`);
    this.items.push(item);
  }

  remove(id: string): boolean {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }

  findById(id: string): T | undefined {
    return this.items.find((i) => i.id === id);
  }

  find(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  getAll(): T[] {
    return [...this.items];
  }

  get size(): number {
    return this.items.length;
  }
}
