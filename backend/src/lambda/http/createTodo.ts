import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';

import { todoCreate } from '../../helpers/todos'

import { createTodo } from '../../helpers/todosAcess'
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    
    const userId=getUserId(event)
const todo=todoCreate(newTodo,userId)
const createdTodo=await createTodo(todo)

return {
  statusCode: 201,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  },
  body: JSON.stringify({
    createdTodo
  })
}
  }
)

handler.use(
  cors({
    credentials: true
  })
)
