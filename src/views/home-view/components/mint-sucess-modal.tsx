import { MINTER_CONTRACT_ADDRESS } from '@/blockchain/contracts/minter'
import { Modal } from '@/components/modules/modal'
import { Button, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export const MintSuccessModal = ({ data, isOpen, onClose }: any) => {
  const tokenId = data?.events?.Transfer?.returnValues?.tokenId

  console.log(data)
  return (
    <Modal isOpen={isOpen} onClose={onClose} bg="brand.modalBg">
      <Flex direction="column" align="center">
        <Heading mb="20px">Success!</Heading>
        <VStack spacing={5} mb="20px" maxW="400px" minW="280px" w="full" p={4}>
          <Text fontSize="20px" maxW="300px" align="center" fontWeight="bold">
            NFT successfully minted.
            <br />
            Contract address:
            <br />
            <Text as="span" fontWeight="medium" fontSize="16px">
              {MINTER_CONTRACT_ADDRESS}
            </Text>
            <br />
            Token ID: <br />
            <Text as="span" fontWeight="medium" fontSize="16px">
              {tokenId}
            </Text>
          </Text>
        </VStack>
        <HStack mb="20px">
          <Button
            onClick={() =>
              window.open(
                `https://testnets.opensea.io/assets/${MINTER_CONTRACT_ADDRESS}/${tokenId}`,
              )
            }
            color="white"
            bg="purple.800"
            colorScheme="purple"
          >
            See on Open Sea
          </Button>
          <Button
            onClick={onClose}
            color="white"
            variant="outline"
            border="2px solid"
          >
            close
          </Button>
        </HStack>
      </Flex>
    </Modal>
  )
}
