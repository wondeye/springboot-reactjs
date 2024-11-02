import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import {getUser,deleteUser, getBookinsByUserId } from "../utils/ApiFunctions"
import moment from 'moment'


const Profile = () => {


  const[errorMessage, setErrorMessage]=useState("")
  const[message, setMessage]=useState("")
  const[bookings, setBookings]=useState([
    { id:"",
      room:{id:"", roomType:""},
      checkInDate:"", 
      checkOutDate:"",
      bookingConfirmationCode:""

  }])


  const userId=localStorage.getItem("userId")
  const token=localStorage.getItem("jwtToken")
  const navigate =useNavigate()

  const[user, setUser]=useState({
    firstName:"",
    lastName:"",
    email:"", 
    roles:[{id:"", name:""}]
 
  })

  useEffect(()=>{
    const fetchUser=async()=>{
      const token=localStorage.getItem("token")
      try{
        const userData=await getUser(userId, token)
        setUser(userData)
      } catch(error){
        console.error(error)
      }
    }
    fetchUser()
  }, [userId])


  useEffect(()=>{
    const fetchBookings=async()=>{
      const token=localStorage.getItem("token")
      try{
        const response=await getBookinsByUserId(userId, token)
        setBookings(response)
      } catch(error){
        console.error("Error fetching rooms",error.message)
        setErrorMessage(error.message)
      }
    }
    fetchBookings()
  }, [userId])


  

const handleDeleteAccount=async()=>{
  const confirmed =window.confirm(
    "Are you sure  you want to delete your account? This action cannot be undone."
  )
  if(confirmed){
    await deleteUser(userId)
    .then((response)=>{
      setMessage(response.data)

      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      localStorage.removeItem("userRole")

      navigate("/")
      window.location.reload()
    }).catch((error)=>{
      setErrorMessage(error.data)
    })
  }
}



  return (
    <div className='container'>

{errorMessage && <p className='text-danger'>{errorMessage}</p>}
{message && <p className='text-danger'>{message}</p>}
{user ?(
  <div className='card' style={{backgroundColor:"whitesmoke"}}>
    <div className='card-body'>
    <h4 className='card-title'> User Information</h4>

<div className='row'>
<div className='col-md-3'>
 <div className='card mb-3 shadow'>

  <div className='card-body d-flex align-items-center'> 
 <div className='d-flex justify-content-center align-items-center'>
 <img src="https://th.bing.com/th/id/OIP.IE0ZRZd3d35bltyoHOw7CQHaHa?rs=1&pid=ImgDetMain" alt="Profile" className='rounded-circle' style={{ width:"150px", height:"150px", objectFit:"cover"}}/>
 </div>
 </div>
 <div className='col-md-10'>
  <div className='card-body'>
    <div className='form-group row'>
      <label className='col-md-2 col-form-label fw-bold '> ID:</label>
 <div className='col-md-10'><p className='card-text'> {user.id} </p>
 </div>
 </div>
<hr/>

<div className='form-group row'> 
     <label className='col-md-2 col-form-label fw-bold '>First Name :</label>
     <div className='col-md-10'>
        <p className='card-text'> {user.firstName} </p>
     </div>
 </div>
<hr/>

<div className='form-group row'> 
     <label className='col-md-2 col-form-label fw-bold '>Last Name :</label>
     <div className='col-md-10'>
        <p className='card-text'> {user.lastName} </p>
     </div>
 </div>
<hr/>

<div className='form-group row'> 
     <label className='col-md-2 col-form-label fw-bold '>Email :</label>
     <div className='col-md-10'>
        <p className='card-text'> {user.email} </p>
     </div>
 </div>
<hr/>


<div className='form-group row'> 
     <label className='col-md-2 col-form-label fw-bold '>Roles :</label>
     <div className='col-md-10'>

      <ul className='list-unstyled'>
     {user.roles.map((role)=>(
      <li key={role.id} className='card-text'>{role.name}</li>

     ))}
      </ul>
     </div>
 </div>
</div>
</div>
</div>
</div>

<h4 className='card-title text-center'>Booking Histroy </h4>
{bookings.length > 0 ? (
<table className='table table-borderd table-hover shadow'>
  <thead>
    <tr>
      <th scope="col">Booking ID</th>
      <th scope="col">Room ID</th>
      <th scope="col">Room Type</th>
      <th scope="col">Check In Date</th>
      <th scope="col">Check Out Date</th>
      <th scope="col">Confirmation Code</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
 {bookings.map((booking, index)=>(
   <tr key={index}>
    <td>{booking.id} </td>
    <td>{booking.room.id} </td>
    <td>{booking.room.roomType} </td>
    <td>{moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")} </td>
    <td>{moment(booking.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}</td>
    <td>{booking.bookingConfirmationCode}</td>
    <td className='text-success'>On-going</td>
   </tr>

 ))}

  </tbody>




</table>


):(<p>You have not made any bookings yet.</p>)}
 


<div className='d-flex justify-content-center'>
  <div className='mx-2'>
<button className='btn btn-danger' onClick={handleDeleteAccount}>
  Close Account
  </button>

  </div>
 </div>

</div>

      </div>
    </div>
  

):(<p>Loading ....</p>)}


    </div>
  )
} 
export default Profile