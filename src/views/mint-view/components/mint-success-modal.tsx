import { MINTER_CONTRACT_ADDRESS } from '@/blockchain/contracts/minter'
import { Modal } from '@/components/modules/modal'
import { sleep } from '@/helpers/sleep'
import {
  Button,
  Flex,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'

interface MintSuccessModalProps {
  data: any
  isOpen: boolean
  onClose: () => void
}

export const MintSuccessModal = ({
  data,
  isOpen,
  onClose,
}: MintSuccessModalProps) => {
  const [isLinkLoading, setIsLinkLoading] = React.useState(false)
  const tokenId = data?.events?.Transfer?.returnValues?.tokenId

  useEffect(() => {
    if (!!tokenId && !!data) handleLinkLoading()
  }, [tokenId, data])

  async function handleLinkLoading() {
    setIsLinkLoading(true)
    await sleep(5000)
    setIsLinkLoading(false)
  }

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
            isDisabled={isLinkLoading}
          >
            See on Open Sea {isLinkLoading && <Spinner size="sm" ml={2} />}
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
