import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import { useNavigate} from 'react-router'
import { useParams } from 'react-router-dom'

import { Form, FormControl } from 'react-bootstrap'
import moment from 'moment/moment'
import BookingSummary from './BookingSummary'
import { bookRoom2 } from '../utils/BookingFunctions'

const BookingForm = () => {
    const currentUser=localStorage.getItem("userId")
    const[isValidated, setIsValidated]=useState(false)
    const[isSubmitted, setIsSubmitted]=useState(false)
    const[errorMessage, setErrorMessage]=useState(null)
    const[price, setPrice]=useState(0)
    const[booking, setBooking]=useState({
        guestFullName :"",
        guestEmail:currentUser,
        checkInDate:"",
        checkOutDate:"",
        numberOfAdults:"",
        numberOfChildren:""
    })
     
    const navigate=useNavigate()
    const{roomId}=useParams(); 
  
    const handleInputChange=(e)=>{
       // const{name, value}=e.target

        const name=e.target.name;
        let value= e.target.value;
      
        setBooking({...booking, [name]: value})
        setErrorMessage("")


    }
    const[roomInfo, setRoomInfo]=useState({

        photo:"",
        roomType:"",
        price:""
    })
    const getRoomPriceById=async(roomId)=>
    {
        try{
            const response=await getRoomById(roomId)
            setPrice(response.price)
            
        }catch(error){
            throw new Error(error)
        }
    }

    useEffect(()=>{
        getRoomPriceById(roomId)
    },[roomId])


 function  calculatePayement(){
    const checkInDate=moment(booking.checkInDate)
    const checkOutDate=moment(booking.checkOutDate)
    const diffInDays=checkOutDate.diff(checkInDate, 'days')

    
    const paymentPerDay=price ? price : 0
    
     const result= diffInDays * paymentPerDay;
     return result;

}

const isGuestValid=()=>{
    const adultCount=parseInt(booking.numberOfAdults)
    const childrenCount=parseInt(booking.numberOfChildren)
    const totalCount=adultCount + childrenCount
    return totalCount >=1 && adultCount >=1

}

const isCheckOutDateValid=()=>{
    if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate)))
    {
        setErrorMessage("check-out date must come after checkin date")
        return false
    }else{
        setErrorMessage("")
        return true
    }
}
const handleSubmit=(e)=>{
    e.preventDefault()
    const form =e.currentTarget
    if(form.checkValidity()===false || !isGuestValid() || !isCheckOutDateValid()){
    e.stopPropagation()
 }   else{
    setIsSubmitted(true)
 }
 setIsValidated(true)


}
const handleBooking=async()=>{ 
    
    try{
       
        const confirmationCode= await bookRoom(roomId, booking)
        setIsSubmitted(true)
        
        navigate("/booking-success", {state:{message: confirmationCode}})

    }catch(error)
 {
    setErrorMessage(error.message)
    navigate("/booking-success", {state:{error: errorMessage}})
}
}

  return (
    <>
       <div className='container mt-5'>

<div className='row'>
    <div className='col-md-6'>

     <div className='card card-body mt-5'>
     <h4 className=' card-title'> Reserve Room </h4>
      <Form noValidate validated={isValidated} onSubmit={handleSubmit}>     
        
    <Form.Group> <Form.Label htmlFor="guestFullName" className="hotel-color">Full Name: </Form.Label> 
       <Form.Control 
           required
           type='text'
           id='guestFullName'
           name='guestFullName'
           value={booking.guestFullName}
           placeholder='Enter your full name'
           onChange={handleInputChange}/>

       <Form.Control.Feedback type='invalid'> Please enter your fullName </Form.Control.Feedback>
    </Form.Group>
        
    <Form.Group>
        <Form.Label htmlFor="guestEmail" className="hotel-color"> Email:</Form.Label>
</Form.Group>
       <Form.Control 
       required
       type='email'
       id='guestEmail'
       name='guestEmail'
       value={booking.guestEmail}
       placeholder='Enter your Email'
       onChange={handleInputChange}/>

<Form.Control.Feedback type='invalid'>
  Please enter your email address
</Form.Control.Feedback>
<fieldset style={{border:"2px"}}>
    <legend>Lodging period</legend>
    <div className='row'>

        <div className='col-6'>

    <Form.Label htmlFor="checkInDate" className="hotel-color"> Check-In data:</Form.Label>
      <Form.Control 
       required
       type='date'
       id='checkInDate'
       name='checkInDate'
       value={booking.checkInDate}
       placeholder='Check in date'
       onChange={handleInputChange}/>

<Form.Control.Feedback
type='invalid'>
  Please select a check-in date
</Form.Control.Feedback>

        </div>

        <div className='col-6'>

<Form.Label htmlFor="checkOutDate" className="hotel-color"> Check-Out data:</Form.Label>
  <Form.Control 
   required
   type='date'
   id='checkOutDate'
   name='checkOutDate'
   value={booking.checkOutDate}
   placeholder='Check out  date'
   onChange={handleInputChange}/>

<Form.Control.Feedback
type='invalid'>
Please select a check-out date
</Form.Control.Feedback>

    </div> 
    {errorMessage && <p className='error-message text-danger'>{errorMessage } </p>}
    </div>
</fieldset>
<fieldset>
    <legend>Number of Guests</legend>

<div className='row'>

<div className='col-6'>

<Form.Label htmlFor="numberOfAdults" className="hotel-color"> Adults:</Form.Label>
<Form.Control 
required
type='number'
id='numberOfAdults'
name='numberOfAdults'
value={booking.numberOfAdults}
placeholder='0'
min={1}
onChange={handleInputChange}/>

<Form.Control.Feedback
type='invalid'>
Please select at least 1 adult
</Form.Control.Feedback>

</div>

<div className='col-6'>

<Form.Label htmlFor="numberOfChildren" className="hotel-color"> Childeren:</Form.Label>
<Form.Control 
required
type='number'
id='numberOfChildren'
name='numberOfChildren'
value={booking.numberOfChildren}
placeholder='0'
onChange={handleInputChange}/>



</div>

</div>

</fieldset>
<div className='form-group mt-2 mb-2'>
  <button type='submit'  className='btn btn-secondary' >Continue</button>
</div>
        
         </Form>

     </div>
    </div>
    <div className='col-md-6'>
        {isSubmitted && (
            <BookingSummary
            booking={booking}
            payment={calculatePayement()}
            isFormValid={isValidated}
            onConfirm={handleBooking}
             />
        )}



    </div>

</div>


        </div> 
        
        
        
        
        
        
        
        
        
        
        </>
  )
}

export default BookingForm