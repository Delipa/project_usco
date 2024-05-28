import * as Yup from 'yup'

const minCharactersPassword = 6

const authSchema = Yup.object().shape({
  email: Yup.string().email('Correo electrónico inválido').required('Correo electrónico requerido'),
  password: Yup.string().required('Contraseña requerida').min(minCharactersPassword, `Mínimo: ${minCharactersPassword} caracteres.`)
})

export default authSchema
