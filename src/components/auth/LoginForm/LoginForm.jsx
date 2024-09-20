import { environment, routes } from "../../../utils/constants"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import storeSession from "../../../services/storeSession";
import Alert from 'react-bootstrap/Alert';
import { login_regex } from "../../../services/validations/auth.validation";
import style from './LoginForm.module.css';

function LoginForm() {

  const navigate = useNavigate()

  const handleOnSubmit = async event => {

    event.preventDefault()
    const form = event.target
    const resetForm = (form) => {
      form.username.value = ""
      form.password.value = ""
    }

    const loginInfo = {
      nickname: form.username.value,
      password: form.password.value
    }

    const { error } = login_regex.validate(loginInfo)
    if (error) {
      return toast.error(error.details[0].message)
    }

    try {
      const login = await fetch(`${environment.apiUrl}${routes.login}`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })

      if (!login.ok) {
        resetForm(form)
        return toast.error('Error en la peticion al servidor')
      }

      const response = await login.json()

      if (!response.process) {
        resetForm(form)
        return toast.error('Error al loguear usuario')
      }

      toast.success('Usuario logueado con exito')

      storeSession.setCookie('auth', `${response.data}`, { secure: true, expires: null, sameSite: 'Strict', path: '/' })

      navigate('/home')

    } catch (error) {
      toast.error('Error en la peticion al servidor')
      resetForm(form)
    }

  }
  //TODO: Add styles and handle API connection.
  return (
    <div className={style.container}>
      <div className={style['form-container']}>
        <h2>Login</h2>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label className={style['form-label']}>Nombre de usuario</Form.Label>
            <Form.Control className={style['form-control']} type="text" placeholder="username" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className={style['form-label']}>Contraseña</Form.Label>
            <Form.Control className={style['form-control']} type="password" placeholder="password" required />
          </Form.Group>
          <Button type="submit" variant="primary" className={style['form-control']}>Login</Button>
        </Form>
        <Alert className={style.alert} key={'dark'} variant={'dark'}>
          ¿No tienes una cuenta? <Alert.Link href="/register" className={style['alert-link']}>Regístrate</Alert.Link>
        </Alert>
      </div>
    </div>
  )
}

export default LoginForm;