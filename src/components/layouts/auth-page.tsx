import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useMoralis } from 'react-moralis'

export const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { user } = useMoralis()
  const router = useRouter()

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
