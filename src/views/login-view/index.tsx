import { MetamaskLogo } from '@/components/elements/metamask-logo'
import { useUserStore } from '@/store/user-store'
import { Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { useMoralis } from 'react-moralis'

export const LoginView = () => {
  const { authenticate, account, isAuthenticated } = useMoralis()
  const { updateUserAddress } = useUserStore()
  const router = useRouter()

  React.useEffect(() => {
    if (isAuthenticated && account) {
      handleLogin()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, account])

  const handleLogin = useCallback(() => {
    updateUserAddress(account)
    router.push('/home')
  }, [account, router, updateUserAddress])
  return (
    <Flex
      align={['center', 'center', 'start']}
      justify={['center', 'center', 'space-between']}
      w="full"
      p={2}
      m="0 auto"
    >
      <Flex
        direction="column"
        mt={['50px', '60px', '150px', '200px']}
        align={['center', 'center', 'start']}
      >
        <Heading fontSize={['32px', '42px', '48px', '64px']}>
          Create your own <br />{' '}
          <Text as="span" color="brand.pink">
            NFTS
          </Text>{' '}
          in few steps
        </Heading>
        <Text
          maxW={['300px', '400px', '500px', '100%']}
          align={['center', 'center', 'start']}
        >
          To create is simple choose a name, description and upload the image
          file
        </Text>
        <Button
          mt="50px"
          onClick={() =>
            authenticate({ signingMessage: 'Log in using Moralis' })
          }
          variant="lightBlue"
          size="lg"
          h="56px"
          w="250px"
        >
          <MetamaskLogo />
          Connect Wallet
        </Button>
      </Flex>
      <Image
        src="/art.png"
        display={['none', 'none', 'none', 'flex']}
        alt="Art image"
        w="50%"
        mr="-170px"
      />
    </Flex>
  )
}
