import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IBook } from 'src/books/models/book.interface';
import { CreateBookDto } from 'src/books/models/dto/createBook.dto';
import { BooksService } from 'src/books/services/books/books.service';

@Controller('books')
export class BooksController {

  constructor(private readonly bookService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.create(createBookDto);
  }

  @Get()
  async findAll() {
    return await this.bookService.findAll();
  }

  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() book: IBook) {
    return await this.bookService.updateOne(Number(id), book)
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    return this.bookService.deleteOne(id);
  }

}
