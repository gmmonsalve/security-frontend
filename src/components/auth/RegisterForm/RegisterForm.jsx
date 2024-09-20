import { environment, routes } from "../../../utils/constants";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import storeSession from "../../../services/storeSession";
import { user_regex } from "../../../services/validations/auth.validation";
import style from './RegisterForm.module.css';

function RegisterForm() {

    const navigate = useNavigate()

    const handleOnSubmit = async event => {

        event.preventDefault()
        const form = event.target
        const resetForm = (form) => {
            form.name.value = ""
            form.lastname.value = ""
            form.username.value = ""
            form.password.value = ""
            form.confirmpass.value = ""
        }

        const registerInfo = {
            name: form.name.value,
            lastname: form.lastname.value,
            nickname: form.username.value,
            password: form.password.value,
            confirm_password: form.confirmpass.value
        }

        const { error } = user_regex.validate(registerInfo)
        if (error) {
            return toast.error(error.details[0].message)
        }

        try {
            const register = await fetch(`${environment.apiUrl}${routes.register}`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(registerInfo)
            })

            if (!register.ok) {
                resetForm(form)
                return toast.error('Error en la peticion al servidor')
            }

            const response = await register.json()

            if (!response.process) {
                resetForm(form)
                return toast.error('Error al registrar al usuario')
            }

            toast.success('Usuario registrado con exito')

            // storeSession.setCookie('auth', `${response}`, { secure: true, expires: null, sameSite: 'Strict', path: '/' })

            navigate('/login')

        } catch (error) {
            toast.error('Error en la peticion al servidor')
            resetForm(form)
        }

    } //TODO: Add styles and handle API connection.

    return (
        <div className={style.container}>
          <div className={style['form-container']}>
            <h2>Registro</h2>
            <Form onSubmit={handleOnSubmit}>
              <Form.Group controlId="name">
                <Form.Label className={style['form-label']}>Nombre</Form.Label>
                <Form.Control className={style['form-control']} type="text" placeholder="Nombre" required />
              </Form.Group>
              <Form.Group controlId="lastname">
                <Form.Label className={style['form-label']}>Apellido</Form.Label>
                <Form.Control className={style['form-control']} type="text" placeholder="Apellido" required />
              </Form.Group>
              <Form.Group controlId="username">
                <Form.Label className={style['form-label']}>Nombre de usuario</Form.Label>
                <Form.Control className={style['form-control']} type="text" placeholder="Username" required />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className={style['form-label']}>Contraseña</Form.Label>
                <Form.Control className={style['form-control']} type="password" placeholder="Contraseña" required />
              </Form.Group>
              <Form.Group controlId="confirmpass">
                <Form.Label className={style['form-label']}>Confirmar contraseña</Form.Label>
                <Form.Control className={style['form-control']} type="password" placeholder="Confirmar contraseña" required />
              </Form.Group>
              <Button type="submit" variant="primary" className={style['form-control']}>Registrar</Button>
            </Form>
          </div>
        </div>
      )
}

export default RegisterForm;