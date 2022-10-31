import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../models/TodoItem'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
const Tabletodos = process.env.TODOS_TABLE
const indextodos = process.env.TODOS_CREATED_AT_INDEX

const docClient: DocumentClient = createDynamoDBClient()

//connect to DynamoDBClient
function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
        console.log('Creating  DynamoDB instance')
        return new XAWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8005'
        })
    }

    return new XAWS.DynamoDB.DocumentClient()
}



//// TODO: Implement the dataLayer logic


//create todo
export async function createTodo(todo: TodoItem): Promise<TodoItem> {
    await docClient.put({
        TableName: Tabletodos,
        Item: todo
    }).promise()

    return todo
}

//get all todos by userId
export async function getAllTodosByUserId(userId: string): Promise<TodoItem[]> {
    const result = await docClient.query({
        TableName: Tabletodos,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    }).promise()
    
    return result.Items  as TodoItem[]
}

//update todos
export async function updateTodos(userId: string, todoId: string, todoUpdate: UpdateTodoRequest): Promise<UpdateTodoRequest> {
    await docClient.update({
        TableName: Tabletodos,
        Key: {
            userId: userId,
            todoId: todoId
        },
        UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
        ExpressionAttributeNames: {
            '#name': 'name'
        },
        ExpressionAttributeValues: {
            ':name': todoUpdate.name,
            ':dueDate': todoUpdate.dueDate,
            ':done': todoUpdate.done
        }

    }).promise()
    return todoUpdate
}

//datalogic to delete todos
export async function deleteTodo(todoId: string, userId: string) {
    await docClient.delete({
        TableName: Tabletodos,
        Key: {
            todoId: todoId,
            userId: userId
        }
    }).promise();

}

//add
export async function addAttachment(todo: TodoItem): Promise<TodoItem> {
    const result = await docClient.update({
        TableName: Tabletodos,
        Key: {
            userId: todo.userId,
            todoId: todo.todoId
        },
        UpdateExpression: 'set attachmentUrl = :attachmentUrl',
        ExpressionAttributeValues: {
            ':attachmentUrl': todo.attachmentUrl
        }
    }).promise()
    return result.Attributes as TodoItem
}

//get all todos by todoID
export async function getAllTodoById(todoId: string):Promise<TodoItem>  {
   const output= await docClient.query({
        TableName: Tabletodos,
        IndexName: indextodos,
        KeyConditionExpression: 'todoId = :todoId',
        ExpressionAttributeValues: {
            ':todoId': todoId
        }
    }).promise()
    const item = output.Items
    const result= (item.length >=1)?  item[0] as TodoItem :null
    return result
}