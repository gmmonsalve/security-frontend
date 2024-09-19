import {environment,routes} from "../../../utils/constants";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import storeSession from "../../../services/storeSession";

function RegisterForm(){

    const navigate = useNavigate()

    const handleOnSubmit = async event=>{
        
        event.preventDefault()
        const form = event.target
        const resetForm = (form)=>{
            form.username.value = ""
            form.password.value = ""
            form.email.value = ""
            form.password.value = ""
            form.confirmpass.value = ""
            form.name.value = ""
       }

        const registerInfo = {
            name: form.name.value,
            username: form.username.value,
            email: form.email.value,
            password: form.password.value
        }

        try {
            const register = await fetch(`${environment.apiUrl}${routes.register}`, {
              method: 'POST',
              headers: {
                "Content-Type": 'application/json'
              },
              body: JSON.stringify(registerInfo)
            })
      
            if (!register.ok){ 
              resetForm(form)
              return toast.error('Error en la peticion al servidor')
            }
      
            const response = await register.json()
      
            if (!response.process) {
                resetForm(form)
                return toast.error('Error al registrar al usuario')
            }
      
            toast.success('Usuario registrado con exito')
      
            storeSession.setCookie('auth',`${response}`, {secure: true, expires: null,sameSite: 'Strict', path: '/'})
      
            navigate('/')
      
          } catch (error) {
            toast.error('Error en la peticion al servidor')
            resetForm(form)
          }

    } //TODO: Add styles and handle API connection.

    return <>
    <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Nombre"  required></Form.Control>
        </Form.Group>
        <Form.Group controlId="username">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control type="text" placeholder="Username"  required></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" required></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" required></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmpass">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control type="password" placeholder="Confirmar contraseña" required></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Registrar</Button>
    </Form>
    </>
}

export default RegisterForm;