import Welcome from "./Welcome";
import ErrorNotFound from "./ErrorNotFound";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import Logout from "./Logout";
import ShowTodos from "./ShowTodos";
import "./TodoApp.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./security/AuthContext";
import AuthenticatedRoute from './AuthenticatedRoute';
import TodoComponent from "./TodoComponent";

export default function TodoApp() {
    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                    <Header />
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />

                            <Route path="/welcome/:userName" element={
                                <AuthenticatedRoute>
                                    <Welcome />
                                </AuthenticatedRoute>
                            } />
                            
                            <Route path="/todos" element={
                                <AuthenticatedRoute>
                                    <ShowTodos />
                                </AuthenticatedRoute>
                            } />

                            <Route path="/todo/:id" element={
                                <AuthenticatedRoute>
                                    <TodoComponent />
                                </AuthenticatedRoute>
                            } />
                            
                            <Route path="/logout" element={
                                <AuthenticatedRoute>
                                    <Logout />
                                </AuthenticatedRoute>
                            } />

                            <Route path="*" element={<ErrorNotFound />} />
                        </Routes>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}