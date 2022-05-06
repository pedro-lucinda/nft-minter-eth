import { getEllipsisTxt } from '@/helpers/formatters'

import { Button, Heading } from '@chakra-ui/react'
import React from 'react'
import { useMoralis } from 'react-moralis'
import { MetamaskLogo } from './metamask-logo'

export const AuthButton = () => {
  const { authenticate, isAuthenticated, account } = useMoralis()

  return (
    <>
      {!isAuthenticated ? (
        <Button onClick={() => authenticate()}>
          <MetamaskLogo />
          Connect Wallet
        </Button>
      ) : (
        <Heading fontSize="lg">
          Connected: {getEllipsisTxt(account as string)}{' '}
        </Heading>
      )}
    </>
  )
}
