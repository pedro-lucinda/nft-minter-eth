import React from 'react'
import { useMinterContract } from '@/blockchain/contracts/minter/use-minter-contract'
import { Input } from '@/components/elements/input'
import { NftCard } from '@/components/elements/nft-card'
import { TextArea } from '@/components/elements/text-area'
import { toast } from '@/components/elements/toast'
import { Box, Button, Flex } from '@chakra-ui/react'
import { sleep } from '@/helpers/sleep'

interface NftFormProps {
  onSuccess: any
}

export const NftForm = ({ onSuccess }: NftFormProps) => {
  const { executeMintContract, isMinterContractLoading } = useMinterContract()
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [file, setFile] = React.useState<File | null>(null)

  const onSubmit = async () => {
    if (!file) {
      return toast({
        title: 'Please upload an image',
        status: 'error',
        position: 'top',
        isClosable: true,
      })
    }
    await executeMintContract(name, description, file, handleSuccess)
  }

  const handleSuccess = async (response: any) => {
    clearForm()
    await sleep(4000)

    onSuccess(response)
  }

  const clearForm = () => {
    setName('')
    setDescription('')
    setFile(null)
  }
  return (
    <Flex w="full" direction="column" align="center">
      <NftCard
        name={name}
        description={description}
        image={file}
        onChange={(e) => setFile((e as any).target.files[0])}
        isLoading={isMinterContractLoading}
      />
      <Flex direction="column">
        <Box my={4}>
          <Input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box my={4}>
          <TextArea
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Button
          onClick={onSubmit}
          type="submit"
          ml="auto"
          variant="lightBlue"
          w="120px"
          h="45px"
          isLoading={isMinterContractLoading}
          isDisabled={isMinterContractLoading}
        >
          Mint now!
        </Button>
      </Flex>
    </Flex>
  )
}
