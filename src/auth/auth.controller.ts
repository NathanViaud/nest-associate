import { AuthService } from './auth.service';
import { Controller, Post, Body, UnauthorizedException, Req, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/users/dto/user-role.type';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<any> {
    const user = await this.authService.validateUser(body.email, body.password);

    return this.authService.login(user);
  }

  @Post('logout')
  async logout(@Req() req): Promise<void> {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.logout(token);
  }

  @Get('verify')
  @UseGuards(AuthGuard('jwt'))
  async verify(@Req() req): Promise<any> {
    return { message: 'Token is valid', user: req.user };
  }

  @Get('admin')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async admin(@Req() req): Promise<any> {
    return { message: 'Admin route', user: req.user };
  }
}
