import React,{useState, useEffect} from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions'
import { useParams } from 'react-router'
import RoomTypeSelector from '../common/RoomTypeSelector'
import {Link} from "react-router-dom"
const roomId=1

const EditRoom2 = () => {
    
    const[room, setRoom]=useState([])
    const[imagePreview, setImagePreview]=useState("")
    const{roomId}=useParams()

    useEffect(()=>{
      const fetchRooms=async()=>{
          try {
              const roomData=await getRoomById(roomId);
              setRoom(roomData)
              setImagePreview(roomData.photo)
          }catch(error)
          {
               console.error(error)
          }
      }
      fetchRooms()
  }, 
  [roomId])

  console.log(room.roomPrice)

  return (
    <section className="container, mt-5 mb-5">
                    <h2 className='mt-5 mb-2'>Edit Room</h2>
                   
                    
                    <form>
                        <label htmlFor="roomType" className='form-label'>Room Type</label>
                        <input className='form-control' 
                        required
                        id="roomType"
                        name="roomType"
                        value={room.roomType} />
    
                      
                        <h2 htmlFor="roomPrice" className='form-label'>Room Price</h2>
                        <input className='form-control' 
                        required
                        id="roomPrice"
                        name="roomPrice"
                        type='number'
                        value={room.roomPrice}
                        />
                        
                      
                    
                    </form>
        </section>
  )
}

export default EditRoom2