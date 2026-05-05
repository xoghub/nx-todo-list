import { Controller, Get, Put, Delete, Body, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() req: any) {
    return this.userService.findOne(req.user.id);
  }

  @Put('profile')
  async updateProfile(@Req() req: any, @Body() updateData: any) {
    return this.userService.update(req.user.id, updateData);
  }

  @Delete('profile')
  async deleteAccount(@Req() req: any) {
    return this.userService.delete(req.user.id);
  }

  @Put('change-password')
  async changePassword(@Req() req: any, @Body('password') password: string) {
    return this.userService.changePassword(req.user.id, password);
  }
}
