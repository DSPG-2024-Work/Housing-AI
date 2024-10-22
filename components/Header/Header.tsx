'use client'

import { useCallback, useState } from 'react'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Avatar, Flex, Heading, IconButton, Select, Tooltip } from '@radix-ui/themes'
import cs from 'classnames'
import NextLink from 'next/link'
import Image from 'next/image'
import { FaAdjust, FaGithub, FaMoon, FaRegSun } from 'react-icons/fa'
import { Link } from '../Link'
import { useTheme } from '../Themes'

export const Header = () => {
  const { theme, setTheme } = useTheme()
  const [, setShow] = useState(false)

  const toggleNavBar = useCallback(() => {
    setShow((state) => !state)
  }, [])

  return (
    <header
      className={cs('block shadow-sm sticky top-0 dark:shadow-gray-500 py-4 px-6 z-20')}
      style={{ 
        backgroundColor: 'var(--color-background)',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Flex align="center" gap="4" className="relative w-full">
        {/* Logo container */}
        <div className="flex-none" style={{ width: '250px' }}>
          <NextLink href="/">
            <Image
              src="/ISUEO.jpg"
              alt="ISU Extension and Outreach"
              width={200}
              height={60}
              style={{
                height: '60px',
                width: 'auto',
                objectFit: 'contain',
                background: theme === 'dark' ? 'white' : 'transparent',
                borderRadius: '4px',
                padding: '2px'
              }}
              priority
              className="header-logo"
            />
          </NextLink>
        </div>

        {/* Title container */}
        <div className="flex-1 text-center">
          <Heading 
            as="h2" 
            size="4" 
            style={{ 
              margin: '0 auto',
              fontSize: '1.3rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}
          >
            Iowa State University Extensions and Outreach - CED
          </Heading>
        </div>

        {/* Controls container */}
        <div className="flex-none flex items-center gap-4">
          <Avatar
            color="gray"
            size="2"
            radius="full"
            fallback={
              <Link href="https://github.com/DSPG-2024-Work/Housing-AI/issues/new">
                <FaGithub />
              </Link>
            }
          />
          <Select.Root value={theme} onValueChange={setTheme}>
            <Select.Trigger radius="full" />
            <Select.Content>
              <Select.Item value="light">
                <FaRegSun />
              </Select.Item>
              <Select.Item value="dark">
                <FaMoon />
              </Select.Item>
              <Select.Item value="system">
                <FaAdjust />
              </Select.Item>
            </Select.Content>
          </Select.Root>
          
          <Tooltip content="Navigation">
            <IconButton
              size="3"
              variant="ghost"
              color="gray"
              className="md:hidden"
              onClick={toggleNavBar}
            >
              <HamburgerMenuIcon width="16" height="16" />
            </IconButton>
          </Tooltip>
        </div>
      </Flex>
    </header>
  )
}

export default Header