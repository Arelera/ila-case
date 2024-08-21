import { useAuth0 } from '@auth0/auth0-react'
import { Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()

  if (isLoading) return
  if (!isAuthenticated) {
    loginWithRedirect()
    return
  }

  return <Outlet />
}
