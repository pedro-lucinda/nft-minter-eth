import type { AppProps } from 'next/app'
import { AppLayout } from '../components/layouts/app-layout'
import { Chakra } from '@/providers/chakra-provider'
import { MoralisProvider } from 'react-moralis'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID as string}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL as string}
      >
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </MoralisProvider>
    </Chakra>
  )
}

export default MyApp
export { getServerSideProps } from '@/providers/chakra-provider'
