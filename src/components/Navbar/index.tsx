import { useAuth0 } from '@auth0/auth0-react'
import Breadcrumb, { BreadcrumbProps } from '../Breadcrumb'
import { Link } from 'react-router-dom'

interface Props {
  crumbs?: BreadcrumbProps['items']
}

export default function Navbar({ crumbs }: Props) {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  return (
    <nav className="navbar navbar-main px-0 mx-4 shadow-none">
      <div className="container-fluid py-1 px-3">
        {crumbs && <Breadcrumb items={crumbs} />}
        <div className="d-flex align-items-center ms-auto">
          <Link className="nav-link text-white" to="/dashboard">
            Dashboard
          </Link>
          {isAuthenticated ? (
            <button
              className="btn btn-link text-white mb-0"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Log Out
            </button>
          ) : (
            <button
              className="btn btn-link text-white mb-0"
              onClick={() => loginWithRedirect()}
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
