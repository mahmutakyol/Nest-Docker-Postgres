import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IAuthor } from 'src/authors/models/author.interface';
import { CreateAuthorDto } from 'src/authors/models/dto/createAuthor.dto';
import { AuthorsService } from 'src/authors/services/authors/authors.service';
import { CreateDBLogDto } from 'src/dblogs/models/dto/createDBLog.dto';
import { DblogService } from 'src/dblogs/services/dblog.service';

@Controller('authors')
export class AuthorsController {

  constructor(
    private readonly authorService: AuthorsService,
    private readonly dbLogService: DblogService
  ) {}

  @Post()
  async create(@Body() createAuthorkDto: CreateAuthorDto) {
    const author = await this.authorService.create(createAuthorkDto)
    const log: CreateDBLogDto = {
      type: 'CREATE',
      description: 'Author Created',
      created_at: new Date()
    }
    await this.dbLogService.create(log)
    return author;
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
