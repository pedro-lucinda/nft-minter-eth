import { Flex, Heading, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { MintSuccessModal } from './components/mint-sucess-modal'
import { NftForm } from './components/nft-form'

export const HomeView = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [responseData, setResponseData] = React.useState<any>()

  const onSuccess = (response: any) => {
    console.log('response', response)
    setResponseData(response)
    onOpen()
  }

  return (
    <>
      <MintSuccessModal isOpen={isOpen} onClose={onClose} data={responseData} />
      <Flex w="full" direction="column" align="center">
        <Heading my={10}>Create your NFT</Heading>
        <NftForm onSuccess={onSuccess} />
      </Flex>
    </>
  )
}
