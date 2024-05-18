import registerUserService from '../../services/Auth/registerUser'
import { useFormik } from 'formik'
import authSchema from '../../utils/yup/atuhSchema'

function Login () {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: values => {
      const { email, password } = values
      onPressRegister(email, password)
    },
    validationSchema: authSchema
  })

  async function onPressRegister (email, password) {
    try {
      const user = await registerUserService(email, password)
      console.log(user)
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorMessage)
      console.log(errorCode)
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
       <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}
       <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
       {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}
      <button type="submit">Submit</button>
    </form>
  )
}

export default Login
