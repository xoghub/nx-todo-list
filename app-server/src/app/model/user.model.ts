import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Team } from './team.model';
import { UsersTeam } from './users_team.model';
import { Session } from './session.model';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_team', nullable: true })
  idTeam: number;

  @ManyToOne(() => Team, (team) => team.users)
  @JoinColumn({ name: 'id_team' })
  team: Team;

  @Column({ name: 'user_code', unique: true, length: 255 })
  userCode: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255 })
  fullName: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ length: 255, nullable: true })
  createdBy: string;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column({ length: 255, nullable: true })
  modifiedBy: string;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ default: false })
  is_verified: boolean;

  @OneToMany(() => UsersTeam, (usersTeam) => usersTeam.user)
  userTeams: UsersTeam[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
