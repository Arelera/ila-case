import { createColumnHelper } from '@tanstack/react-table'
import Table from '../components/Table'
import useAxios from '../hooks/useAxios'
import MainLayout from '../layouts/MainLayout'
import { Product } from '../types'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import { useEffect, useRef, useState } from 'react'

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const { data, isLoading } = useAxios<Product[]>({
    url: '/products',
  })

  useEffect(() => {
    if (data) setProducts(data)
  }, [data])

  const [productInEdit, setProductInEdit] = useState<Product | null>(null)
  const editedProductRef = useRef<Partial<Product> | null>(null)

  const editProduct = async (id: number, editedProduct: Partial<Product>) => {
    if (!editedProduct) return
    const res = await api.patch(`/products/${id}`, editedProduct)
    if (res.status !== 200) {
      alert('Failed to edit product')
    } else {
      const newProd = res.data as Product
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...newProd } : product
        )
      )
      setProductInEdit(null)
      editedProductRef.current = null
    }
  }

  const deleteProduct = async (id: number) => {
    const res = await api.delete(`/products/${id}`)
    if (res.status !== 200) {
      alert('Failed to delete product')
    } else {
      setProducts((prev) => prev.filter((product) => product.id !== id))
    }
  }

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
                onClick={() => {
                  setProductInEdit(null)
                  if (editedProductRef.current)
                    editProduct(productInEdit.id, editedProductRef.current)
                }}
              >
                Save
              </button>
              <button
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
              <button onClick={() => deleteProduct(props.getValue())}>
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
      {!isLoading && products && <Table data={products} columns={columns} />}
    </MainLayout>
  )
}
