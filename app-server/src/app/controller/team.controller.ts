import { Controller, Post, Get, Body, Req, UseGuards, Param, Delete } from '@nestjs/common';
import { TeamService } from '../services/team.service';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('team')
@UseGuards(JwtGuard)
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post()
  async createTeam(@Req() req: any, @Body('name') name: string) {
    return this.teamService.create(name, req.user.id);
  }

  @Get(':id')
  async getTeam(@Param('id') id: number) {
    return this.teamService.findOne(id);
  }

  @Post('invite')
  async inviteMember(@Body('teamId') teamId: number, @Body('userCode') userCode: string) {
    return this.teamService.inviteMember(teamId, userCode);
  }

  @Delete(':id/leave')
  async leaveTeam(@Req() req: any, @Param('id') id: number) {
    return this.teamService.leaveTeam(req.user.id, id);
  }
}
