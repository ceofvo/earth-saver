import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';
import { useNavigation, StackActions} from "@react-navigation/native";

export const AuthContext = createContext();

function AuthProvider({children}){
    const [isLoading, setIsLoading] = useState(false)
    const [authToken, setAuthToken] = useState(null)
    const [userData, setUserData] = useState("")

    function login(data){
        setIsLoading(true)
        setAuthToken(data.token)
        setUserData(data)
        AsyncStorage.setItem('authToken', data.token)
        AsyncStorage.setItem('userData', JSON.stringify(data))
        setIsLoading(false)
    }
    function register(data){
        setUserData(data)
    }
    function update(data){
        setIsLoading(true)
        setUserData(data)
        AsyncStorage.setItem('userData', JSON.stringify(data))
        setIsLoading(false)
    }
    function logout(){
        setIsLoading(true)
        setAuthToken(null)
        AsyncStorage.removeItem('authToken')
        AsyncStorage.removeItem('userData')
        setIsLoading(false)
    }

    async function checkIfLoggedIn(){
        try {
            setIsLoading(true)
            const authToken = await AsyncStorage.getItem('authToken')
            const userData = await AsyncStorage.getItem('userData')
            const storedUserData = JSON.parse(userData)

            if(userData) {
                setAuthToken(authToken)
                setUserData(storedUserData)
            }

            setIsLoading(false)
        } catch (error) {
            console.log("Login Error", error)
        }
    }

    useEffect(()=>{
        checkIfLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{login, logout, register, update, isLoading, authToken, userData}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
