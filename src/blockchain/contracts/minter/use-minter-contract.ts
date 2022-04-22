import { toast } from '@/components/elements/toast'
import { web3 } from '@/config/lib/web3'
import { formatContractError } from '@/helpers/blockchain-contract-error'

import { useIPFS } from '@/hooks/blockchain/useIPFS'
import React from 'react'
import { useMoralis } from 'react-moralis'
import { MINTER_CONTRACT_ABI, MINTER_CONTRACT_ADDRESS } from '.'

const minterContract = new web3.eth.Contract(
  MINTER_CONTRACT_ABI,
  MINTER_CONTRACT_ADDRESS,
)

export function useMinterContract() {
  const [isMinterContractLoading, setIsMinterContractLoading] =
    React.useState(false)
  const { user } = useMoralis()
  const { saveIPFSImageAndGetURL, saveMetadataIPFSAndGetURL } = useIPFS()

  async function executeMintContract(
    name: string,
    description: string,
    file: File,
    fn: (response: any) => Promise<any>,
  ) {
    try {
      setIsMinterContractLoading(true)

      // GET IMAGE URL
      const fileURL = await saveIPFSImageAndGetURL(file)
      const metadata = {
        name,
        description,
        image: fileURL as string,
      }
      const metadataURL = await saveMetadataIPFSAndGetURL(metadata)

      // RUN CONTRACT
      const response = await minterContract.methods
        .mint(metadataURL)
        .send({ from: user?.get('ethAddress') })
      // Execute function
      await fn(response)
    } catch (err: any) {
      console.log(err)
      toast({
        title: `Error on minting NFT: ${formatContractError(err)}`,
        status: 'error',
        position: 'top',
        isClosable: true,
      })
    } finally {
      setIsMinterContractLoading(false)
    }
  }
  return {
    executeMintContract,
    isMinterContractLoading,
  }
}
