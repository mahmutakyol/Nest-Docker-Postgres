import { BookEntity } from "src/books/models/book.entity";

export interface IAuthor {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  books?: BookEntity[];
}