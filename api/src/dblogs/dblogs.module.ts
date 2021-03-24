import { Module } from '@nestjs/common';
import { DblogService } from './services/dblog.service';

@Module({
  providers: [DblogService]
})
export class DblogsModule {}
