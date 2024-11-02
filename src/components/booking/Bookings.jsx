import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions'
import BookingsTable from './BookingsTable'
import Header from './../common/Header.jsx'

const Bookings = () => {
  const[bookingInfo, setBookingInfo]=useState([])
  const[isLoading, setIsLoading]=useState(true)
  const[error, setError]=useState("")
  const{roomId}=useParams()


  useEffect(()=>{
    setTimeout(()=>{getAllBookings().then((data)=>{
      setBookingInfo(data)
      setIsLoading(false)
    }).catch((error)=>{
      setError(error.message)
      setIsLoading(false)
    })
  },1000) 

  },[])

  const handleBookingCancellation=async(bookingId)=>{
    try{
      await cancelBooking(bookingId)
      const data=await getAllBookings()
      setBookingInfo(data)
    }catch(error){
      setError(error.message)
    }
  }
  return (
    <section className='container' style={{backgroundColor:"whitesmoke"}}>
    <Header title={"Existing Bookings"}/>
    {error && (<div className='text-danger'>{error}</div>)}
    {isLoading ? (<div>
      Loading Existing Bookings ....
      
    </div>) :(
      <BookingsTable bookingInfo={bookingInfo}
      handleBookingCancellation={handleBookingCancellation}/>
    )}



    </section>
  )
}

export default Bookings