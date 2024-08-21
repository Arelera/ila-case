import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../store'
import { addProduct } from '../../store/productsSlice'

interface Props {
  hide: () => void
}

export default function AddProductForm({ hide }: Props) {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.products.add)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await dispatch(addProduct(values))
        hide()
      }}
    >
      <Form role="form">
        <div className="mb-3">
          <Field
            id="title"
            name="title"
            placeholder="Title"
            className="form-control"
          />
          <ErrorMessage name="title" />
        </div>
        <div className="d-flex gap-3">
          <div className="mb-3 flex-grow-1">
            <Field
              id="category"
              name="category"
              placeholder="category"
              className="form-control"
            />
            <ErrorMessage name="category" />
          </div>
          <div className="mb-3 flex-grow-1">
            <Field
              id="price"
              name="price"
              placeholder="Price"
              type="number"
              className="form-control"
            />
            <ErrorMessage name="price" />
          </div>
        </div>
        <div className="mb-3">
          <Field
            id="description"
            name="description"
            as="textarea"
            placeholder="Description"
            className="form-control h-25"
          />
          <ErrorMessage name="description" />
        </div>
        <div className="mb-3">
          <Field
            id="image"
            name="image"
            placeholder="Image URL"
            className="form-control"
          />
          <ErrorMessage name="image" />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-100 my-2"
          >
            Add Product
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-outline-danger w-100 my-2"
            onClick={hide}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  )
}

const initialValues = {
  title: '',
  category: '',
  price: '',
  description: '',
  image: '',
}

const validationSchema = Yup.object({
  title: Yup.string().required(),
  category: Yup.string().required(),
  price: Yup.number().required(),
  description: Yup.string().required(),
  image: Yup.string().required(),
})
