import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"
import api from "../services/api";

export const AuthContext=createContext()

function AuthContextProvider({children}) {
  const [isLogin,setIsLogin]=useState(false)
  const [isAdmin,setIsAdmin]=useState(false)
  const [userId, setUserId] = useState(null)
  const [isLoginOpen, setLoginOpen] = useState(false)
  
  useEffect(()=>{
    const fetchUserRole=async()=>{
      try {
      const token=localStorage.getItem("token")
       const decoded=jwtDecode(token)
       const id=decoded.id
       setUserId(id)
       const res=await api.get(`/users/profile/${id}`)
       const role=res.data.role
       if(role==="admin"){
        setIsAdmin(true)
       }else{
        setIsAdmin(false)
      }
    } catch (error) {
      setIsAdmin(false)
      console.log(error)
    }
    }
    if(isLogin){
      fetchUserRole()
    }else{
       setIsAdmin(false)
    }

  },[isLogin])

  const isTokenValid=(token)=>{
    if(!token) return false ;
    
    try {
       const decoded=jwtDecode(token)
       const currentTime=Date.now()/1000
       return decoded.exp>currentTime
    } catch (error) {
      return false
    }
  }

  useEffect(()=>{
     const token=localStorage.getItem("token")
     if(isTokenValid(token)){
      setIsLogin(true)
     }else{
      localStorage.removeItem("token")
      setIsLogin(false)
     }
  },[])

  return (
    <AuthContext.Provider value={{isLogin,setIsLogin,isAdmin,userId,setUserId,isLoginOpen,setLoginOpen}}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;