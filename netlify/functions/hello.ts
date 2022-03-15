import { Handler } from '@netlify/functions'

const handler: Handler = async (e, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'hello world' })
  }
}

export default handler;