import { useState } from 'react'
import loginUserService from '../../services/Auth/loginUser'
import { useFormik } from 'formik'
import authSchema from '../../utils/yup/atuhSchema'
import { useNavigate, Link } from 'react-router-dom'

function Login () {
  const [initialValues] = useState({
    email: '',
    password: '',
    saveCredentials: true
  })
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const { email, password } = values
      onPressLogin(email, password)
    },
    validationSchema: authSchema
  })

  async function onPressLogin (email, password) {
    try {
      await loginUserService(email, password)
      localStorage.setItem('isAuthenticated', true)
      navigate('/index')
    } catch (error) {
      const errorMessage = error.message
      alert(`Error iniciando sesión: ${errorMessage}`)
    }
  }

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-15 w-auto"
          src="https://www.usco.edu.co/imagen-institucional/favicon.ico"
          alt="USCO"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Iniciar sesión
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Correo electrónico
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-sm text-red-700">{formik.errors.email}</p>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-sm text-red-700">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md text-primary bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-primary hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿No tienes una cuenta?{' '}
          <Link
            to='/register'
            className="font-semibold leading-6 text-primary hover:text-primary-light"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  </>
  )
}

export default Login
