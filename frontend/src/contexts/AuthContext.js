import React, { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const setAuth = (token, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const updateUser = (userData) => {
        const merged = { ...user, ...userData };
        localStorage.setItem("user", JSON.stringify(merged));
        setUser(merged);
    };

    // ================= REGISTER =================

    const register = async (email, password, name) => {
        try {

            const res = await api.post("/api/auth/register", {
                name,
                email,
                password
            });

            return res.data;

        } catch (err) {

            const message =
                err?.response?.data?.message ||
                err.message ||
                "Registration failed";

            throw new Error(message);
        }
    };

    // ================= LOGIN =================

    const login = async (email, password) => {
        try {

            const res = await api.post("/api/auth/login", {
                email,
                password
            });

            setAuth(res.data.token, res.data.user);

            return res.data;

        } catch (err) {

            const message =
                err?.response?.data?.message ||
                err.message ||
                "Login failed";

            throw new Error(message);
        }
    };

    // ================= LOGOUT =================

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };

    const value = {
        register,
        login,
        updateUser,
        logout,
        user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
