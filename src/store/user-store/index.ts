import { MINTER_CONTRACT_ADDRESS } from '@/blockchain/contracts/minter'
import { toast } from '@/components/elements/toast'
import { sleep } from '@/helpers/sleep'
import { moralisRestAPI } from '@/services/moralis'
import create, { SetState } from 'zustand'
import { IUserStore, NFT, NFTResponse } from './types'

export const useUserStore = create<IUserStore>(
  (set: SetState<IUserStore>): IUserStore => ({
    // NFTS
    userNfts: null,
    fetchUserNfts: async (account: string) => await fetchNFTS(set, account),
    isNftsLoading: false,
    toggleIsNftsLoading: () =>
      set((state) => ({ ...state, isNftsLoading: !state.isNftsLoading })),
  }),
)

async function fetchNFTS(
  set: SetState<IUserStore>,
  account: string,
): Promise<NFT[] | null> {
  const toggleIsNftsLoading = useUserStore.getState().toggleIsNftsLoading
  toggleIsNftsLoading()
  try {
    if (!account) throw new Error('Account is not defined')
    // FETCH
    const nfts = await moralisRestAPI.get<any, NFTResponse>(
      `/${account}/nft/${MINTER_CONTRACT_ADDRESS}?chain=rinkeby&format=decimal&limit=500`,
    )
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
