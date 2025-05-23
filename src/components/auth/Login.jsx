import React, { useContext, useState } from 'react'
import { loginUser } from '../utils/ApiFunctions'
import { useNavigate, Link } from 'react-router-dom'
import {AuthProvider,  AuthContext } from './AuthProvider'

const Login = () => {
 const[errorMessage, setErrorMessage]=useState("")
 const[login, setLogin]=useState({
    email:"",
    password:""
 })

 const navigate=useNavigate()
const{handleLogin}=useContext(AuthContext)

const handleInputChange=(e)=>{
setLogin({...login, [e.target.name]:e.target.value})
}
const  handleSubmit=async(e)=>{
    e.preventDefault()
    const success=await loginUser(login)
    if(success){
        const token=success.token
        handleLogin(token)
        //const decodedToken=jwtDecoded(token) 

        //localStorage.setItem("token",token)
        //localStorage.setItem("userId",decodedToken.sub)
        //localStorage.setItem("userRple",decodedToken.roles.join(","))
        navigate("/")
         // window.location.reload

    }else{
        setErrorMessage("Invalid username and password. Please try again ")
    }
    setTimeout(()=>{
        setErrorMessage("")
    }, 4000)

}
  return (
    <section className='container col-6 mt-5 mb-5'>
{errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
    <h2> Login</h2>
    <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
            <label htmlFor='email' className='col-sm-2  col-form-lable'>Email</label>
            <div>
                <input
                id="email"
                name="email"
                type="email"
                className='form-control'
                value={login.email}
                onChange={handleInputChange}/>
            </div>
        </div>
        <div className='row mb-3'>
            <label htmlFor='password' className='col-sm-2  col-form-lable'>Password</label>
            <div>
                <input
                id="password"
                name="password"
                type="password"
                className='form-control'
                value={login.password}
                onChange={handleInputChange} />
            </div>

        </div>
        <div className='mb-3'>
           <button 
           type='submit'
           className='btn btn-warning'
           style={{marginRight:"10px"}}>Login</button>
           <span style={{marginLeft:"10px"}}>Don't have account yet?<Link to={"/register"}>Register</Link></span>
        </div>
    </form>
        
    </section>
  )
}

export default Login