import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest }from '../requests/UpdateTodoRequest';
import * as uuid from 'uuid';

import { TodoItem } from '../models/TodoItem'
import { TodosAccess } from './todosAcess';

const todosAccess=new TodosAccess();

export function getAllTodosByUserId(userId:string):Promise<TodoItem[]>{
    return todosAccess.getAllTodosByUserId(userId)
}

export  async function createTodo(todoRequest: CreateTodoRequest,userId:string): Promise<TodoItem> {
    if (!todoRequest.name) return null
    return await todosAccess.createTodo( {
        todoId: uuid.v4(),
        userId: userId,
        createdAt:new Date().toISOString() ,
       name:todoRequest.name,
       dueDate:todoRequest.dueDate,
        done: false,
        attachmentUrl: "",
    })
    
}


export async function updateTodos(userId: string, todoId: string, todoUpdate: UpdateTodoRequest): Promise<UpdateTodoRequest> {
    return await todosAccess.updateTodos(todoId, userId,todoUpdate);
}

export async function deleteTodo(todoId: string, userId: string) {
  return  await todosAccess.deleteTodo(todoId,userId);
}

export async function getAllTodoById(todoId: string) {
    return  await todosAccess.getAllTodoById(todoId);
}


export async function addAttachment(todo: TodoItem): Promise<TodoItem> {
    return  await todosAccess.addAttachment(todo);
}