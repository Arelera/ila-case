import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import MainLayout from '../layouts/MainLayout'

export default function RegisterPage() {
  const navigate = useNavigate()

  return (
    <MainLayout>
      Register Page
      <div>
        <Formik
          initialValues={{ name: '', cv: '', resume: '' }}
          validationSchema={schema}
          onSubmit={() => {
            navigate('/dashboard')
          }}
        >
          <Form>
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
            <button type="submit">Register</button>
          </Form>
        </Formik>
      </div>
    </MainLayout>
  )
}

const schema = yup.object({
  name: yup.string().required(),
  cv: yup.string().required(),
})
