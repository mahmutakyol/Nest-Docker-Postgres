import { AuthorEntity } from "src/authors/models/author.entity";

export interface IBook {
  id?: number;
  name?: string;
  isbn?: string;
  author?: AuthorEntity;
}