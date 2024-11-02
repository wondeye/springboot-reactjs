import React, { useState } from 'react'
import { registrationUser } from '../utils/ApiFunctions'
import {Link} from "react-router-dom";

const Registration = () => {
 const[registration, setRegistration]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    

  })
  const[errorMessage, setErrorMessage]=useState("")
  const[successMessage, setSuccessMessage]=useState("")

const handleInputChange=(e)=>{
  setRegistration({...registration, [e.target.name]:e.target.value})
 
}

const handleRegistration=async(e)=>{
e.preventDefault();
try{
  const result= await registrationUser(registration)
  setSuccessMessage(result)
  setErrorMessage("")
  setRegistration({firstName:"", lastName:"", email:"", password:""})
}catch(error){
  setSuccessMessage("")
  setErrorMessage(`Registration error: ${error.message}`)
}
setTimeout(()=>{
  setErrorMessage("")
  setSuccessMessage("")
}, 5000)
} 
  
  
  return (
    
    
    
    <section className='container col-6 mt-5 mb-5'>
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
      {successMessage && <p className='alert alert-success'>{successMessage}</p>}
      <h2 className='form-lable'> Register  </h2>
      <form onSubmit={handleRegistration}>
      <div className='row mb-3'>
            <label htmlFor='firstName' className='col-sm-2  col-form-lable hotel-label'>First Name</label>
            <div>
                <input
                id="firstName"
                name="firstName"
                type="text"
                className='form-control'
                value={registration.firstName}
                onChange={handleInputChange}/>
            </div>
        </div>
        <div className='row mb-3'>
            <label htmlFor='lastName' className='col-sm-2  col-form-lable hotel-label'>Last Name</label>
            <div>
                <input
                id="lastName"
                name="lastName"
                type="text"
                className='form-control'
                value={registration.lastName}
                onChange={handleInputChange}/>
            </div>
        </div>
        <div className='row mb-3'>
            <label htmlFor='email' className='col-sm-2  col-form-lable hotel-label'>Email</label>
            <div>
                <input
                id="email"
                name="email"
                type="email"
                className='form-control'
                value={registration.email}
                onChange={handleInputChange}/>
            </div>
        </div>
         <div className='row mb-3'>
             <label htmlFor='password' className='col-sm-2  col-form-lable hotel-label'>Password</label>
             <div>
                 <input
                 id="password"
                 name="password"
                 type="password"
                 className='form-control'
                 value={registration.password}
                 onChange={handleInputChange} />
             </div>
 
         </div>
         <div className='mb-3'>
            <button 
            type='submit'
            className='btn btn-secondary'
            style={{marginRight:"10px"}}>Register</button>
            <span style={{marginLeft:"10px"}}>Already have an account ?<Link to={"/login"}>Login</Link></span>
         </div>
     </form>
         
      
      
      
      </section>
  )
}

export default Registration