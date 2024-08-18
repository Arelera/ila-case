import { createColumnHelper } from '@tanstack/react-table'
import Table from '../components/Table'
import useAxios from '../hooks/useAxios'
import MainLayout from '../layouts/MainLayout'
import { Product } from '../types'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const { data, isLoading } = useAxios<Product[]>({
    url: '/products',
  })

  return (
    <MainLayout>
      Dashboard Page
      {!isLoading && data && <Table data={data} columns={columns} />}
    </MainLayout>
  )
}

const columnHelper = createColumnHelper<Product>()
const columns = [
  columnHelper.accessor('title', {
    header: 'Title',
    cell: (props) => (
      <Link to={`/dashboard/products/${props.row.original.id}`}>
        {props.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('price', {
    header: 'Price',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
  columnHelper.accessor('category', {
    header: 'Category',
  }),
  columnHelper.accessor('image', {
    header: 'Image',
  }),
  columnHelper.accessor('rating.rate', {
    header: 'Rating',
  }),
]
