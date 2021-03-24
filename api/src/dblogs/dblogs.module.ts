import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from 'src/authors/authors.module';
import { DBLogEntity } from './models/dblog.entity';
import { DblogService } from './services/dblog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DBLogEntity]),
    forwardRef(() => AuthorsModule)
  ],
  providers: [DblogService],
  exports: [DblogService]
})
export class DblogsModule {}
