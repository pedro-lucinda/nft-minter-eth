import { NftCard } from '@/components/modules/nft-card'
import { useUserStore } from '@/store/user-store'
import { Flex, Heading, Spinner, Wrap } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useMoralis } from 'react-moralis'

export const NFTsView = () => {
  const { fetchUserNfts, userNfts, isNftsLoading } = useUserStore()

  const { account } = useMoralis()

  console.log({ account })

  useEffect(() => {
    if (!!account) fetchUserNfts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fetchUserNfts])

  return (
    <Flex direction="column" align="center" maxW="1440px" m="0 auto">
      <Heading my={10}>Your NFTs</Heading>
      <Wrap w="full" justify="center" spacing={4} p={2}>
        {isNftsLoading ? (
          <Spinner size="xl" />
        ) : (
          userNfts &&
          userNfts
            .filter((n) => n?.token_uri && n?.metadata)
            .map((n) => <NftCard key={n?.token_id} nft={n} />)
        )}
      </Wrap>
    </Flex>
  )
}
