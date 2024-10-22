'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  Text,
  TextField
} from '@radix-ui/themes'
import { debounce } from 'lodash-es'
import { AiOutlineClose, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { LuMessageSquarePlus } from 'react-icons/lu'
import { ChatContext, Persona } from '@/components'

export interface PersonaPanelProps { }

const PersonaPanel = (_props: PersonaPanelProps) => {
  const {
    openPersonaPanel,
    onClosePersonaPanel
  } = useContext(ChatContext)

  return openPersonaPanel ? (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      className="absolute top-0 z-10 flex-1"
      style={{ backgroundColor: 'var(--color-page-background)' }}
    >
      <Flex
        justify="between"
        align="center"
        py="3"
        px="4"
        style={{ backgroundColor: 'var(--gray-a2)' }}
      >
        <Heading size="4">Iowa State University Extensions and Outreach - CED </Heading>
        <IconButton
          size="2"
          variant="ghost"
          color="gray"
          radius="full"
          onClick={onClosePersonaPanel}
        >
          <AiOutlineClose className="size-4" />
        </IconButton>
      </Flex>
    </Flex>
  ) : null
}

export default PersonaPanel



