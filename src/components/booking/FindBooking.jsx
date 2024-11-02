import React, { useState } from 'react'
import {getBookingByConfirmationCode, cancelBooking} from './../utils/ApiFunctions'
import moment from 'moment/moment'


const FindBooking = () => {
    const [confirmationCode, setConfirmationCode]=useState("")
    const[error, setError]=useState("")
    const[successMessage, setSuccessMessage]=useState("")
    const [isLoading, setIsLoading]=useState(false)
    const [isDeleted, setIsDeleted]=useState(false)

    const[bookingInfo, setBookingInfo]=useState({
        id:"",
        room:{id:"",roomType:""}, 
        bookingConfirmationCode:"", 
        roomNumber:"",
        checkInDate:undefined,
        checkOutDate:undefined,
        guestFullName:"",
        guestEmail:"", 
        numberOfAdults:"", 
        numberOfChildren:"", 
        totalNumberOfGuests:""
        
    })
const clearBookingInfo={
      id:"",
        room:{id:""}, 
        bookingConfirmationCode:"", 
        roomNumber:"",
        checkInDate:undefined,
        checkOutDate:undefined,
        guestFullName:"",
        guestEmail:"", 
        numberOfAdults:"", 
        numberOfChildren:"", 
        totalNumberOfGuests:""
}

const handleInputChange=(e)=>{
  setConfirmationCode(e.target.value)

}

const handleFormSubmit=async(e)=>
{
  e.preventDefault()
  setIsLoading(true)
  try{
const data=await getBookingByConfirmationCode(confirmationCode)
setBookingInfo(data)
  }catch(error){
    setBookingInfo(clearBookingInfo)
 if(error.response && error.response.status===404){
  setError(error.response.data.message)
 }
 else{
  setError(error.message)
 }

  }

setTimeout(()=>{
  setIsLoading(false);
}, 2000)

}

const handleBookingCancellation=async(bookingId)=>{
  try{
   await cancelBooking(bookingInfo.id)
   setIsDeleted(true)
   setSuccessMessage("Booking has been cancelled successfully!")
   setBookingInfo(clearBookingInfo)
   setConfirmationCode("")
   setError(null)


  }catch(error){
     setError(error.message)
  }
setTimeout(()=>{
  setSuccessMessage("")
  setIsDeleted(false)
},4000)

}




  return (
    <>
    <div className='container mt-5 d-flex flex-column 
    justify-content-center align-items-center'>
      <h2>Find My Booking</h2>
      <form onSubmit={handleFormSubmit} className='col-md-6'>
      <div className='input-group mb-3'>
        <input
        className='form-control'
        id="confirmationCode"
        name="confirmationCode"
        value={confirmationCode}
        onChange={handleInputChange}
        placeholder='Enter the booking confirmation code'/>
        <button className='btn btn-warning input-group-text'>Find booking</button>
        
      

      </div>

      </form>
      {isLoading ? (<div>Finding booking ....</div>) : error ? (<div className='text-danger'>{error}</div>) : 
      bookingInfo.bookingConfirmationCode ? (
      
<div className='col-md-6 mt-4 mb-5'>
<h3>Booking Information</h3>
<div className='card justify-content-center p-3 border-1  '>
  <div className=''>
<p className='p-1'> <strong className='text-secondary'>Booking Confirmation Code :</strong>
<span className='text-primary'>{bookingInfo.bookingConfirmationCode}</span></p>
  <p className='p-1'><strong className='text-secondary '>Booking ID :</strong> <span className='text-primary'> {bookingInfo.id}</span></p>
  <p className='p-1'><strong className='text-secondary'>Boom Number :</strong>{bookingInfo.room.id}</p>
  <p className='p-1'><strong className='text-secondary'>Booking Room Type :</strong>{bookingInfo.room.roomType}</p>

  <p className='p-1'><strong className='text-secondary'>Check-in-Date :</strong>{moment(bookingInfo.checkInDate).subtract(1,"month").format("MMM Do, YYYY")}</p>
  <p className='p-1'><strong className='text-secondary'>Check-Out-Date :</strong>{moment(bookingInfo.checkOutDate).subtract(1,"month").format("MMM Do, YYYY")}</p>
  <p className='p-1'><strong className='text-secondary'>Full Name :</strong>{bookingInfo.guestFullName}</p>
  <p className='p-1'><strong className='text-secondary'>Email Address :</strong>{bookingInfo.guestEmail}</p>
  <p className='p-1'><strong className='text-secondary'>Adults :</strong>{bookingInfo.numberOfAdults}</p>
  <p className='p-1'><strong className='text-secondary'>Children :</strong>{bookingInfo.numberOfChildren}</p>
  <p className='p-1'><strong className='text-secondary'>Total Guest :</strong>{bookingInfo.totalNumberOfGuests}</p>
  </div>
</div>
<br/>
   {!isDeleted && (
    <button 
    className='btn btn-danger'
    onClick={()=>handleBookingCancellation(bookingInfo.id)}
    >Cancel Booking</button>
   )}
</div>):(
  <div>Finding your booking ...</div>
)}
{isDeleted && (
  <div className='alert alert-success mt-3' row="alert">{successMessage}</div>
)}


    </div>
    </>
  )
}

export default FindBooking