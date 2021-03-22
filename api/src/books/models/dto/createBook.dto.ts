import { IsISBN, IsString } from "class-validator";
import { IAuthor } from "src/authors/models/author.interface";

export class CreateBookDto {

  @IsString()
  name: string;

  @IsISBN()
  isbn: string;

  author: IAuthor;
}