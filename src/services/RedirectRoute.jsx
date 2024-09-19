import isAuth from "./isAuth"
import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectRoute = ({ component })=>{
    return isAuth()? <Navigate to="/"/>: component;
}

export default RedirectRoute;