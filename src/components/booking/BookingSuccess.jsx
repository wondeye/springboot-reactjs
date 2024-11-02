import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../common/Header'

const BookingSuccess = () => {

    const location=useLocation()

    const message2=location.state?.message
    const error=location.state?.error
    

  return (
   
    <div className='container'>
     <Header title="Booking success Message"  />
      <div className='mt-5'> { message2 ? (
          <div>
            <h3 className='text-success'>Booking Success !</h3>
            <h5 className='text-success'> {message2} </h5>
            
            </div>
        ):(
          <div>
            <h3 className='text-danger'>Booking error </h3>
            <p className='text-danger'>{error}</p>
           
          </div>

        )}
      </div>
         
        </div>
  )
}

export default BookingSuccess