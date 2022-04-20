import { useMinterContract } from '@/blockchain/contracts/minter/use-minter-contract'
import { toast } from '@/components/elements/toast'
import { Button, Flex, Input } from '@chakra-ui/react'
import React from 'react'
import { useMoralis } from 'react-moralis'

export const HomeView = () => {
  const { user } = useMoralis()
  const { executeMintContract } = useMinterContract()
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [file, setFile] = React.useState(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      return toast({ title: 'Please upload an image', status: 'error' })
    }
    await executeMintContract(name, description, file)
  }

  return (
    <Flex w="full" direction="column" align="center">
      <form onSubmit={onSubmit}>
        <Flex>
          <Input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Flex>
        <Flex>
          <Input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Flex>
        <Flex>
          <Input
            type="file"
            onChange={(e) => setFile((e as any).target.files[0])}
          />
        </Flex>
        <Button type="submit">Mint now!</Button>
      </form>
    </Flex>
  )
}
