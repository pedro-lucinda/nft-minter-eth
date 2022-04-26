import { AuthPage } from '@/components/layouts/auth-page'
import { MintView } from '@/views/mint-view'
import type { NextPage } from 'next'

const Mint: NextPage = () => {
  return (
    <AuthPage>
      <MintView />
    </AuthPage>
  )
}

export default Mint
