import { AuthServiceInterface } from '../interface';

const AuthService: AuthServiceInterface = {
    saveToken: (token: string): void => localStorage.setItem("token", token),
    getToken: (): string | null => localStorage.getItem("token"),
    removeToken: (): void => localStorage.removeItem("token"),
    isAuthenticated: (): boolean => !!localStorage.getItem("token"),
    logout: (): void => {
        AuthService.removeToken();// Call the existing removeToken method directly
    }
};
 export default AuthService;