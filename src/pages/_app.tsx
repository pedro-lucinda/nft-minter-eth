import type { AppProps } from 'next/app'
import { AppLayout } from '../components/layouts/app-layout'
import { MoralisProvider } from 'react-moralis'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID as string}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL as string}
      >
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </MoralisProvider>
    </ChakraProvider>
  )
}

export default MyApp
