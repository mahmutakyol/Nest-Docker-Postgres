import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IAuthor } from 'src/authors/models/author.interface';
import { CreateAuthorDto } from 'src/authors/models/dto/createAuthor.dto';
import { AuthorsService } from 'src/authors/services/authors/authors.service';

@Controller('authors')
export class AuthorsController {

  constructor(private readonly authorService: AuthorsService) {}

  @Post()
  async create(@Body() createAuthorkDto: CreateAuthorDto) {
    return await this.authorService.create(createAuthorkDto);
  }

  @Get()
  async findAll() {
    return await this.authorService.findAll();
  }

  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() author: IAuthor) {
    return await this.authorService.updateOne(Number(id), author)
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    return this.authorService.deleteOne(id);
  }
  
}
