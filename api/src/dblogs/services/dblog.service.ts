import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DBLogEntity } from '../models/dblog.entity';
import { CreateDBLogDto } from '../models/dto/createDBLog.dto';

@Injectable()
export class DblogService {

  constructor(
    @InjectRepository(DBLogEntity)
    private readonly dblogRepository: Repository<DBLogEntity>
  ) {}

  async create (createDBLogDto: CreateDBLogDto) {
    await this.dblogRepository.save(createDBLogDto);
  }

}
