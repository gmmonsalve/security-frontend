import RegisterForm from "../../../components/Auth/RegisterForm";
import Card from 'react-bootstrap/Card';


function Register(){
    return (
        <section>
            <article>
            <Card className='container-sm'>
                    <Card.Body>
                        <RegisterForm></RegisterForm>
                    </Card.Body>
                </Card>
            </article>
        </section>
    )
        
}

export default Register;