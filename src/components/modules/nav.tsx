import React from 'react'
import { Button, Flex, Heading, HStack } from '@chakra-ui/react'
import { useMoralis } from 'react-moralis'
import { getEllipsisTxt } from '@/helpers/formatters'

export const Nav = () => {
  const { user, logout } = useMoralis()

  return (
    <Flex
      w="full"
      display="flex"
      align="center"
      justify="space-between"
      maxW="1440px"
      m="0 auto 10px auto"
      pb={4}
    >
      <Heading size="sm">NFT Minter</Heading>
      {user && (
        <HStack spacing={4} ml="auto" bg="brand.glass" p="8px 20px">
          <Heading fontSize="sm">
            Connected: {getEllipsisTxt(user.id as string, 4)}
          </Heading>
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
        </HStack>
      )}
    </Flex>
  )
}
