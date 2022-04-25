import { Button } from '@chakra-ui/react'
import React from 'react'
import { useMoralis } from 'react-moralis'

export const SignoutButton = () => {
  const { logout } = useMoralis()
  return (
    <Button
      onClick={() => logout()}
      variant="solid"
      bg="blue.900"
      _hover={{ bg: 'blue.700' }}
      _active={{ bg: 'blue.700' }}
      _focus={{ outline: 'none' }}
    >
      Sign out
    </Button>
  )
}
