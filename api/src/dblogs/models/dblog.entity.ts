import { AuthorEntity } from "src/authors/models/author.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DBLogEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  isbn: string;

  @ManyToOne(() => AuthorEntity, author => author.books)
  author: AuthorEntity;
}