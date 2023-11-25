import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function Header() {
    const authContext = useAuth();

    return (
        <header className="todoHeader">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <button className="navbar-brand ms-2 fs-2 fw-bold text-black app-name-navbar">Todo App</button>
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav">
                                {authContext.isAuthenticated && 
                                    <>
                                    <li className="nav-item fs-5"><Link className="nav-link" to="/welcome/mahir">Home</Link></li>
                                    <li className="nav-item fs-5"><Link className="nav-link" to="/todos">Todos</Link></li>
                                    </>
                                }
                                </ul>
                            </div>
                        
                        <ul className="navbar-nav">
                            {authContext.isAuthenticated ? 
                                <li className="nav-item fs-5"><Link className="nav-link" onClick={() => authContext.logout()} to="/logout">Logout</Link></li> 
                                : <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}