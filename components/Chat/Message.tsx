'use client'

import { useCallback, useState, useEffect } from 'react'
import { Avatar, Flex, IconButton, Tooltip } from '@radix-ui/themes'
import { HiUser } from 'react-icons/hi'
import { Markdown } from '@/components'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { ChatMessage } from './interface'
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi'
import { randomUUID } from 'crypto'

export interface MessageProps {
  message: ChatMessage
  onAgentResponse: (response: ChatMessage) => void;
}

const Message = (props: MessageProps) => {
  const { role, content } = props.message;
  const { onAgentResponse } = props;
  const isUser = role === 'user'
  const copy = useCopyToClipboard()
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)

  const onCopy = useCallback(() => {
    copy(content, (isSuccess) => {
      if (isSuccess) {
        setTooltipOpen(true)
      }
    })
  }, [content, copy])

  /* 
  Create a UUID for each Message generated in a Chat. Used by the thumbs up 
  and down feature to refer to the message it is updating. 
  */
  const message_uuid = self.crypto.randomUUID();


  /* 
  Rendering the UI components of user and assistant messages. This section only
  creates the UI elements of each individual text box. The larger div is 
  part of the Chat.tsx file. 
  */
  return (
    /* 
    The <Avatar/> section creates an avatar icon which is 
    pink if it is the "assistant" or
    undefined otherwise (blue in this case)
    */
    <Flex gap="4" className="mb-5">       
      <Avatar
        fallback={<HiUser className="size-4" />}
        color={isUser ? undefined : 'pink'}
        size="2"
        radius="full"
      /> 
      <div className="flex-1 pt-1 break-all" id={message_uuid}>
        {isUser ? ( // If the message is a user message, then the content of the
                    // div is replaced by the code below.
          <div
            className="userMessage"
            dangerouslySetInnerHTML={{
              __html: content.replace(
                /<(?!\/?br\/?.+?>|\/?img|\/?table|\/?thead|\/?tbody|\/?tr|\/?td|\/?th.+?>)[^<>]*>/gi,
                ''
              )
            }} 
          ></div>
        ) : ( 
          /*
          If the message is not from the user, then the message div should
          contain the contents from {contents} as markdown text. 
          
          The nested
          Flex section is to provide a thumbs up or down feature to rate the
          reply of the assistant. The `id` of the Flex below is generated as a
          UUID from variable constructed above.
           */
          <Flex direction="column" gap="4">
            <Markdown>{content}</Markdown>
            
            <Flex gap='1'>
              <Tooltip content={"Thumbs Down"}>
              <IconButton
                  variant="soft"
                  // disabled={isToggled} *Implement 
                  color="gray"
                  size="2"
                  className="rounded-xl thumbs-down"
                  // onClick={sendMessage} *Add JSON file
                >
                  <FiThumbsDown />  
                </IconButton>
              </Tooltip>
              <Tooltip content={"Thumbs Up"}>
                <IconButton
                  variant="soft"
                  // disabled={isToggled} *Implement 
                  color="gray"
                  size="2"
                  className="rounded-xl thumbs-up"
                  // onClick={sendMessage} *Add JSON file
                >
                  <FiThumbsUp />  
                </IconButton>
              </Tooltip>
            </Flex>

          </Flex>
        )}
      </div>
    </Flex>
  )
}

export default Message


