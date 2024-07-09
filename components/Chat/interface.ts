
/* 
Define an interface which stores message content (as string)
for a given user. Users are defined below in ChatRole. 
*/
export interface ChatMessage {
  content: string
  role: ChatRole
  rating: ChatRating // Used to determine the utility of an assistant response.
}

/*
 Defines a persona for a user, this is likely used for defining personas
 for different LLM models. For example, assigning behaviors for ChatGPT vs
 CoPilot, etc. 
 */
export interface Persona {
  id?: string
  role: ChatRole
  avatar?: string
  name?: string
  prompt?: string
  key?: string
  isDefault?: boolean
}

/* 
Defines a chat interface that contains the messages stored in the ChatMessage
interface as an array and provides a unique id for each chat instance.
*/
export interface Chat {
  id: string
  persona?: Persona
  messages?: ChatMessage[]
}

/* 
Defines the possible chat role types, the most commonly used being "assistant"
as referred to the LLM and "user" referring to the person prompting for answers.
*/
export type ChatRole = 'assistant' | 'user' | 'system' | 'agent';

/*
Defines the possible values for the thumbs up/down mechanism for providing
feedback on the utility of an answer.
*/
export type ChatRating = 'unchecked' | 'up' | 'down' | ''