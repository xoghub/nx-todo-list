import { Injectable } from '@nestjs/common';
import { CreateTodoDto, TodoInterface } from '@nx-todo-list/shared';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  createTodo(todo: CreateTodoDto): TodoInterface {
    return {
      id: uuidv4(),
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate,
      status: true,
      createdAt: new Date().toISOString(),
      createdBy: 'admin',
      modifiedAt: new Date().toISOString(),
      modifiedBy: 'admin',
    };
  }
}
