import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.model';
import { Team } from './team.model';

@Entity('users_team')
export class UsersTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_user' })
  idUser: number;

  @ManyToOne(() => User, (user) => user.userTeams)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column({ name: 'id_team' })
  idTeam: number;

  @ManyToOne(() => Team, (team) => team.userTeams)
  @JoinColumn({ name: 'id_team' })
  team: Team;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
