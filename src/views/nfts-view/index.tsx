import { MINTER_CONTRACT_ADDRESS } from '@/blockchain/contracts/minter'
import { toast } from '@/components/elements/toast'
import { NftCard } from '@/components/modules/nft-card'
import { NFT } from '@/types/NFT'

import { Flex, Heading, Spinner, Wrap } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useMoralis, useMoralisWeb3Api, useNFTBalances } from 'react-moralis'

interface INftResponse {
  cursor: string
  page: number
  page_size: number
  status: string
  total: number
  result: NFT[] | undefined
}
export const NFTsView = () => {
  const { account } = useMoralis()
  const [nfts, setNfts] = React.useState<any | null>(null)
  const [page, setPage] = React.useState(1)
  const [hasNextPage, setHasNextPage] = React.useState(false)
  const [hasPrevious, setHasPreviousPage] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const limit = 12

  const Web3Api = useMoralisWeb3Api()

  const fetchNfts = React.useCallback(
    async (pageNumber: number) => {
      try {
        setIsLoading(true)
        // FETCH NFTS
        const contractNftsData = (await Web3Api.account.getNFTs({
          chain: 'rinkeby',
          address: account as string,
          token_addresses: [MINTER_CONTRACT_ADDRESS],
          limit: limit,
          offset: pageNumber * limit,
        })) as INftResponse

        // PAGINATION
        handlePagination(contractNftsData, pageNumber)

        // UPDATE
        setNfts(formatNFTs(contractNftsData.result))
      } catch (error) {
        console.log(error)
        toast({
          title: 'Failed to fetch NFTs',
          position: 'top',
        })
      } finally {
        setIsLoading(false)
      }
    },
    [Web3Api.account, account],
  )

  function formatNFTs(nfts: NFT[] | undefined) {
    if (!nfts) return nfts
    return nfts.map((n) => ({
      ...n,
      metadata: JSON.parse(n.metadata as unknown as string),
    }))
  }

  useEffect(() => {
    if (!nfts) fetchNfts(page)
  }, [fetchNfts, nfts, page])

  async function fetchNextPage() {
    try {
      setIsLoading(true)
      await fetchNfts(page + 1)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setPage(page + 1)
    }
  }

  async function fetchPreviousPage() {
    try {
      setIsLoading(true)
      await fetchNfts(page - 1)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setPage(page - 1)
    }
  }

  function handlePagination(contractData: INftResponse, pageNumber: number) {
    if (contractData?.total > limit * pageNumber) {
      setHasNextPage(true)
    }
    if (
      contractData?.total < limit * pageNumber ||
      (contractData.result?.length as number) < limit
    ) {
      setHasNextPage(false)
    }
    if (pageNumber - 1 >= 1) {
      setHasPreviousPage(true)
    }
    if (pageNumber === 1) {
      setHasPreviousPage(false)
    }
  }

  return (
    <Flex direction="column" align="center" maxW="1440px" m="0 auto">
      <Heading my={10}>Your NFTs</Heading>
      <Wrap w="full" justify="center" spacing={4} p={2}>
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          nfts && nfts?.map((n: NFT) => <NftCard key={n?.token_id} nft={n} />)
        )}
      </Wrap>
      {hasNextPage && <button onClick={fetchNextPage}>next page</button>}
      {hasPrevious && (
        <button onClick={fetchPreviousPage}>previous page</button>
      )}
    </Flex>
  )
}
