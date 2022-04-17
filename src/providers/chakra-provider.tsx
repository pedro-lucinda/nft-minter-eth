import { ChakraProvider } from '@chakra-ui/react'

import {
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/color-mode'
import { ReactNode } from 'react'

export function Chakra({
  cookies,
  children,
}: {
  cookies: any
  children: ReactNode
}) {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManager(cookies)
      : localStorageManager

  return (
    <ChakraProvider colorModeManager={colorModeManager} resetCSS>
      {children}
    </ChakraProvider>
  )
}
export function getServerSideProps({ req }: any) {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  }
}
