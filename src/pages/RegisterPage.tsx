import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import {
  registerFormInitialValues,
  registerFormSchema,
  sendRegisterForm,
} from '../store/registerSlice'

export default function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.register)

  return (
    <>
      <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg">
        <span className="mask bg-primary"></span>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 text-center mx-auto">
              <h1 className="text-white mb-2 mt-5">Welcome!</h1>
              <p className="text-lead text-white">
                Register to start your journey with us.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
          <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div className="card z-index-0">
              <div className="card-header text-center pt-4">
                <h5 className="mb-0">Register</h5>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={registerFormInitialValues}
                  validationSchema={registerFormSchema}
                  onSubmit={async () => {
                    await dispatch(sendRegisterForm())
                    navigate('/dashboard')
                  }}
                >
                  <Form role="form">
                    <div className="mb-3">
                      <Field
                        id="name"
                        name="name"
                        placeholder="Name"
                        className="form-control"
                      />
                      <ErrorMessage name="name" />
                    </div>
                    <div className="mb-3">
                      <Field
                        id="cv"
                        name="cv"
                        as="textarea"
                        placeholder="Please paste your CV here"
                        className="form-control h-25"
                      />
                      <ErrorMessage name="cv" />
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary w-100 my-2"
                      >
                        Register
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
