import { createContext, useEffect, useState } from "react";

export const AuthContext= createContext ({
    token : '',
    isLoggenIn : false,
    login : (token)=>{

    },
    logout : ()=>{}
})

const Context = ({children})=>{

    const [token, setToken] = useState(null)
    const userIsLoggedIn = !!token

    useEffect(()=>{
        loginHandler(localStorage.getItem('loginId'))
    }, [])
    const loginHandler = (token)=>{
        setToken(token)
    }
    const logoutHandler = ()=>{
        setToken(null)
    }
    const ContextValue = {
        token : token,
        isLoggenIn : userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }
    return <AuthContext.Provider  value={ContextValue} >{children}</AuthContext.Provider>
}

export default Context