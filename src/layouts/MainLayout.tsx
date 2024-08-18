import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from '../components/LoginButton'
import LogoutButton from '../components/LogoutButton'
import { Link } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const { isAuthenticated } = useAuth0()

  return (
    <>
      <header>
        {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
        <nav>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</nav>
      </header>
      <main>{children}</main>
    </>
  )
}
