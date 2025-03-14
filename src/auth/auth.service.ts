import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { BlacklistService } from './blacklist.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async logout(token: string): Promise<void> {
    this.blacklistService.addTokenToBlacklist(token);
  }

  async validateToken(token: string): Promise<any> {
    if (this.blacklistService.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('Token is invalid');
    }

    return this.jwtService.verify(token);
  }
}
