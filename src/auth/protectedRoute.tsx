import React from 'react';
import { ProtectedRouteProps } from './interface';
import { Navigate } from 'react-router-dom';
import { AuthService } from './helper/AuthService';
 
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (!AuthService.isAuthenticated()) {
        return <Navigate to='/login' />;
    }
    return <> { children } </>;
}