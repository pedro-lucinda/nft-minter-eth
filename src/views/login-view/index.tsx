import { MetamaskLogo } from '@/components/elements/metamask-logo'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useMoralis } from 'react-moralis'

export const LoginView = () => {
  const { authenticate, user } = useMoralis()
  const router = useRouter()
  React.useEffect(() => {
    if (user) router.push('/home')
  }, [user, router])
  return (
    <div>
      <Button onClick={() => authenticate()}>
        <MetamaskLogo />
        Connect Wallet
      </Button>
    </div>
  )
}
