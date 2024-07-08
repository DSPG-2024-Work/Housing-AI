'use client'

import { useCallback, useState, useEffect } from 'react'
import { Avatar, Flex, IconButton, Tooltip } from '@radix-ui/themes'
import { HiUser } from 'react-icons/hi'
import { Markdown } from '@/components'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { ChatMessage } from './interface'
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi'

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

  return (
    <Flex gap="4" className="mb-5">
      <Avatar
        fallback={<HiUser className="size-4" />}
        color={isUser ? undefined : 'pink'}
        size="2"
        radius="full"
      />
      <div className="flex-1 pt-1 break-all">
        {isUser ? (
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


