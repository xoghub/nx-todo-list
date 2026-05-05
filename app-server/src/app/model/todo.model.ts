import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum TodoStatus {
  OPEN = 'open',
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export enum TodoPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.OPEN,
  })
  status: TodoStatus;

  @Column({
    type: 'enum',
    enum: TodoPriority,
    default: TodoPriority.MEDIUM,
  })
  priority: TodoPriority;

  @Column({ type: 'datetime' })
  dueDate: Date;

  @Column({ type: 'datetime', nullable: true })
  reminderTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ length: 255, nullable: true })
  createdBy: string;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column({ length: 255, nullable: true })
  modifiedBy: string;
}
