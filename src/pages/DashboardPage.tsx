import { createColumnHelper } from '@tanstack/react-table'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Table from '../components/Table'
import DashboardLayout from '../layouts/DashboardLayout'
import { useAppDispatch, useAppSelector } from '../store'
import {
  deleteProduct,
  editProduct,
  fetchProducts,
} from '../store/productsSlice'
import { Product } from '../types'

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const {
    data,
    isLoading,
    edit: { isLoading: isLoadingEdit },
    delete: { isLoading: isLoadingDelete },
  } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const [productInEdit, setProductInEdit] = useState<Product | null>(null)
  const editedProductRef = useRef<Partial<Product> | null>(null)
  const [productInDelete, setProductInDelete] = useState<Product | null>(null)

  const columnHelper = createColumnHelper<Product>()
  const columns = [
    columnHelper.accessor('title', {
      header: 'Name',
      cell: (props) => {
        if (productInEdit?.id === props.row.original.id) {
          return (
            <input
              className="form-control"
              placeholder="Product Name"
              key={props.row.original.id}
              type="text"
              defaultValue={props.getValue()}
              onChange={(e) => {
                editedProductRef.current = {
                  ...editedProductRef.current,
                  title: e.target.value,
                }
              }}
            />
          )
        }
        return (
          <Link to={`/dashboard/products/${props.row.original.id}`}>
            {props.getValue()}
          </Link>
        )
      },
    }),
    columnHelper.accessor('price', {
      header: 'Price',
      cell: (props) => {
        if (productInEdit?.id === props.row.original.id) {
          return (
            <input
              className="form-control"
              placeholder="Product price"
              type="number"
              defaultValue={props.getValue()}
              onChange={(e) => {
                editedProductRef.current = {
                  ...editedProductRef.current,
                  price: +e.target.value,
                }
              }}
            />
          )
        }
        return (
          <>
            <span className="text-xs font-weight-bold">$</span>
            {props.getValue()}
          </>
        )
      },
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (props) => {
        if (productInEdit?.id === props.row.original.id) {
          return (
            <textarea
              className="form-control"
              placeholder="Product description"
              defaultValue={props.getValue()}
              onChange={(e) => {
                editedProductRef.current = {
                  ...editedProductRef.current,
                  description: e.target.value,
                }
              }}
            />
          )
        }

        return props.getValue()
      },
    }),
    columnHelper.accessor('id', {
      header: () => <div className="text-end">Actions</div>,
      cell: (props) => (
        <div>
          {productInEdit?.id === props.row.original.id ? (
            <div className="d-flex flex-md-row flex-column gap-2 justify-content-end">
              <button
                className="btn btn-outline-secondary btn-xs m-0"
                disabled={isLoadingEdit}
                onClick={async () => {
                  if (editedProductRef.current) {
                    await dispatch(
                      editProduct({
                        ...productInEdit,
                        ...(editedProductRef.current || {}),
                      })
                    )
                    setProductInEdit(null)
                    editedProductRef.current = null
                  }
                }}
              >
                Save
              </button>
              <button
                className="btn btn-outline-danger btn-xs m-0"
                disabled={isLoadingEdit}
                onClick={() => {
                  setProductInEdit(null)
                  editedProductRef.current = {}
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="d-flex flex-md-row flex-column gap-2 justify-content-end">
              <button
                className="btn btn-outline-secondary btn-xs m-0"
                onClick={() => {
                  setProductInEdit(props.row.original)
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-danger btn-xs m-0"
                disabled={
                  productInDelete?.id === props.row.original.id &&
                  isLoadingDelete
                }
                onClick={async () => {
                  setProductInDelete(props.row.original)
                  await dispatch(deleteProduct(props.getValue()))
                  setProductInDelete(null)
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    }),
  ]

  return (
    <DashboardLayout
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard' },
      ]}
    >
      Dashboard Page
      {!isLoading && data && (
        <Card title="Products">
          <Table data={data} columns={columns} />
        </Card>
      )}
    </DashboardLayout>
  )
}
