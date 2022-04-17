import { Button, Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import { useColorMode } from '@chakra-ui/color-mode'
import { AuthButton } from '../elements/auth-button'

export const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode()

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
        <AuthButton />
        <Button onClick={toggleColorMode}>
          {colorMode === 'dark' ? 'light' : 'dark'}
        </Button>
      </HStack>
    </Flex>
  )
}
