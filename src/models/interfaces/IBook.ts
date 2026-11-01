export interface IBook {
  readonly id: string;
  readonly title: string;
  readonly author: string;
  readonly year: number;
  readonly borrowedBy: string | null; // id користувача або null
}
