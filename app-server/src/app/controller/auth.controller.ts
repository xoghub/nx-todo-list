import { Controller, Post, Body, Req, UseGuards, Get, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto } from '@nx-todo-list/shared';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  async logout(@Req() req: any) {
    const accessToken = req.headers.authorization.split(' ')[1];
    return this.authService.logout(req.user.id, accessToken);
  }

  @Get('verify-email')
  async verifyEmail(@Query('email') email: string) {
    return this.authService.verifyEmail(email);
  }
}
