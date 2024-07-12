'use client'

import React, { useContext, useState } from 'react';
import { Box, Flex, IconButton, ScrollArea, Text } from '@radix-ui/themes';
import cs from 'classnames';
import { AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import { BiMessageDetail } from 'react-icons/bi';
import { FiPlus } from 'react-icons/fi';
import ChatContext from './chatContext';
import type { ChatMessage } from './interface';

import './index.scss';

// Updated generateChatSummary function
function generateChatSummary(messages: ChatMessage[]): { summary: string, agentResponse: string } {
  if (messages.length === 0) {
    return { summary: "New Chat", agentResponse: "" };
  }

  const userMessages = messages.filter((msg) => msg.role === 'user');
  const assistantMessages = messages.filter((msg) => msg.role === 'assistant');

  let summary = "New Chat";
  let agentResponse = "";

  if (userMessages.length > 0) {
    summary = `${userMessages[0].content.replace(/&nbsp;/g, ' ').trim().substring(0, 25)}...`;
  }

  if (assistantMessages.length > 0) {
    const lastAgentMessage = assistantMessages[assistantMessages.length - 1];
    if (lastAgentMessage.content.includes('<iframe')) {
      agentResponse = "Map";
    } else if (lastAgentMessage.content.includes('<img')) {
      agentResponse = "Image";
    } else {
      agentResponse = "Text";
    }
  }

  return { summary, agentResponse };
}

export const ChatSideBar = () => {
  const {
    currentChatRef,
    chatList,
    DefaultPersonas,
    toggleSidebar,
    onDeleteChat,
    onChangeChat,
    onCreateChat,
  } = useContext(ChatContext);

  const [searchTerm, setSearchTerm] = useState('');

  // Filter chat list based on the search term
  const filteredChatList = chatList.filter(chat =>
    chat.persona?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.messages?.some(message => message.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Flex direction="column" className={cs('chart-side-bar', { show: toggleSidebar })}>
      <Flex className="p-2 h-full overflow-hidden w-64" direction="column" gap="3">
        <Flex align="center" gap="2" className="p-2" style={{ alignItems: 'center' }}>
          <Box
            width="auto"
            className="bg-token-surface-primary active:scale-95 cursor-pointer"
            style={{ display: 'flex', alignItems: 'center', padding: '8px', borderRadius: '8px', flexGrow: 1 }}
          >
            <AiOutlineSearch className="size-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginLeft: '8px', background: 'transparent', border: 'none', outline: 'none', color: 'inherit', width: '100%' }}
            />
          </Box>
          <IconButton
            size="2"
            className="cursor-pointer"
            variant="ghost"
            color="gray"
            radius="full"
            onClick={() => onCreateChat?.(DefaultPersonas[0])}
          >
            <FiPlus className="size-4" />
          </IconButton>
        </Flex>
        <ScrollArea className="flex-1" type="auto" scrollbars="vertical">
          <Flex direction="column" gap="3">
            {filteredChatList.map((chat) => {
              const { summary, agentResponse } = generateChatSummary(chat.messages || []);
              return (
                <Box
                  key={chat.id}
                  width="auto"
                  className={cs('bg-token-surface active:scale-95 truncate cursor-pointer', {
                    active: currentChatRef?.current?.id === chat.id
                  })}
                  onClick={() => onChangeChat?.(chat)}
                  style={{ padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Flex direction="row" align="center" gap="2" style={{ flexGrow: 1 }}>
                    <BiMessageDetail className="size-4" />
                    <Flex direction="column" width="auto" style={{ flexGrow: 1 }}>
                      <Text as="p" className="truncate text-xs">
                        {summary}
                      </Text>
                      <Text as="p" className="truncate text-xs">
                        {agentResponse}
                      </Text>
                    </Flex>
                  </Flex>
                  <IconButton
                    size="2"
                    className="cursor-pointer"
                    variant="ghost"
                    color="gray"
                    radius="full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat?.(chat);
                    }}
                  >
                    <AiOutlineCloseCircle className="size-4" />
                  </IconButton>
                </Box>
              );
            })}
          </Flex>
        </ScrollArea>
      </Flex>
    </Flex>
  );
}

export default ChatSideBar;
