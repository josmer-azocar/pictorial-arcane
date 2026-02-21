import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null); //crea un objeto contexto

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setIsLoggedIn(true);
            setUser({ name: "User" });
        }

        setLoading(false);
    }, []);

    const login = (userName, token) => {
        setIsLoggedIn(true);
        localStorage.setItem("token", token);
        setUser({name: userName});
    }

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("token");
    }

    return(
        <AuthContext.Provider value={{isLoggedIn, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(authContext);
export default AuthProvider;