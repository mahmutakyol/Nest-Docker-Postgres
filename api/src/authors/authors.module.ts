import { Module } from '@nestjs/common';
import { AuthorsService } from './services/authors/authors.service';
import { AuthorsController } from './controller/authors/authors.controller';

@Module({
  providers: [AuthorsService],
  controllers: [AuthorsController]
})
export class AuthorsModule {}
