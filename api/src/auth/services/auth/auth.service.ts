import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async comparePasswords(password: string, storedPasswordHash: string) {
    return await bcrypt.compare(password, storedPasswordHash)
  }

}
