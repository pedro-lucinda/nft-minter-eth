import { LoginView } from '@/views/login-view'
import type { NextPage } from 'next'
import { PublicPage } from '../components/layouts/public-page'

const Login: NextPage = () => {
  return (
    <PublicPage>
      <LoginView />
    </PublicPage>
  )
}

export default Login
