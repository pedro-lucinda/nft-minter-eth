import { injected } from '@/blockchain/connector'
import { IS_CLIENT_SIDE } from '@/config'
import { getEllipsisTxt } from '@/helpers/formatters'
import useMetaMaskOnboarding from '@/hooks/blockchain/useMetamaskOnboarding'
import { Button, Heading } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { MetamaskLogo } from './metamask-logo'
import { toast } from './toast'

export const AuthButton = () => {
  const { activate, active, account, deactivate } = useWeb3React()

  const { startOnboarding, isMetaMaskInstalled } = useMetaMaskOnboarding()

  React.useEffect(() => {
    const { ethereum } = window as any
    if (IS_CLIENT_SIDE && ethereum?.selectedAddress) {
      connect()
    } else {
      deactivate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const connect = React.useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await activate(injected)
      } catch (e) {
        console.log(e)
        toast({
          title: 'Error connecting to Metamask',
        })
      }
    }
  }, [activate])

  return (
    <>
      {isMetaMaskInstalled ? (
        <>
          {!active ? (
            <Button onClick={connect}>
              <MetamaskLogo />
              Connect Wallet
            </Button>
          ) : (
            <Heading fontSize="lg">
              Connected: {getEllipsisTxt(account as string)}{' '}
            </Heading>
          )}
        </>
      ) : (
        <Button onClick={startOnboarding}>
          <MetamaskLogo />
          Install Metamask
        </Button>
      )}
    </>
  )
}
