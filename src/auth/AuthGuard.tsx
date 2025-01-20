import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./context/AuthProvider";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }

  const { auth } = authContext;

  if (!auth) {
    // Redirect to login page but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
