import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateDBLogDto } from 'src/dblogs/models/dto/createDBLog.dto';
import { DblogService } from 'src/dblogs/services/dblog.service';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly dbLogService: DblogService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto)
    const log: CreateDBLogDto = {
      type: 'CREATE',
      description: 'User Created',
      created_at: new Date()
    }
    await this.dbLogService.create(log)
    return user
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    const login = await this.userService.login(loginUserDto)
    const log: CreateDBLogDto = {
      type: 'LOGIN',
      description: 'User Login',
      created_at: new Date()
    }
    await this.dbLogService.create(log)
    return login
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll()
    const log: CreateDBLogDto = {
      type: 'GET',
      description: 'Get All Users',
      created_at: new Date()
    }
    await this.dbLogService.create(log)
    return users
  }

}
