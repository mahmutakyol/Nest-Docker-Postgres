import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { UserEntity } from '../models/user.entity';
import { IUser } from '../models/user.interface';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!await this.mailExists(createUserDto.email)) {
      createUserDto.password = await this.authService.hashPassword(createUserDto.password);
      const savedUser = await this.userRepository.save(createUserDto);
      const {password, ...user} = savedUser;
      return user;

    } else {
      throw new HttpException('Email already taken', HttpStatus.CONFLICT)
    }
    // return await this.userRepository.save(createUserDto);
  }

  async login(loginUserDto: LoginUserDto){
    const user: IUser = await this.findUserByEmail(loginUserDto.email);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    const passwordMatches = await this.validatePassword(loginUserDto.password, user.password);
    if (passwordMatches) {
      const jwt = await this.authService.generataJWT(user);
      delete user.password;
      return { 
        user: user,
        access_token: jwt }
    } else {
      throw new HttpException('Login was not Successfull', HttpStatus.UNAUTHORIZED);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(email: string) {
    return this.userRepository.find({ email });
  }

  private async findUserByEmail(email: string) {
    return await this.userRepository.findOne(
      { email },
      { select: ['id', 'email', 'name', 'password'] }
    );
  }

  private async validatePassword(password: string, storedPasswordHash: string) {
    return await this.authService.comparePasswords(password, storedPasswordHash)
  }

  private async mailExists(email: string) {
    const acc = await this.userRepository.findOne({ email })
    if (acc) {
      return true
    } else {
      return false
    }
  }

}
