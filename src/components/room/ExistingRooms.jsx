import React, { useEffect, useState } from 'react'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import {Col, Row} from 'react-bootstrap'
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions'
import { FaEdit, FaEye, FaTrashAlt, FaPlus } from 'react-icons/fa'
import {Link} from "react-router-dom"

const ExistingRooms = () => {
   const[rooms, setRooms]=useState([])
   const[currentPage, setCurrentPage]  =useState(1)
   const[roomsPerPage]=useState(8)
   const[isLoading, setIsLoading]=useState(false)
   const[filterdRooms, setFilteredRooms]=useState([])
   const[selectedRoomTypes, setSelectedRoomTypes]=useState("")
   const[successMessage, setSuccessMessage]=useState("")
   const[errorMessage, setErrorMessage]=useState("")
 
useEffect(()=>{
    fetchRooms()
}, 
[])


const fetchRooms=async()=>{
    setIsLoading(true)
    try {
        const result=await getAllRooms();
        setRooms(result)
        setIsLoading(false)
    }catch(error)
    {
         setErrorMessage(error.message)
    }
}

useEffect(()=>{
    if(selectedRoomTypes === ""){
    setFilteredRooms(rooms);
}else {
    const fileterd=rooms.filter((room) => room.roomType === selectedRoomTypes )
    setFilteredRooms(fileterd)
} 
    setCurrentPage(1)},
[rooms, selectedRoomTypes]
)

const calculateTootalPages=(filterdRooms, roomsPerPage, rooms)=>{
    const totalRooms=filterdRooms.length > 0 ? 
    filterdRooms.length : rooms.length
    return Math.ceil(totalRooms/ roomsPerPage)
}


const indexOfLastRoom=currentPage * roomsPerPage
const indexOfFirstRoom=indexOfLastRoom-roomsPerPage
const currentRooms=filterdRooms.slice(indexOfFirstRoom, indexOfLastRoom)

const handlePaginationsClick=(pageNumber)=>{
  setCurrentPage(pageNumber)
}


const handelDelete=async(roomId)=>{
    try{

         const result= await deleteRoom(roomId);
         if(result === ""){
            setSuccessMessage(`Room No ${roomId} was deleted`)
            fetchRooms()
         }
         else {
            console.error(`Error deleting room : ${result.message}`)
         }
    }catch(error)
    {
        setErrorMessage(error.message)
    }
    setTimeout(()=>{
        setSuccessMessage("")
        setErrorMessage("")
    }, 3000)
     
}
   return (
    <>
    {isLoading ? (<p>Loading existing rooms</p>) : 
    ( 

    <section className='mt-5 mb-5 container '>
        <div className='d-flex justify-content-between mb-3 mt-5'
       >
        <h2>Existing Rooms</h2>
        

       </div>
       <Row>
        
       <Col md={6} className='mb-3 mb-md-0'>

       <RoomFilter data={rooms} 
       setFilteredData={setFilteredRooms} />
       </Col>
       <Col md={6} className='d-flex justify-content-end'>
        <Link to={"/add-room"}><FaPlus/>Add New Room</Link>
        </Col>
       </Row>

      
       <table className='table table-bordered table-hover'>
        <thead>
            <tr className='text-center'>
                <th>ID</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Actions</th>

            </tr>
        </thead>
        <tbody>
            {currentRooms.map((room)=>(
                <tr key ={room.id} className='text-center'>
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.price}</td>
                    <td className='gap-2' >
                     
                   <Link to={`/edit-room/${room.id}`}>

                    <span className='btn btn-info btn-sm'><FaEye/></span>
                    <span className='btn btn-warning btn-sm'><FaEdit/></span>
                    </Link>

                    <button className='btn btn-danger btn-sm' onClick={()=>handelDelete(room.id)}>
                        
                        <FaTrashAlt/></button>

                    </td>
                </tr>
            ))}
        </tbody>
       </table>
       <RoomPaginator currentPage={currentPage} 
       totalPages={calculateTootalPages(filterdRooms, roomsPerPage, rooms)} 
       onPageChange={handlePaginationsClick} />
       
    </section>
    ) }
    </>
  )
}

export default ExistingRooms