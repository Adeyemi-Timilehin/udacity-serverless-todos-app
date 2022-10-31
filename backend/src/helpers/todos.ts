import { CreateTodoRequest } from '../requests/CreateTodoRequest';

import * as uuid from 'uuid';

import { TodoItem } from '../models/TodoItem'


export function todoCreate(todoRequest: CreateTodoRequest,userId:string): TodoItem {
    const todoId = uuid.v4()
    const createdAt=new Date().toISOString()
    const todo = {
        todoId: todoId,
        userId: userId,
        createdAt:createdAt ,
        done: false,
        attachmentUrl: "",
        ...todoRequest
    }
    return todo as TodoItem
}

