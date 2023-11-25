import { createContext, useContext, useState } from "react";
import { executeBasicAuthService, executeJwtAuthService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/APIClient";

//create context
export const AuthContext = createContext();

//export custom hook to use it in other component 
export const useAuth = () => useContext(AuthContext);

//share context with other component
export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    async function login(userName, password) {
        // to generate basic auth token
        const baToken = 'Basic '+ window.btoa(userName + ":" + password);
        
        try {
            //executeBasicAuthService for basic auth service
            //const response = await executeBasicAuthService(baToken);
            const jwtResponse = await executeJwtAuthService(userName, password);

            if(jwtResponse.status === 200) {
                const jwtToken = 'Bearer ' + jwtResponse.data.token;
                
                setToken(jwtToken);
                setAuthenticated(true);
                setUsername(userName);
                
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )
                return true;
            } else {
                logout();
                return false;
            }
        } catch (error) {
            logout();
            return false;
        }
        
    }

    function logout(){
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token}}>
            { children } 
        </AuthContext.Provider>
    );
}