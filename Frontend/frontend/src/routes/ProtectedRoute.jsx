import React from 'react';
import { authContext } from '../context/AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { token, role } = useContext(authContext);

    // Check if the user has the required role
    const isAllowed =  allowedRoles.includes(role);
    const accessible = token && isAllowed ? children : <Navigate to='/login' replace={true}/>
    return accessible ;
};

export default ProtectedRoute
