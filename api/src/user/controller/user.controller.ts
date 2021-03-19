import { Controller, Get, Post } from '@nestjs/common';
import { IUser } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}

  @Post()
  async add(user: IUser) {
    return this.userService.add(user);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

}
