import { createContext, useState } from "react";


export const AuthContext = createContext({})

// username: "mor_2314"
// password: "83r5^_"

export function AuthProvider({ children }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [logged , setLogged] = useState(false)

  function login(user,pass,token){
        setUsername(user)
        setPassword(pass)
        localStorage.setItem('token', token)
        setLogged(true)
  }


  function logout(){
    localStorage.clear()
    setUsername('')
    setPassword('')
    setLogged(false)
  }

  function getToken(){
    return localStorage.getItem('token')
  }

    return (
        <AuthContext.Provider value={{
            
            username,
            password,
            logout,
            getToken,
            login,
            logged

        }}>
            {children}
        </AuthContext.Provider>
    )
}



