import React, { createContext, useState } from 'react';
import authService from '../services/authService.js';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const fetchUser = async () => {
            try{
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser.user);
                return currentUser.user;
            }catch(err){
                setUser(null);
            }
            setLoading(false);
        };

    const login = async (email, password) => {
        const loggedInUser = await authService.loginUser(email, password);
        setUser(loggedInUser);
    };

    const register = async (name, email, address, password) => {
        const newUser = await authService.registerUser(name, email, address, password);
        setUser(newUser);
    };

    const logout = async () => {
        await authService.logoutUser();
        setUser(null);
        navigate('/login');
    };
    const updatePassword = async (email, oldPassword, newPassword) => {
        await authService.updatePassword(email, oldPassword, newPassword);
        const updatedUser = await authService.getCurrentUser();
        setUser(updatedUser);
    }
    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, register, logout,updatePassword,fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};