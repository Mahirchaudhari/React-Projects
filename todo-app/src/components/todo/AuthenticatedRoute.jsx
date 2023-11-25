import { useAuth } from "./security/AuthContext";
import { Navigate } from "react-router-dom";

export default function AuthenticatedRoute({children}) {
    const authContext = useAuth();
    if(authContext.isAuthenticated) {
        return children;
    } else {
        return <Navigate to="/" />
    }
}