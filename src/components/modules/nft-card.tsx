import { NFT } from '@/store/user-store/types'
import { Flex, Heading, Image, VStack } from '@chakra-ui/react'
import React from 'react'

export const NftCard = ({ nft }: { nft: NFT }) => {
  return (
    <VStack
      w="300px"
      h="400px"
      border="1px solid"
      borderRadius="35px"
      borderColor="brand.blueBorder"
      spacing={4}
      overflow="hidden"
      _hover={{
        transform: 'scale(0.95)',
        transition: 'transform 0.2s ease-in-out',
      }}
      bg="brand.glass"
    >
      <Image
        src={nft?.metadata?.image as string}
        alt="nft"
        w="full"
        h="300px"
        objectFit="cover"
      />
      <VStack>
        <Heading size="sm">{nft?.metadata?.name}</Heading>
        <Heading size="sm">{nft?.metadata?.description}</Heading>
      </VStack>
    </VStack>
  )
}
