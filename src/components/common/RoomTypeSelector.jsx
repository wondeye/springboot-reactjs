import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const[roomTypes, setRoomTypes]=useState([])
    const[showNewRoomTypeInput, setShowNewRoomTypeInput]=useState(false)
    const[newRoomType, setNewRoomTpye]=useState("")

    useEffect(()=>{
        getRoomTypes().then((data)=>{
            setRoomTypes(data)
        })
    },[])
    const handleNewRoomTypeInputChange=(e)=>{
        let value= e.target.value;
        setNewRoomTpye(value);
    }
    const handleAddNewRoomType=(e)=>{
        if(newRoomType!==""){
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomTpye("")
            setShowNewRoomTypeInput(false);
        }
    }
    const handleShowRoomTypeInput=(e)=>{}

  return (
    <>
    {roomTypes.length > 0 && (
        <div>
            <select
            className='form-select'
           
            id="roomType"
            name="roomType"
            value={newRoom.roomType}
            onChange={(e)=>{
                if(e.target.value==="Add New"){
                    setShowNewRoomTypeInput(true)
                }
                else {
                    handleRoomInputChange(e)
                }
            }}>
          <option value={""}>Select a room type</option>
          <option value={"Add New"}>Add New</option>
    {roomTypes.map((type, index)=>(
        <option key={index} value={type}>
            {type}
            </option>))}
            </select>
    {showNewRoomTypeInput && (
        <div className='mt-2'>
            <div className='input-group'>
            <input 
            className='form-control'
            type='text'
            placeholder='Enter a new room type'
            value={newRoomType}
            onChange={handleNewRoomTypeInputChange}
            />
            <button className="btn-hotel" type="button" onClick={handleAddNewRoomType}>
                            Add 
                            </button>

        </div>
        
        </div>
   

)}
</div>
)}
    </>
  )}

export default RoomTypeSelector