import { Metadata } from '@/hooks/blockchain/useIPFS'

export interface IUserStore {
  // USER
  userAddress: string | null
  updateUserAddress: (userAddress: string | null) => void
  // BALANCE
  balance: number | null
  updateUserBalance: (balance: number) => void

  // NFTS
  userNfts: NFT[] | null
  fetchUserNfts: () => Promise<NFT[] | null>
  isNftsLoading: boolean
  toggleIsNftsLoading: () => void
}

export interface NFTResponse {
  status: string
  total: number
  page: number
  result: NFT[]
}
export interface NFT {
  amount: string
  block_number: string
  block_number_minted: string
  contract_type: string
  metadata: Metadata | null
  name: string
  owner_of: string
  symbol: string
  synced_at: string
  token_address: string
  token_hash: string
  token_id: string
  token_uri: string | null
}
