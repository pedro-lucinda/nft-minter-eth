import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useMoralis } from 'react-moralis'

export const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, account } = useMoralis()
  const router = useRouter()

  React.useEffect(() => {
    if (!isAuthenticated || !account) {
      router.push('/')
    }
  }, [isAuthenticated, account, router])

  return (
    <Flex w="full" h="full">
      {children}
    </Flex>
  )
}
