'use client'

import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useReducer
} from 'react'
import { Flex, Heading, IconButton, ScrollArea, Tooltip } from '@radix-ui/themes'
import ContentEditable from 'react-contenteditable'
import toast from 'react-hot-toast'
import { AiOutlineClear, AiOutlineLoading3Quarters, AiOutlineUnorderedList } from 'react-icons/ai'
import { FiSend } from 'react-icons/fi'
import ChatContext from './chatContext'
import type { Chat, ChatMessage } from './interface'
import Message from './Message'

import './index.scss'

const HTML_REGULAR =
  /<(?!img|table|\/table|thead|\/thead|tbody|\/tbody|tr|\/tr|td|\/td|th|\/th|br|\/br).*?>/gi

export interface ChatProps { }

export interface ChatGPInstance {
  setConversation: (messages: ChatMessage[]) => void
  getConversation: () => ChatMessage[]
  focus: () => void
}

const postChatOrQuestion = async (chat: Chat, messages: any[], input: string) => {
  console.log(process.env.VS_CODE_PRXY)
  var url = '/chat'
  const proxy_url = window.location.href;
  if(proxy_url) {
    url = proxy_url.replace('3000', '5000')
  }

  const data = {
    prompt: chat?.persona?.prompt,
    messages: [...messages!],
    input
  }

  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'text/event-stream'
    },
    body: JSON.stringify(data)
  })
}

const Chat = (props: ChatProps, ref: any) => {
  const { debug, currentChatRef, saveMessages, onToggleSidebar } =
    useContext(ChatContext)
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const conversation = useRef<ChatMessage[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const conversationRef = useRef<ChatMessage[]>()

  const [message, setMessage] = useState('')

  const [currentMessage, setCurrentMessage] = useState<string>('')

  const textAreaRef = useRef<HTMLElement>(null)

  const bottomOfChatRef = useRef<HTMLDivElement>(null)

  const handleAgentResponse = useCallback((response: ChatMessage) => {
    conversation.current = [...conversation.current, response];

    // Check if the response includes a source link
    if (response.sourceLink) {
      const sourceLinkContent = `Source: <a href="${response.sourceLink}" target="_blank">${response.sourceLink}</a>`;
      conversation.current.push({ content: sourceLinkContent, role: 'assistant' });
    }

    forceUpdate();
  }, []);

  const isValidUrl = (string: string) => {
    if (string.startsWith('/')) {
      return true;
    }
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  const sendMessage = useCallback(
    async (e: any) => {
      if (!isLoading) {
        e.preventDefault();
        const input = textAreaRef.current?.innerHTML?.replace(HTML_REGULAR, '') || '';

        if (input.length < 1) {
          toast.error('Please type a message to continue.');
          return;
        }

        const message = [...conversation.current];
        conversation.current = [...conversation.current, { content: input, role: 'user' }];
        setMessage('');
        setIsLoading(true);
        try {
          let resultContent = 'SourceLink:';
          const sourceLink = 'https://dspg.iastate.edu/'; 
          
          // char logic
          const char = "/Des_Moines_LowIncome_BlockGroup_Map.html";
          if (char) {
            setCurrentMessage((state) => {
              if (debug) {
                console.log({ char });
              }
              
              // 1. text and map
              // resultContent = state + `<div class="text-container">Here is the map you requested. This map highlights low-income block groups in Des Moines, providing a visual representation of areas with higher concentrations of low-income households. Understanding the distribution of these areas can be crucial for urban planning, resource allocation, and community development efforts. By analyzing this map, stakeholders can identify specific neighborhoods that may benefit from targeted interventions and support.</div>`;
              // if (char.includes('/maps/') || char.endsWith('.html') || char.startsWith('/')) { 
              //   if (isValidUrl(char)) {
              //     var responseContent = char.replace('map : ', '').trim();
              //     resultContent += `<div class="iframe-container"><iframe src="${responseContent}" frameborder="0"></iframe></div>`;
              //   }
              // }

              // 2. map and text
              // if (char.includes('/maps/') || char.endsWith('.html') || char.startsWith('/')) { 
              //   if (isValidUrl(char)) {
              //     var responseContent = char.replace('map : ', '').trim();
              //     resultContent = state + `<div class="iframe-container"><iframe src="${responseContent}" frameborder="0"></iframe></div>`;
              //   }
              // } 
              // resultContent += `<div class="text-container">This map highlights low-income block groups in Des Moines, providing a visual representation of areas with higher concentrations of low-income households. Understanding the distribution of these areas can be crucial for urban planning, resource allocation, and community development efforts. By analyzing this map, stakeholders can identify specific neighborhoods that may benefit from targeted interventions and support.</div>`;

              // 3. Only text
              resultContent = state + `<div class="text-container">The Rural Housing Readiness Assessment program is a multi-stage process aimed at developing a coherent, realistic, and well-reasoned housing strategy for a community. The process involves several stages, including pre-meeting organizing, an educational workshop, a community survey, the creation of a final report, action planning, and team formation to meet goals. This comprehensive approach enables the development of an effective action plan to improve housing in the community, focusing on aspects such as availability, affordability, and quality.</div>`;
              
              // 4. Only map
              // if (char.includes('/maps/') || char.endsWith('.html') || char.startsWith('/')) { 
              //   if (isValidUrl(char)) {
              //     var responseContent = char.replace('map : ', '').trim();
              //     resultContent = state + `<div class="iframe-container"><iframe src="${responseContent}" frameborder="0"></iframe></div>`;
              //   }
              // }

              return resultContent;
            });
          }

          setTimeout(() => {
            if (debug) {
              console.log({ resultContent, sourceLink });
            }
            conversation.current = [
              ...conversation.current,
              { content: resultContent, role: 'assistant', sourceLink } 
            ];
            forceUpdate();

            setCurrentMessage('');
          }, 1);

          setIsLoading(false);
        } catch (error: any) {
          console.error(error);
          toast.error(error.message);
          setIsLoading(false);
        }
      }
    },
    [currentChatRef, debug, isLoading]
  )

  const handleKeypress = useCallback(
    (e: any) => {
      if (e.keyCode == 13 && !e.shiftKey) {
        sendMessage(e)
        e.preventDefault()
      }
    },
    [sendMessage]
  )

  const clearMessages = () => {
    conversation.current = [];
    forceUpdate?.();
    setMessage('');
    setCurrentMessage('');
    setIsLoading(false);
  }

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '50px'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 2}px`
    }
  }, [message, textAreaRef])

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [conversation, currentMessage])

  useEffect(() => {
    conversationRef.current = conversation.current
    if (currentChatRef?.current?.id) {
      saveMessages?.(conversation.current)
    }
  }, [currentChatRef, conversation.current, saveMessages])

  useEffect(() => {
    if (!isLoading) {
      textAreaRef.current?.focus()
    }
  }, [isLoading])

  useImperativeHandle(ref, () => {
    return {
      setConversation(messages: ChatMessage[]) {
        conversation.current = messages
        forceUpdate?.()
      },
      getConversation() {
        return conversationRef.current
      },
      focus: () => {
        textAreaRef.current?.focus()
      }
    }
  })

  return (
    <Flex direction="column" height="100%" className="relative" gap="3">
      <Flex
        justify="between"
        align="center"
        py="3"
        px="4"
        style={{ backgroundColor: 'var(--gray-a2)' }}
      >
        <Heading size="4">Housing & AI</Heading>
      </Flex>
      <ScrollArea
        className="flex-1 px-4"
        type="auto"
        scrollbars="vertical"
        style={{ height: '100%' }}
      >
        {conversation.current.map((item, index) => (
          <Message key={index} message={item} onAgentResponse={handleAgentResponse} />
        ))}
        {currentMessage && <Message message={{ content: currentMessage, role: 'assistant' }} onAgentResponse={handleAgentResponse} />}
        <div ref={bottomOfChatRef}></div>
      </ScrollArea>
      <div className="px-4 pb-3">
        <Flex align="end" justify="between" gap="3" className="relative">
          <div className="rt-TextAreaRoot rt-r-size-1 rt-variant-surface flex-1 rounded-3xl chat-textarea">
            <ContentEditable
              innerRef={textAreaRef}
              style={{
                minHeight: '24px',
                maxHeight: '200px',
                overflowY: 'auto',

              }}
              className="rt-TextAreaInput text-base"
              html={message}
              disabled={isLoading}
              onChange={(e) => {
                setMessage(e.target.value.replace(HTML_REGULAR, ''))
              }}
              onKeyDown={(e) => {
                handleKeypress(e)
              }}
            />
            <div className="rt-TextAreaChrome"></div>
          </div>
          <Flex gap="3" className="absolute right-0 pr-4 bottom-2 pt">
            {isLoading && (
              <Flex
                width="6"
                height="6"
                align="center"
                justify="center"
                style={{ color: 'var(--accent-11)' }}
              >
                <AiOutlineLoading3Quarters className="animate-spin size-4" />
              </Flex>
            )}
            <Tooltip content={'Send Message'}>
              <IconButton
                variant="soft"
                disabled={isLoading}
                color="gray"
                size="2"
                className="rounded-xl cursor-pointer"
                onClick={sendMessage}
              >
                <FiSend className="size-4" />
              </IconButton>
            </Tooltip>
            <Tooltip content={'Clear History'}>
              <IconButton
                variant="soft"
                color="gray"
                size="2"
                className="rounded-xl cursor-pointer"
                disabled={isLoading}
                onClick={clearMessages}
              >
                <AiOutlineClear className="size-4" />
              </IconButton>
            </Tooltip>
            <Tooltip content={'Toggle Sidebar'}>
              <IconButton
                variant="soft"
                color="gray"
                size="2"
                className="rounded-xl md:hidden cursor-pointer"
                disabled={isLoading}
                onClick={onToggleSidebar}
              >
                <AiOutlineUnorderedList className="size-4" />
              </IconButton>
            </Tooltip>
          </Flex>
        </Flex>
      </div>
    </Flex>
  )
}

export default forwardRef<ChatGPInstance, ChatProps>(Chat)


