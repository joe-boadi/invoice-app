// Helper function to handle JWT storage
import { AuthServiceInterface }from '../interface'

export const AuthService: AuthServiceInterface = {

    saveToken: (token: string): void => localStorage.setItem("token", token),
    getToken: (): string | null => localStorage.getItem("token"),
    removeToken: (): void => localStorage.removeItem("token"),
    isAuthenticated: (): boolean => !!localStorage.getItem("token"),
};