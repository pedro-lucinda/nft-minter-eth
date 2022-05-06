import { toast } from '@/components/elements/toast'
import { formatContractError } from '@/helpers/blockchain-contract-error'

import { useIPFS } from '@/hooks/blockchain/useIPFS'
import React from 'react'
import {  useWeb3ExecuteFunction } from 'react-moralis'
import { MINTER_CONTRACT_ABI, MINTER_CONTRACT_ADDRESS } from '.'



export function useMinterContract() {
  const [isMinterContractLoading, setIsMinterContractLoading] =
    React.useState(false)
  const { saveIPFSImageAndGetURL, saveMetadataIPFSAndGetURL } = useIPFS()
  const contractProcessor = useWeb3ExecuteFunction()

  async function executeMintContract(
    name: string,
    description: string,
    file: File,
    fn: (response: any) => Promise<any>,
  ) {
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
    await contractProcessor.fetch({
      params: {
        abi: MINTER_CONTRACT_ABI,
        contractAddress: MINTER_CONTRACT_ADDRESS,
        functionName: 'mint',
        params: {
          _uri: metadataURL,
        },
      },
      onSuccess: async (res: any) => {
        await res.wait()
        await fn(res)
        setIsMinterContractLoading(false)
      },
      onError: (err) => {
        console.log(err.cause)
        toast({
          title: `Error on minting NFT: ${formatContractError(err)}`,
          status: 'error',
          position: 'top',
          isClosable: true,
        })
        setIsMinterContractLoading(false)
      },
    })
  }
  return {
    executeMintContract,
    isMinterContractLoading,
  }
}
