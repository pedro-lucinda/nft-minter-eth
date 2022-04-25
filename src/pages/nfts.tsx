import { AuthPage } from '@/components/layouts/auth-page'
import { NFTsView } from '@/views/nfts-view'
import type { NextPage } from 'next'

const NFTs: NextPage = () => {
  return (
    <AuthPage>
      <NFTsView />
    </AuthPage>
  )
}

export default NFTs
