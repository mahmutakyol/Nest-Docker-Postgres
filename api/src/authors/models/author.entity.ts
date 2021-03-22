import { BookEntity } from "src/books/models/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthorEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @OneToMany(() => BookEntity, bookEntity => bookEntity.author)
    books: BookEntity[];


}