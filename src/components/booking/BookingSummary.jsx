import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import {Button} from 'react-bootstrap'
import moment from 'moment/moment'


const BookingSummary = ({ booking, payment, isFormValid, onConfirm}) => {
  const checkInDate =moment(booking.checkInDate)
  const checkOutDate=moment(booking.checkOutDate)
  const numberOfDays=checkOutDate.diff(checkInDate, "days")
  const [isBookingConfirmed, setIsBookingConfirmed]=useState(false)
  const[isProcessingPayment, setIsProcessingPayment]=useState(false)
  const navigate=useNavigate();

  const handleConfirmBooking=()=>{
    setIsProcessingPayment(true)
    setTimeout(()=>{
        setIsProcessingPayment(false)
        setIsBookingConfirmed(true)
        onConfirm()
    }, 4000)
  }
  useEffect(()=>{
    if(isBookingConfirmed){
        navigate("/booking-success")

    }
  }, [isBookingConfirmed, navigate])


    return (
    <div className='card card-body mt-5'>
   <h4> Reservation Summary</h4>
   <p>FullName: <strong>{booking.guestName}</strong></p>     
   <p>Email: <strong>{booking.guestEmail}</strong></p>   
   <p>Check-In Date: <strong>{moment(booking.checkInDate).format("MMMM Do YYYY")}</strong></p>   
   <p>Check-Out Date: <strong>{moment(booking.checkOutDate).format("MMMM Do YYYY")}</strong></p>        
   <p>Number of Days: <strong>{numberOfDays}</strong></p>  
   <p>Payment: <strong className='text text-danger'>${payment}</strong></p>  

   <div>
    <h5>Number of Guests</h5>
    <strong>
        Adult{booking.numberOfAdults > 1 ? "s" : ""} :
        {booking.numberOfAdults}
    </strong>
<div>

    <strong>
        Children: {booking.numberOfChildren}
    </strong>
    </div>

    </div> 


    {  payment > 0 ? (
        <>
        <p> Total Payment :<strong>${payment}</strong></p>

            {isFormValid && !isBookingConfirmed ? (

                <Button variant="success" onClick={handleConfirmBooking}>
                {isProcessingPayment ? (  
                    <>
                    <span 
                    className='spinner-border spinner-border-sm mr-2'
                    role='status'
                    aria-hidden='ture'>

                    </span>
                    Booking Confirmed, redirecting to payment ....                    
                    </>

                ):(
                    "Confirm Booking and proceed to payment"
                )} 

                </Button>
            ) : isBookingConfirmed ?
            (
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='spinner-border text-primary ' role='status'>
                        <span className='sr-only'>Loading</span>
                    </div>
                </div>

            ) : null } 
            </>
    ) : (
        <p className='text-danger'>Check-Out date must be  Check-in date</p>
    )}
</div>
  )
}

export default BookingSummary