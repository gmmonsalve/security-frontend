import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header(){
    return (
        <Navbar expand="lg" data-bs-theme="dark"  bg="dark">
        <Container>
            <Navbar.Brand href="#home">Security Front</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href='home'>Home</Nav.Link>
                <Nav.Link href='cypher-aes'>Cifrado/Descifrado</Nav.Link>
                <Nav.Link href='download-table'>Descargar Tabla</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header;

