import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../model/team.model';
import { User } from '../model/user.model';
import { UsersTeam } from '../model/users_team.model';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UsersTeam)
    private usersTeamRepository: Repository<UsersTeam>,
  ) {}

  async create(name: string, userId: number): Promise<Team> {
    const team = this.teamRepository.create({ name });
    const savedTeam = await this.teamRepository.save(team);

    // Add creator to users_team
    const usersTeam = this.usersTeamRepository.create({
      idUser: userId,
      idTeam: savedTeam.id,
    });
    await this.usersTeamRepository.save(usersTeam);

    // Update user's id_team
    await this.userRepository.update(userId, { idTeam: savedTeam.id });

    return savedTeam;
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({ 
      where: { id },
      relations: ['users']
    });
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async inviteMember(teamId: number, userCode: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { userCode } });
    if (!user) throw new NotFoundException('User not found');
    
    // In a real app, this would create an invitation entity.
    // For now, let's just add them to the team directly or mock it.
    const usersTeam = this.usersTeamRepository.create({
      idUser: user.id,
      idTeam: teamId,
    });
    await this.usersTeamRepository.save(usersTeam);
  }

  async leaveTeam(userId: number, teamId: number): Promise<void> {
    await this.usersTeamRepository.delete({ idUser: userId, idTeam: teamId });
    await this.userRepository.update(userId, { idTeam: null });
  }
}
