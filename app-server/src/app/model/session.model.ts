import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.model';

@Entity('session')
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_user' })
  idUser: number;

  @ManyToOne(() => User, (user) => user.sessions)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column({ length: 255 })
  accessToken: string;

  @Column({ length: 255 })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
