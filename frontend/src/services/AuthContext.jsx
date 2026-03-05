import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
//import getProfile from "./getUserPfp.js"

const AuthContext = createContext(null); //crea un objeto contexto

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const initializeUser = async () => {
            const savedToken = localStorage.getItem("token");
        
            if (savedToken) {

                try {
                    /*const tokenToDecode = savedToken.startsWith("Bearer ") 
                    ? savedToken.split(" ")[1] 
                    : savedToken;
                    console.log("Attempting to decode:", tokenToDecode);
                    const decoded = jwtDecode(tokenToDecode);*/
                    setIsLoggedIn(true);
                    setUser({ name: savedToken.name || "Usuario", 
                        pfp: "https://fastly.picsum.photos/id/55/4608/3072.jpg?hmac=ahGhylwdN52ULB37deeMZX6T_G7NiERtoPhwydMvUKQ",
                        role: savedToken.role
                    });
                    //CAMBIAR A decoded.userName cuando se conecte el backend

                } catch (error) {
                    console.error("Token inválido");
                    logout();
                }
                
            }

            setLoading(false);
        }
        initializeUser();

    }, []);

    const login = (userName, token) => {
        setIsLoggedIn(true);
        localStorage.setItem("token", token);
        console.log(userName);
        setUser({name: userName, pfp: "https://picsum.photos/200"});
    }

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("token");
    }

    return(
        <AuthContext.Provider value={{isLoggedIn, user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;