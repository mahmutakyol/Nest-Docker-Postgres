import { AuthorEntity } from "src/authors/models/author.entity";

export interface IDBLog {
  id?: number;
  name?: string;
  isbn?: string;
  author?: AuthorEntity;
}