import React, { useEffect } from 'react'
import { Flex, Heading, HStack, Wrap } from '@chakra-ui/react'
import { useMoralis, useNativeBalance } from 'react-moralis'
import { getEllipsisTxt, tokenValueTxt } from '@/helpers/formatters'
import { routes, IMenuRoute } from '@/constants/menu'
import { MenuItem } from '../elements/menu-item'
import { SignoutButton } from '../elements/signout-button'

export const Nav = () => {
  const { isAuthenticated, account, user } = useMoralis()

  const { getBalances, data: balance } = useNativeBalance({ chain: 'rinkeby' })

  useEffect(() => {
    if (account) getBalances()
  }, [account, getBalances])

  return (
    <Flex
      w="full"
      display="flex"
      align="center"
      justify="space-between"
      maxW="1440px"
      m="0 auto 10px auto"
      pb={4}
    >
      <Heading size="sm" mr="auto">
        NFT Minter
      </Heading>
      {isAuthenticated && account && user && (
        <>
          <Wrap ml="auto">
            {routes?.map((r: IMenuRoute) => (
              <MenuItem route={r} key={r.path} />
            ))}
          </Wrap>

          <HStack spacing={4} ml="auto" bg="brand.glass" p="8px 20px">
            <Heading fontSize="sm">
              Connected: {getEllipsisTxt(user?.id as string, 4)}
            </Heading>
            {balance?.balance && (
              <Heading size="sm">
                Balance: {tokenValueTxt(+balance.balance, 18, 'ETH')}{' '}
              </Heading>
            )}
            <SignoutButton />
          </HStack>
        </>
      )}
    </Flex>
  )
}
