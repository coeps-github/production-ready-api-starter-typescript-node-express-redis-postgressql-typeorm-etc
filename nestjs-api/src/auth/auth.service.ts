import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }

  // TODO: Warning
  //   Of course in a real application, you wouldn't store a password in plain text.
  //   You'd instead use a library like bcrypt, with a salted one-way hash algorithm.
  //   With that approach, you'd only store hashed passwords,
  //   and then compare the stored password to a hashed version of the incoming password,
  //   thus never storing or exposing user passwords in plain text.
  //   To keep our sample app simple, we violate that absolute mandate and use plain text.
  //   Don't do this in your real app!
  async validateUsernameAndPassword(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateIdAndUsername(id: string, username: string): Promise<any> {
    const user = await this.usersService.findOneId(id);
    if (user && user.username === username) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { id: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
