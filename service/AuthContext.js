import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

function AuthProvider({children}){
    const [isLoading, setIsLoading] = useState(false)
    const [authToken, setAuthToken] = useState(null)
    const [userData, setUserData] = useState("")

    function login(data){
        setAuthToken(data.token)
        setIsLoading(false)
        setUserData(data)
    }
    function register(data){
        setUserData(data)
    }
    function logout(){
        setIsLoading(false)
        setAuthToken(null)
    }

    return (
        <AuthContext.Provider value={{login, logout, register, isLoading, authToken, userData}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
