import { forwardRef, Module } from '@nestjs/common';
import { AuthorsService } from './services/authors/authors.service';
import { AuthorsController } from './controller/authors/authors.controller';
import { BooksModule } from 'src/books/books.module';
import { AuthorEntity } from './models/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DblogsModule } from 'src/dblogs/dblogs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorEntity]),
    forwardRef(() => BooksModule),
    forwardRef(() => DblogsModule)
  ],
  providers: [AuthorsService],
  controllers: [AuthorsController]
})
export class AuthorsModule {}
