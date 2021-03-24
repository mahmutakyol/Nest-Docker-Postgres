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
    return author
  }

  @Get()
  async findAll() {
    const authors = await this.authorService.findAll()
    const log: CreateDBLogDto = {
      type: 'GET',
      description: 'Get All Authors',
      created_at: new Date()
    }
    await this.dbLogService.create(log)
    return authors
  }

  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() author: IAuthor) {
    const updatedAuthor = await this.authorService.updateOne(Number(id), author)
    const log: CreateDBLogDto = {
      type: 'UPDATE',
      description: 'Author Updated',
      created_at: new Date()
    }
    await this.dbLogService.create(log)
    return updatedAuthor
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    const status = this.authorService.deleteOne(id);
    const log: CreateDBLogDto = {
      type: 'DELETE',
      description: 'Author Deleted',
      created_at: new Date()
    }
    await this.dbLogService.create(log)
    return status;
  }
  
}
