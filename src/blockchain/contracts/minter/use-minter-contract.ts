import { toast } from '@/components/elements/toast'
import { web3 } from '@/config/lib/web3'
import { formatContractError } from '@/helpers/blockchain-contract-error'
import { useIPFS } from '@/hooks/blockchain/useIPFS'
import { useMoralis } from 'react-moralis'
import { MINTER_CONTRACT_ABI, MINTER_CONTRACT_ADDRESS } from '.'

export function useMinterContract() {
  const { user } = useMoralis()
  const { saveIPFSAndGetURL, saveMetadataIPFSAndGetURL } = useIPFS()

  async function executeMintContract(
    name: string,
    description: string,
    file: File,
  ) {
    try {
      const fileURL = saveIPFSAndGetURL(file)
      const metadata = {
        name,
        description,
        image: fileURL,
      }
      const metadataURL = saveMetadataIPFSAndGetURL(metadata)
      const contract = new web3.eth.Contract(
        MINTER_CONTRACT_ABI,
        MINTER_CONTRACT_ADDRESS,
      )

      // RUN CONTRACT
      const response = await contract.methods
        .mint(metadataURL)
        .send({ from: user?.get('ethAddress') })

      const tokenId = response.events.Transfer.returnValues.tokenId

      toast({
        title: `NFT successfully minted. Contract address - ${MINTER_CONTRACT_ADDRESS} and Token ID - ${tokenId}`,
        status: 'success',
      })
    } catch (err: any) {
      console.log(err)
      toast({
        title: `Error on minting NFT: ${formatContractError(err)}`,
        status: 'error',
      })
    }
  }
  return {
    executeMintContract,
  }
}
