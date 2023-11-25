import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function Login() {
    
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [userName, setUserName] = useState('mahir');
    const [password, setPassword] = useState('mahir');
    const navigate = useNavigate();
    const authContext = useAuth();

    function handleUserNameChange(event) {
        setUserName(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit() {
        const isAuthenticated = await authContext.login(userName, password);
        if(isAuthenticated) {
            navigate(`/welcome/${userName}`);
        } else {
            setShowErrorMessage(true);
        }
    }

    return (
        <div className="todo-login">
            <h1>Login to use Todo Application</h1>
            {showErrorMessage && <div className="loginErrorMessage"> Authenticated Failed</div>}
            <div className="loginForm">
                <div className="loginFormUsername">
                    <label>User Name</label>
                    <input type="text" name="userName" value={userName} onChange={handleUserNameChange}/>
                </div>
                <div className="loginFormPassword">
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div className="loginFormButton">
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    );
}