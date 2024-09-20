import { environment, routes } from "../../../utils/constants";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import storeSession from "../../../services/storeSession";
import Alert from 'react-bootstrap/Alert';
import style from './LoginForm.module.css';

function LoginForm() {
  const navigate = useNavigate();

  const handleOnSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    const resetForm = (form) => {
      form.username.value = "";
      form.password.value = "";
    };

    const loginInfo = {
      nickname: form.username.value,
      password: form.password.value
    };

    try {
      const login = await fetch(`${environment.apiUrl}${routes.login}`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      if (!login.ok) {
        resetForm(form);
        return toast.error('Error en la petición al servidor');
      }

      const response = await login.json();

      if (!response.process) {
        resetForm(form);
        return toast.error('Error al loguear usuario');
      }

      toast.success('Usuario logueado con éxito');

      storeSession.setCookie('auth', `${response}`, { secure: true, expires: null, sameSite: 'Strict', path: '/' });

      navigate('/');
    } catch (error) {
      toast.error('Error en la petición al servidor');
      resetForm(form);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.formWrapper}>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control type="text" placeholder="username" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="password" required />
          </Form.Group>
          <Button type="submit" className={style.loginButton}>Login</Button>{' '}
        </Form>
        <Alert key={'dark'} variant={'dark'} className={style.alertWrapper}>
          ¿No tienes una cuenta? <Alert.Link href="/register">Regístrate</Alert.Link>
        </Alert>
      </div>
    </div>
  );
}

export default LoginForm;
