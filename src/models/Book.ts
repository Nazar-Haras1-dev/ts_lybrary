import { IBook } from './interfaces/IBook';

export class Book implements IBook {
  constructor(
    private readonly _id: string,
    private readonly _title: string,
    private readonly _author: string,
    private readonly _year: number,
    private _borrowedBy: string | null = null,
  ) {}

  get id(): string {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  get author(): string {
    return this._author;
  }
  get year(): number {
    return this._year;
  }
  get borrowedBy(): string | null {
    return this._borrowedBy;
  }
  get isBorrowed(): boolean {
    return this._borrowedBy !== null;
  }

  borrow(userId: string): void {
    if (this.isBorrowed) throw new Error('Книгу вже позичено');
    this._borrowedBy = userId;
  }

  giveBack(): void {
    this._borrowedBy = null;
  }

  // JSON.stringify автоматично викликає toJSON
  toJSON(): IBook {
    return {
      id: this._id,
      title: this._title,
      author: this._author,
      year: this._year,
      borrowedBy: this._borrowedBy,
    };
  }

  static fromJSON(d: IBook): Book {
    return new Book(d.id, d.title, d.author, d.year, d.borrowedBy);
  }

  toString(): string {
    return `${this._title} by ${this._author} (${this._year})`;
  }
}
