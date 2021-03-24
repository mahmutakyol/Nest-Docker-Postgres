import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/books/models/book.entity';
import { IBook } from 'src/books/models/book.interface';
import { CreateBookDto } from 'src/books/models/dto/createBook.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>
  ) {}

  async create (createBookDto: CreateBookDto) {
    if (!await this.isbnExists(createBookDto.isbn)) {
      const book = await this.bookRepository.save(createBookDto);
      return book;
    }
  }

  async updateOne(id: number, book: IBook) {
    await this.bookRepository.update(id, book);
    const res = await this.findOne(id);
    return res;
  }

  async deleteOne(id: number) {
    return await this.bookRepository.delete(id);
  }

  async findAll() {
    return await this.bookRepository.find({ relations: ['author'] });
  }

  private async findOne(id: number) {
    await this.bookRepository.findOne({ id }, { relations: ['author'] });
  }

  private async isbnExists(isbn: string) {
    const book = await this.bookRepository.findOne({ isbn })
    if (book) {
      return true
    } else {
      return false
    }
  }

}
