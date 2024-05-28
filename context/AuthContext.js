import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { login, register } from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [todos, setTodos] = useState([]);
    const router = useRouter();
    // useEffect(()=>{
    //     sessionStorage.setItem('token',token);
    // },[token])
    const handleLogin = async (username,password) => {
        try {
            const response = await login(username,password);
            setToken(response.access_token);
            setUser(username);
            router.push('/');
        } catch (error) {
            console.error("Login error", error);
        }
    };

    const handleRegister = async (username,email,password) => {
        try {
            await register(username,email,password);
            await handleLogin(username, password);
        } catch (error) {
            console.error("Registration error", error);
        }
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, handleLogin, handleRegister, handleLogout,todos,setTodos }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);