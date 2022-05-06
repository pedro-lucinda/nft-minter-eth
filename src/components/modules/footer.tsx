import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const Footer = () => {
  return (
    <Flex
      direction="column"
      align="center"
      w="full"
      h="100px"
      justify="center"
      mt="auto"
    >
      <Text fontWeight="bold">@2022 Pedro Lucinda</Text>
      <Text fontWeight="bold">pedrolucinda2022@gmail.com</Text>
    </Flex>
  )
}
