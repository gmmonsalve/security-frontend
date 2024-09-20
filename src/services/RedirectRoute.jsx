import isAuth from "./isAuth"
import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectRoute = ({ component }) => {
    const authenticated = isAuth();

    return authenticated ? <Navigate to="/" /> : component;
}

export default RedirectRoute;

/*
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuth from './isAuth';

const RedirectRoute = ({ component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const authStatus = isAuth();
        setIsAuthenticated(authStatus);
    }, []);

    if (isAuthenticated === null) {
        // Mostrar un mensaje de carga mientras se verifica la autenticación
        return <div>Loading...</div>;
    }

    // Si está autenticado, redirige al home, si no, renderiza el componente (login/register)
    return isAuthenticated ? <Navigate to="/" /> : component;
};

export default RedirectRoute;
*/