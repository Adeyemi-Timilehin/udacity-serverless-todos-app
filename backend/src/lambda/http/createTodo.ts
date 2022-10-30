import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'


import { createTodo } from '../../helpers/todosAcess'
import { todoCreate } from '../../helpers/todos'

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const newTodo: CreateTodoRequest = JSON.parse(event.body)
        // Implement creating a new TODO item
        const todo = todoCreate(newTodo, event)
        const createdTodo = await createTodo(todo)

        return {
            statusCode: 201,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
               "item":createdTodo
            })
        }
    }
)

handler.use(
  cors({
    credentials: true
  })
)
