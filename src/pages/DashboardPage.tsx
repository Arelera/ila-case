import { createColumnHelper } from '@tanstack/react-table'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '../components/Table'
import MainLayout from '../layouts/MainLayout'
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
        return `$${props.getValue()}`
      },
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (props) => {
        if (productInEdit?.id === props.row.original.id) {
          return (
            <textarea
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
      header: 'Actions',
      cell: (props) => (
        <div>
          {productInEdit?.id === props.row.original.id ? (
            <>
              <button
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
                disabled={isLoadingEdit}
                onClick={() => {
                  setProductInEdit(null)
                  editedProductRef.current = {}
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setProductInEdit(props.row.original)
                }}
              >
                Edit
              </button>
              <button
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
            </>
          )}
        </div>
      ),
    }),
  ]

  return (
    <MainLayout>
      Dashboard Page
      {!isLoading && data && <Table data={data} columns={columns} />}
    </MainLayout>
  )
}
