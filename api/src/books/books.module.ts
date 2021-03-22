import { forwardRef, Module } from '@nestjs/common';
import { BooksService } from './services/books/books.service';
import { BooksController } from './controller/books/books.controller';
import { AuthorsModule } from 'src/authors/authors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './models/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    forwardRef(() => AuthorsModule)
  ],
  providers: [BooksService],
  controllers: [BooksController]
})
export class BooksModule {}
