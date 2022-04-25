import { IMenuRoute } from '@/constants/menu'
import { Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

export const MenuItem = ({ route }: { route: IMenuRoute }) => {
  const router = useRouter()
  return (
    <Text
      fontSize="md"
      fontWeight={router.pathname === route.path ? 'bold' : 'normal'}
      onClick={() => router.push(route.path)}
      key={route.path}
      cursor="pointer"
      _hover={{ transform: 'scale(0.97)', transition: '0.1s' }}
    >
      {route.name}
    </Text>
  )
}
