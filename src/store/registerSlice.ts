import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as yup from 'yup'

export const registerFormSchema = yup.object({
  name: yup.string().required(),
  cv: yup.string().required(),
})
export type RegisterForm = yup.InferType<typeof registerFormSchema>

export const registerFormInitialValues: RegisterForm = {
  name: '',
  cv: '',
}

interface RegisterState {
  form: RegisterForm
  isLoading: boolean
  error?: string
}

const initialState: RegisterState = {
  form: registerFormInitialValues,
  isLoading: false,
  error: undefined,
}

export const sendRegisterForm = createAsyncThunk('register/send', async () => {
  // fake api call
  return await new Promise((resolve) => setTimeout(resolve, 1000))
})

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    updateRegisterFormValues: (
      state,
      action: PayloadAction<Partial<RegisterForm>>
    ) => {
      state.form = { ...state.form, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendRegisterForm.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendRegisterForm.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(sendRegisterForm.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  },
})

export const { updateRegisterFormValues } = registerSlice.actions

export default registerSlice.reducer
