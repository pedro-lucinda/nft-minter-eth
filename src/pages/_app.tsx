import type { AppProps } from 'next/app'
import { AppLayout } from '../components/layouts/app-layout'
import { Chakra } from '@/providers/chakra-provider'
import { Web3ReactProvider } from '@web3-react/core'
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers'

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  return new Web3Provider(provider)
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Web3ReactProvider>
    </Chakra>
  )
}

export default MyApp
export { getServerSideProps } from '@/providers/chakra-provider'
