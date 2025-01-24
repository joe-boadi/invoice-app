import { ReactNode } from 'react'

export interface User {
    email: string;
    name: string;
    password: string;
}

export interface ProtectedRouteProps {
  children: ReactNode;
}
export interface AuthServiceInterface {
    saveToken: (token: string) => void;
    getToken: () => string | null;
    removeToken: () => void;
    isAuthenticated: () => boolean;
    logout: () => void; // Add logout method

}
