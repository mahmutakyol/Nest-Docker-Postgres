import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IBook } from 'src/books/models/book.interface';
import { CreateBookDto } from 'src/books/models/dto/createBook.dto';
import { BooksService } from 'src/books/services/books/books.service';
import { CreateDBLogDto } from 'src/dblogs/models/dto/createDBLog.dto';
import { DblogService } from 'src/dblogs/services/dblog.service';

@Controller('books')
export class BooksController {

  constructor(
    private readonly bookService: BooksService,
    private readonly dbLogService: DblogService
  ) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const book = await this.bookService.create(createBookDto);
    const log: CreateDBLogDto = {
      type: 'CREATE',
      description: 'Book Created',
      created_at: new Date()
    }
    await this.dbLogService.create(log)
    return book
  }

  @Get()
  async findAll() {
    const books = await this.bookService.findAll();
    const log: CreateDBLogDto = {
      type: 'GET',
      description: 'Get All Books',
      created_at: new Date()
    }
    await this.dbLogService.create(log)
    return books
  }

  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() book: IBook) {
    const updatedBook = await this.bookService.updateOne(Number(id), book)
    const log: CreateDBLogDto = {
      type: 'UPDATE',
      description: 'Book Updated',
      created_at: new Date()
    }
    await this.dbLogService.create(log)
    return updatedBook
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    const status = this.bookService.deleteOne(id)
    const log: CreateDBLogDto = {
      type: 'DELETE',
      description: 'Book Deleted',
      created_at: new Date()
    }
    await this.dbLogService.create(log)
    return status
  }

}
