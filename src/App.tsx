import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import ProductDetailsPage from './pages/ProductDetailsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    element: <ProtectedRoute />,
    path: '/',
    children: [
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/dashboard/products/:id',
        element: <ProductDetailsPage />,
      },
    ],
  },
])
