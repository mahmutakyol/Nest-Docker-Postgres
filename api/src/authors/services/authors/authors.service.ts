import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from 'src/authors/models/author.entity';
import { IAuthor } from 'src/authors/models/author.interface';
import { CreateAuthorDto } from 'src/authors/models/dto/createAuthor.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {

  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>
  ) {}

  async create (createAuthorDto: CreateAuthorDto) {
    return await this.authorRepository.save(createAuthorDto);
  }

  async updateOne(id: number, author: IAuthor) {
    await this.authorRepository.update(id, author);
    return await this.findOne(id);
  }

  async deleteOne(id: number) {
    return await this.authorRepository.delete(id);
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  private async findOne(id: number) {
    await this.authorRepository.findOne({ id });
  }

}
