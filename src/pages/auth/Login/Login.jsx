import LoginForm from '../../../components/auth/LoginForm/LoginForm';
import Card from 'react-bootstrap/Card';

const Login = ()=>{
    return <>
        <section>
            <article>
                <Card className='container-sm'>
                    <Card.Body>
                        <LoginForm></LoginForm>
                    </Card.Body>
                </Card>
            </article>
        </section>
    </>
}

export default Login;