import isAuth from "./isAuth"
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component }) => {
    const authenticated = isAuth();

    return authenticated ? component : <Navigate to="/login" />;
}

export default ProtectedRoute;

/*
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import isAuth from './isAuth';

const ProtectedRoute = ({ component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const authStatus = isAuth();
        setIsAuthenticated(authStatus);
    }, []);

    if (isAuthenticated === null) {
        // Mostrar un mensaje de carga mientras se verifica la autenticación
        return <div>Loading...</div>;
    }

    // Si está autenticado, renderiza el componente, si no, redirige al registro o login
    return isAuthenticated ? component : <Navigate to="/register" />;
};

export default ProtectedRoute;
*/