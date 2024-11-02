import React from 'react'
import { Navigate, useLocation } from 'react-router'

const RequireAuth = ({children}) => {

const user=localStorage.getItem("userId")
const location=useLocation()
if(!user){
    return <Navigate to="/login" state={{path: location.pathname}}/>
}

  return children
}

export default RequireAuth