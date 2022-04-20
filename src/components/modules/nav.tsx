import React from 'react'
import { Button, Flex, Heading, HStack } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import { useMoralis } from 'react-moralis'
import { getEllipsisTxt } from '@/helpers/formatters'

export const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { user, logout } = useMoralis()
  
  return (
    <Flex
      w="full"
      display="flex"
      align="center"
      justify="space-between"
      maxW="1440px"
      m="0 auto"
      pb={4}
    >
      <HStack spacing={4} ml="auto">
        {user && (
          <>
            <Heading fontSize="md">
              Connected: {getEllipsisTxt(user.id as string, 4)}
            </Heading>
            <Button onClick={() => logout()}>Sign out</Button>
          </>
        )}

        <Button onClick={toggleColorMode}>
          {colorMode === 'dark' ? 'light' : 'dark'}
        </Button>
      </HStack>
    </Flex>
  )
}
