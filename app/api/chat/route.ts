/* Code here is used as an Interceptor */

import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge' 

/* 
Create an interface called 'Message' to handle API messaging
with flask as a service.
*/
export interface Message {
  role: string
  content: string
}

// Defines the behavior for POST in the service API
export async function POST(req: NextRequest) {
  /* 
  'req' takes in an argument in JSON form which is then parsed
  to retrieve the messages and input values. The messages are the
  responses provided by the assistant and the input are the streams
  provided by the user 
  */
  try {
    const { messages, input } = (await req.json()) as {
      messages: Message[]
      input: string
    }

    // User input is added into an array called'messagesWithHistory'
    const messagesWithHistory = [
      ...messages,
      { content: input, role: 'user' }
    ]

    /*
    The function 'getLocalLLMStream is called to return the new response
    provided by the assistant after providing the messages with chat history. 
    */
    const stream = await getLocalLLMStream(messagesWithHistory);
    return new NextResponse(stream, {
      headers: { 'Content-Type': 'text/event-stream' }
    })
  } 
  
  /* 
  Catches any error and if it is known to JS, prints that, otherwise
  an 'Unknown Error' is posted.
  */
  catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown Error' },
      { status: 500 }
    )
  }
}

/* NEEDS COMMENTS */

const getLocalLLMStream = async (
  messages: Message[]
) => {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const res = await fetch("https://localhost:5000/chat", {
    method: 'POST',
    headers: {
      'Accept': 'text/event-stream'
    },
  })

  // Checks for whether the connection status is not OK
  if (res.status !== 200) {
    const statusText = res.statusText
    const responseBody = await res.text() 
    console.error(`OpenAI API response error: ${responseBody}`)
    throw new Error(
      `The OpenAI API has encountered an error with a status code of ${res.status} ${statusText}: ${responseBody}`
    )
  }

  return new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data

          if (data === '[DONE]') {
            controller.close()
            return
          }

          try {
            controller.enqueue(data)
          } catch (e) {
            controller.error(e)
          }
        }
      }

      const parser = createParser(onParse)

      for await (const chunk of res.body as any) {

        const str = decoder.decode(chunk).replace('[DONE]\n', '[DONE]\n\n')
        parser.feed(str)
      }
    }
  })
}

