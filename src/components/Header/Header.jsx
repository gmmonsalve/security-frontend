import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import storeSession from '../../services/storeSession';

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        storeSession.removeCookie('auth');
        navigate('/login');
    }

    return (
        <Navbar expand="lg" data-bs-theme="dark" bg="dark">
            <Container>
                <Navbar.Brand>Security Front</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href='home'>Home</Nav.Link>
                        <Nav.Link href='cypher-aes'>Cifrado/Descifrado</Nav.Link>
                        <Nav.Link href='download-table'>Descargar Tabla</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;

