import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthService } from "../helper/AuthService"

export const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => { 
        AuthService.removeToken()
        navigate('/login')
    }, [navigate])
    
    return null; // No JSX is returned here as this is a pure function effect hook. It only runs once when the component mounts.
}