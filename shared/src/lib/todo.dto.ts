import { TodoInterface } from "./todo.interface";

export interface CreateTodoDto extends Partial<TodoInterface> {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
}

export interface UpdateTodoDto {
    title?: string;
    description?: string;
    priority?: string;
    dueDate?: Date;
}

export interface DeleteTodoDto {
    id: number;
}