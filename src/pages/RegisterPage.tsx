import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { useAppDispatch, useAppSelector } from '../store'
import {
  registerFormInitialValues,
  registerFormSchema,
  sendRegisterForm,
  updateRegisterFormValues,
} from '../store/registerSlice'

export default function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.register)

  return (
    <MainLayout>
      Register Page
      <div>
        <Formik
          initialValues={registerFormInitialValues}
          validationSchema={registerFormSchema}
          onSubmit={async () => {
            await dispatch(sendRegisterForm())
            navigate('/dashboard')
          }}
        >
          <Form
            onChange={(e: React.ChangeEvent<HTMLFormElement>) => {
              dispatch(
                updateRegisterFormValues({
                  [e.target.name]: e.target.value as string,
                })
              )
            }}
          >
            <div>
              <label htmlFor="firstName">Name</label>
              <Field id="name" name="name" />
              <ErrorMessage name="name" />
            </div>
            <div>
              <label htmlFor="cv">CV</label>
              <Field id="cv" name="cv" as="textarea" />
              <ErrorMessage name="cv" />
            </div>
            <button disabled={isLoading} type="submit">
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </MainLayout>
  )
}
