export interface ChatMessage {
  content: string
  role: ChatRole
  sourceLink?: string
}

export interface Persona {
  id?: string
  role: ChatRole
  avatar?: string
  name?: string
  prompt?: string
  key?: string
  isDefault?: boolean
}

export interface Chat {
  id: string
  persona?: Persona
  messages?: ChatMessage[]
  summary?: string
}

export type ChatRole = 'assistant' | 'user' | 'system' | 'agent';


