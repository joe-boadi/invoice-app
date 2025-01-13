// Helper function to handle JWT storage
import { AuthServiceInterface }from '../interface'

export const AuthService: AuthServiceInterface = {
    saveToken: (token: string): void => localStorage.setItem("jwt", token),
    getToken: (): string | null => localStorage.getItem("jwt"),
    removeToken: (): void => localStorage.removeItem("jwt"),
    isAuthenticated: (): boolean => !!localStorage.getItem("jwt"),
};