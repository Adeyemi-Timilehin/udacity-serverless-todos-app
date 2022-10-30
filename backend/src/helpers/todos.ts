import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import * as uuid from 'uuid';
import { APIGatewayProxyEvent } from 'aws-lambda'
import { getUserId } from '../lambda/utils'
import { TodoItem } from '../models/TodoItem'
import { deleteTodos, updateTodos } from './todosAcess'

export function todoCreate(todoRequest: CreateTodoRequest, event: APIGatewayProxyEvent): TodoItem {
    const todoId = uuid.v4()
    if (!todoRequest.name) return null
    const todo = {
        todoId: todoId,
        userId: getUserId(event),
        createdAt: new Date().toISOString(),
        done: false,
        attachmentUrl: "",
        ...todoRequest
    }
    return todo as TodoItem
}

export async function deleteTodo(userId: string, todoId: string): Promise<string> {
    await deleteTodos(userId, todoId)

    return
}

export async function updateTodo(userId: string, todoId: string, updatedTodo: UpdateTodoRequest): Promise<TodoItem> {

    await updateTodos(updatedTodo, todoId, userId)

    return
}
