import React, { useState } from 'react'

const RoomFilter = ({data, setFilteredData}) => {
    const[filter, setFilter]= useState("")
    const  handelSelectChange =(e)=>{
        const selectedRoomType=e.target.value
        setFilter(selectedRoomType)
        const filteredRooms=data.filter((room)=> room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))
    setFilteredData(filteredRooms)
    }
    const clearFilter=()=>{
        setFilter("");
        setFilteredData(data);
    }
//creats an array of unique rooms from roomtypes using Set
    const roomTypes= ["", ...new Set(data.map((room)=>room.roomType))]
  return (
    <div className='input-group mb-3'>
        <span className='input-group-text' id="room-type-filter">
           Filter rooms by type
        </span>
        <select 
        className='form-select'
        value={filter}
        onChange={handelSelectChange}>
            <option value={""}>Select a room types to filter ...
      
      
            </option>
            {roomTypes.map((type, index)=>(
                <option key={index} value={String(type)}>
                  {String(type)}
                </option>
            ))}
        </select>
        <button className='newbutton' type="button" 
        onClick={clearFilter}>
            Clear Filter
        </button>
    </div>
  )
}

export default RoomFilter