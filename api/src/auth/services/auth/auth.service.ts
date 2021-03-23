import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';
import { IUser } from 'src/user/models/user.interface';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService
  ) {}

  async generataJWT(user: IUser) {
    return await this.jwtService.signAsync({ user });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async comparePasswords(password: string, passowrdHash: string) {
    return await bcrypt.compare(password, passowrdHash)
  }

}
