import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import api from '../lib/api'
import { Product } from '../types'

interface ProductsState {
  data: Product[]
  isLoading: boolean
  error?: string
  edit: { isLoading: boolean; error?: string }
  delete: { isLoading: boolean; error?: string }
  details: { isLoading: boolean; error?: string; data?: Product }
  add: { isLoading: boolean; error?: string }
}

const initialState: ProductsState = {
  data: [],
  isLoading: false,
  error: undefined,
  edit: { isLoading: false, error: undefined },
  delete: { isLoading: false, error: undefined },
  details: { isLoading: false, error: undefined, data: undefined },
  add: { isLoading: false, error: undefined },
}

export const fetchProducts = createAsyncThunk<AxiosResponse<Product[]>>(
  'products/fetch',
  async () => await api.get('/products')
)

export const editProduct = createAsyncThunk<
  AxiosResponse<Product>,
  Partial<Product>
>(
  'products/edit',
  async (product) => await api.patch(`/products/${product.id}`, product)
)

export const deleteProduct = createAsyncThunk<void, Product['id']>(
  'products/delete',
  async (id) => await api.delete(`/products/${id}`)
)

export const addProduct = createAsyncThunk<
  AxiosResponse<Product>,
  Omit<Product, 'id' | 'rating'>
>('products/add', async (data) => await api.post('/products', data))

export const fetchProductDetails = createAsyncThunk<
  AxiosResponse<Product>,
  number
>('products/fetchDetails', async (id) => await api.get(`/products/${id}`))

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload.data
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })

      .addCase(editProduct.pending, (state) => {
        state.edit.isLoading = true
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.edit.isLoading = false
        state.data = state.data.map((product) =>
          product.id === action.payload.data.id ? action.payload.data : product
        )
      })
      .addCase(editProduct.rejected, (state) => {
        state.edit.isLoading = false
      })

      .addCase(deleteProduct.pending, (state) => {
        state.delete.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.delete.isLoading = false
        state.data = state.data.filter(
          (product) => product.id !== action.meta.arg
        )
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.delete.isLoading = false
      })

      .addCase(addProduct.pending, (state) => {
        state.add.isLoading = true
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.add.isLoading = false
        state.data.unshift(action.payload.data)
      })
      .addCase(addProduct.rejected, (state) => {
        state.add.isLoading = false
      })

      .addCase(fetchProductDetails.pending, (state) => {
        state.details.isLoading = true
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.details.isLoading = false
        state.details.data = action.payload.data
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.details.isLoading = false
      })
  },
})

export default productsSlice.reducer
