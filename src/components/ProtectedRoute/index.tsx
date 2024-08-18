import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useAuth0()

  if (isLoading) return
  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
