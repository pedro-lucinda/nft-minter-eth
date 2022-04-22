import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Footer } from '../modules/footer'
import { Nav } from '../modules/nav'

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      w="100vw"
      minH="100vh"
      m="0 auto"
      p={4}
      display="flex"
      direction="column"
    >
      <Nav />
      {children}
      <Footer />
    </Flex>
  )
}
