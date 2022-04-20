import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useMoralis } from 'react-moralis'

export const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { user, account } = useMoralis()
  const router = useRouter()
  console.log('account', account)
  React.useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  return (
    <Flex w="full" h="full">
      {children}
    </Flex>
  )
}
