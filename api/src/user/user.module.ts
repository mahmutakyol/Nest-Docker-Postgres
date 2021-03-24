import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { DblogsModule } from 'src/dblogs/dblogs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    forwardRef(() => DblogsModule)
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
