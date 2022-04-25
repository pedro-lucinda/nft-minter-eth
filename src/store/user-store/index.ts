import { MINTER_CONTRACT_ADDRESS } from '@/blockchain/contracts/minter'
import { toast } from '@/components/elements/toast'
import { sleep } from '@/helpers/sleep'
import { moralisRestAPI } from '@/services/moralis'
import create, { SetState } from 'zustand'
import { IUserStore, NFT, NFTResponse } from './types'

export const useUserStore = create<IUserStore>(
  (set: SetState<IUserStore>): IUserStore => ({
    // USER
    userAddress: null,
    updateUserAddress: (userAddress: string | null) =>
      set((state) => ({ ...state, userAddress })),

    // BALANCE
    balance: null,
    updateUserBalance: (balance: number) =>
      set((state) => ({ ...state, balance })),

    // NFTS
    userNfts: null,
    fetchUserNfts: async () => await fetchNFTS(set),
    isNftsLoading: false,
    toggleIsNftsLoading: () =>
      set((state) => ({ ...state, isNftsLoading: !state.isNftsLoading })),
  }),
)

async function fetchNFTS(set: SetState<IUserStore>): Promise<NFT[] | null> {
  const toggleIsNftsLoading = useUserStore.getState().toggleIsNftsLoading
  toggleIsNftsLoading()
  const userAddress = useUserStore.getState().userAddress

  try {
    if (!userAddress) throw new Error('Account is not defined')
    // FETCH
    const nfts = await moralisRestAPI.get<any, NFTResponse>(
      `/${userAddress}/nft/${MINTER_CONTRACT_ADDRESS}?chain=rinkeby&format=decimal`,
    )
    console.log('nfts', nfts)
    if (!nfts || nfts?.result?.length < 1) return null
    // FORMAT
    const formatted = formatNFTs(nfts.result)
    // UPDATE
    set((state) => ({ ...state, userNfts: formatted }))

    return formatted
  } catch (err) {
    console.error(err)
    toast({
      title: 'Error on fetching nfts',
      status: 'error',
      position: 'top',
      isClosable: true,
    })
    return null
  } finally {
    await sleep(1000)
    toggleIsNftsLoading()
  }
}

function formatNFTs(nfts: NFT[]) {
  return nfts.map((n) => ({
    ...n,
    metadata: JSON.parse(n.metadata as unknown as string),
  }))
}
