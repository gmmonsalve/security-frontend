import isAuth from "./isAuth"
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component })=>{
    return isAuth()? component: <Navigate to="/login"/>;
}

export default ProtectedRoute;