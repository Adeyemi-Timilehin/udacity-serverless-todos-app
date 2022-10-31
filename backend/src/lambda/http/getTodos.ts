import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getAllTodosByUserId } from '../../helpers/todos'
import { getUserId } from '../utils'

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    const todos = await getAllTodosByUserId(getUserId(event))

        return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
                items: todos
            }
            )
        }
    }
    )
handler.use(
  cors({
    credentials: true
  })
)
