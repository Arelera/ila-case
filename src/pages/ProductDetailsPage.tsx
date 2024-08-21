import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from '../components/Card'
import DashboardLayout from '../layouts/DashboardLayout'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchProductDetails } from '../store/productsSlice'

export default function ProductDetailsPage() {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()

  const { data: product, isLoading } = useAppSelector(
    (state) => state.products.details
  )

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(+id))
  }, [])

  return (
    <DashboardLayout
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard' },
        {
          label: `Product: ${product?.title}`,
          href: `/products/${product?.id}`,
        },
      ]}
    >
      {!isLoading && product && (
        <div className="row">
          <div className="col-md-7">
            <Card>
              <Link
                to="/dashboard"
                className="btn btn-link text-secondary position-absolute top-1 start-0"
              >
                Go back
              </Link>
              <div className="d-flex justify-content-center my-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid"
                  style={{ maxHeight: '500px' }}
                />
              </div>
            </Card>
          </div>
          <div className="col-md-5 mt-4 mt-md-0">
            <Card>
              <p className="text-xxs text-uppercase fw-bold opacity-8 mb-2">
                {product.category}
              </p>
              <h2 className="fs-4">{product.title}</h2>
              <div className="text-sm mb-3">
                <span className="fw-bold">{product.rating.rate} stars</span> (
                {product.rating.count} reviews)
              </div>
              <p className="">{product.description}</p>
              <div className="fs-3 fw-bold text-primary">
                <span className="fs-4">$</span>
                {product.price}
              </div>
            </Card>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
