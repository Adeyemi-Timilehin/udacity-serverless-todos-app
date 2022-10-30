import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { getTodoById, addAttachment} from '../../helpers/todosAcess'
import { getUploadUrl } from '../../helpers/attachmentUtils'

const bucketname = process.env.ATTACHMENT_S3_BUCKET

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todosId = event.pathParameters.todoId
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
        const todo = await getTodoById(todosId)
        todo.attachmentUrl = `https://${bucketname}.s3.amazonaws.com/${todosId}`
        await addAttachment(todo)

        const url = await getUploadUrl(todosId)

        return {
            statusCode: 201,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
               uploadUrl: url 
            })
        }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
