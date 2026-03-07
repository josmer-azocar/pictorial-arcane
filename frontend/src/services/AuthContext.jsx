import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
//import getProfile from "./getUserPfp.js"

const AuthContext = createContext(null); //crea un objeto contexto

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData, token) => {
    setIsLoggedIn(true);
    setUser(userData); // Now user state has email, surname, etc.
    localStorage.setItem("token", token);
    // Save the object as a string so it survives a page refresh
    localStorage.setItem("user_info", JSON.stringify(userData));
};

// 2. Update the initializeUser (useEffect)
    useEffect(() => {
        const initializeUser = () => {
            const savedToken = localStorage.getItem("token");
            const savedUserInfo = localStorage.getItem("user_info");

            if (savedToken && savedUserInfo) {
                try {
                    const parsedUser = JSON.parse(savedUserInfo);
                    setIsLoggedIn(true);
                    setUser(parsedUser); 
                } catch (error) {
                    console.error("Error parsing user data");
                    logout();
                }
            }
            setLoading(false);
        };
        initializeUser();
    }, []);

    /*useEffect(() => {

        const initializeUser = async () => {
            const savedToken = localStorage.getItem("token");
        
            if (savedToken) {

                try {
                    const tokenToDecode = savedToken.startsWith("Bearer ") 
                    ? savedToken.split(" ")[1] 
                    : savedToken;
                    console.log("Attempting to decode:", tokenToDecode);
                    const decoded = jwtDecode(tokenToDecode);
                    setIsLoggedIn(true);
                    setUser({ name: decoded.name || "Usuario", 
                        pfp: "https://fastly.picsum.photos/id/55/4608/3072.jpg?hmac=ahGhylwdN52ULB37deeMZX6T_G7NiERtoPhwydMvUKQ",
                        role: decoded.role,
                        surname: decoded.surname,
                        email: decoded.email,

                    });
                    //CAMBIAR A decoded.name cuando se conecte el backend

                } catch (error) {
                    console.error("Token inválido");
                    logout();
                }
                
            }

            setLoading(false);
        }
        initializeUser();

    }, []); */

    /*const login = (userData, token) => {
        setIsLoggedIn(true);
        localStorage.setItem("token", token);
        console.log(userData);
            setUser({
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            pfp: "https://picsum.photos/200"
        });
    }*/

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