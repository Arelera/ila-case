import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchProductDetails } from '../store/productsSlice'

export default function ProductDetailsPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useAppSelector((state) => state.products.details)

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(+id))
  }, [])

  return (
    <MainLayout>
      Product Details Page
      <button onClick={() => navigate(-1)}>Back to Dashboard</button>
      <div>Product ID: {id}</div>
      {!isLoading && data && <div>{data.title}</div>}
    </MainLayout>
  )
}
