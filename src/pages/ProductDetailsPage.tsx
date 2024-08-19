import { useNavigate, useParams } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import MainLayout from '../layouts/MainLayout'
import { Product } from '../types'

export default function ProductDetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { isLoading, data } = useAxios<Product>({ url: `/products/${id}` })

  return (
    <MainLayout>
      Product Details Page
      <button onClick={() => navigate(-1)}>Back to Dashboard</button>
      <div>Product ID: {id}</div>
      {!isLoading && data && <div>{data.title}</div>}
    </MainLayout>
  )
}
