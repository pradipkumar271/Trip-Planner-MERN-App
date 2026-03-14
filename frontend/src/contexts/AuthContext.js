import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    const setAuth = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const register = async (email, password, name) => {
        const res = await axios.post(
            'http://127.0.0.1:5000/api/auth/register',
            { name, email, password }
        );

        setAuth(res.data.token, res.data.user);
        return res.data;
    };

    const login = async (email, password) => {
        const res = await axios.post(
            'http://127.0.0.1:5000/api/auth/login',
            { email, password }
        );

        setAuth(res.data.token, res.data.user);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = { register, login, logout, user };

    return (

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

    );

}