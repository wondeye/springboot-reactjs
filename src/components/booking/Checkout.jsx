import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { useParams } from 'react-router'
import { getRoomById } from '../utils/ApiFunctions'
import RoomCarousel from './../common/RoomCarousel.jsx'

import { FaCar, FaParking, FaTshirt, FaUtensils, FaWifi, FaWineGlass, FaTv } from 'react-icons/fa'

const Checkout = () => {
  const[error, setError]=useState("")
  const[isLoading, setIsLoading]=useState(false)
  const{roomId}=useParams()
const[roomInfo, setRoomInfo]=useState({
  photo:"",
  roomType:"",
  price:""
})
useEffect(()=>{
  setTimeout(()=>{
    getRoomById(roomId).then((response)=>{
      setRoomInfo(response)
      setIsLoading(false)
    }).catch((error)=>{
      setError(error)
      setIsLoading(false)
    })
  },2000)
}, [roomId])
  return (
    <>
<section className='container'>
  <div className='row flex-column flex-md-row align-items-center'>
  <div className='col-md-4 mt-5 mb-5'>
  {isLoading ? (

    <p>Loading room information</p>
  ) : error ? (
    <p>{error}</p>
  ):(

    <div className='room-info'>
      <img
      src={`data:image/png;base64, ${roomInfo.photo}`}
      alt='Room Photo'
      style={{width : "100%", height : "200px"}}
      
      
      />
        <table className='table table-bordered'>
          <tbody>
            <tr>
              <th>
                Room Type :
              </th>
              <th>{roomInfo.roomType}</th>
            </tr>
            <tr>
              <th>
                Room Price :
              </th>
              <th>${roomInfo.price}</th>
            </tr>
            <tr>
            <th>
                Room Service:
              </th>
              <td>
            <ul className="list-group list-group-flush">
           <li  className="list-group-item" ><FaWifi beat style={{color: 'blue'}} /><span className='ml-2' > Wifi </span></li>
           <li className="list-group-item" ><FaTv style={{color: 'red'}} /><span className='m-2'>Netflix Premium</span> </li>
           <li className="list-group-item" ><FaUtensils style={{color: 'orange'}}/><span className='m-2'>Breakfast</span> </li>
           <li className="list-group-item" ><FaWineGlass style={{color: 'indigo'}}/><span className='m-1'>Mini bar refreshement </span></li>
           <li className="list-group-item" ><FaCar style={{color: 'silver'}}/><span className='m-2'>Car Service</span> </li>
           <li className="list-group-item" ><FaParking/><span className='m-2'>Parking Space</span> </li>
           <li className="list-group-item" ><FaTshirt style={{color: 'green'}}/><span className='m-2'>Laundary Service </span> </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      

      </div>
  ) }
  </div>
  <div className='col mb-5'>
   <BookingForm/>
  </div>
  </div>
  
</section>
<div>
  <RoomCarousel/>
</div>

    </>
  )
}

export default Checkout