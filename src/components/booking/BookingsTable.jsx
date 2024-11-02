import React, { useEffect, useState } from 'react'
import DateSlider from '../common/DateSlider'
import parseISO from 'date-fns/parseISO'

const BookingsTable = ({bookingInfo, handleBookingCancellation}) => {
  const [filteredBookings, setFilteredBookings]=useState(bookingInfo)

  const filtereBookings=(startDate, endDate)=>{
    let filtered=bookingInfo
    if(startDate && endDate){
      filtered=bookingInfo.filter((booking)=>{
        const bookingStartDate=parseISO(booking.checkInDate)
        const bookingEndDate=parseISO(booking.checkOutDate)
        return bookingStartDate>=startDate && bookingEndDate <=endDate && bookingEndDate >startDate


      })
    }
    setFilteredBookings(filtered)
  }

  useEffect(()=>{
    setFilteredBookings(bookingInfo)
  }, [bookingInfo])

  return (
    <section>
    <DateSlider onDateChange={filtereBookings} 
    onFilterChange={filtereBookings}/>
    <table className='table table-bordered table-hover table-condensed shadow table-sm table-striped'>
      <thead style={{fontSize:"13px"}}>
        <tr>
          <th colSpan={1}>S/N</th>
          <th>Booking ID</th>
          <th>Room Id</th>
          <th>Room Type</th>
          <th>Check-In Date</th>
          <th>Check-Out Date</th>
          <th>Guest Name</th>
          <th>Guest Email</th>
          <th>Adults</th>
          <th>Children</th>
          <th>Total Guest</th>
          <th>Confirmation Code</th>
          <th colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody className=' text-center'>
        {filteredBookings.map((booking, index)=>(
      <tr key={booking.id}>
      <td>{index+1}</td>
      <td>{booking.id}</td>
      <td>{booking.room.id}</td>
      <td>{booking.room.roomType}</td>

     <td>{booking.checkInDate}</td>
 <td>{booking.checkOutDate}</td>
 <td>{booking.guestFullName}</td>
 <td>{booking.guestEmail}</td>
 <td>{booking.numberOfAdults}</td>
 <td>{booking.numberOfChildren}</td>
 <td>{booking.totalNumberOfGuests}</td>
 <td>{booking.bookingConfirmationCode}</td>
<td>
  <button className='btn btn-danger btn-sm' 
  onClick={()=>handleBookingCancellation(booking.id)}>Cancel</button>
</td>


</tr>


        ))}
       
      </tbody>
    </table>

{filtereBookings.length === 0 && <p>No booking found for selected dates</p>}

    </section>
  )
}

export default BookingsTable