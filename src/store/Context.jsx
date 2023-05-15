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
    const [loginTime, setLoginTime] = useState(null)
    const userIsLoggedIn = !!token

    useEffect(()=>{
        const storedToken = localStorage.getItem('token')
        const storedTime = localStorage.getItem('loginTime')

        if(storedTime && storedToken) {
            const currTime = Date.now();
            const timePassed = currTime - parseInt(storedTime)
            const minutePassed = timePassed/(1000*60)
            if(minutePassed<5){
                setToken(storedToken)
                setLoginTime(storedTime)
            }else{
                logoutHandler()
            }
        }


    }, [])
    const loginHandler = (token)=>{
        setToken(token)
        localStorage.setItem("token", token);
        localStorage.setItem("loginTime", Date.now().toString());
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