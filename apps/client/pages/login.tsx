import Login from '@components/auth/login'
import Seo from '@components/seo'

const LoginPage = () => {
  return (
    <>
      <Seo title="Login to Tickets22" />
      <Login />
    </>
  )
}

export default LoginPage