import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Set the runtime to edge
export const runtime = 'edge'

// Create a new OpenAI API instance
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

/**
 * POST /api/chat - Chat with the OpenAI API using the GPT-3.5-turbo model
 *
 * @param {Request} req
 * @returns {Promise<StreamingTextResponse>}
 */
export async function POST (req) {
  // Get the `messages` from the request body
  const { messages } = await req.json()

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
    max_tokens: 500,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
