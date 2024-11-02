import React from 'react'
import { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelector'

import {Link} from "react-router-dom"


const AddRoom = () => {
    const[newRoom, setNewRoom]=useState({
        photo:"", 
        roomType:"", 
        roomPrice:""
    })
    const[imagePreview, setImagePreview]=useState("")
    const[successMessage, setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage]=useState("")


    const handleRoomInputChange=(e)=>{
        const name=e.target.name;
        let value= e.target.value;
        if(name==="roomPrice")
        {
        if(!isNaN(value)){
            value=parseInt(value)
        }else{
            value=""
        }
        }
        setNewRoom({...newRoom, [name]: value})
    }

    const handleImageChange=(e)=>{
        const selectedImage=e.target.files[0];
        setNewRoom({ ...newRoom, photo: selectedImage });

        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        try{
      const success= addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
      if(success!==undefined){

        setSuccessMessage("A new room is added succesfully!")
        setTimeout(()=>{setSuccessMessage("")},
          4000)
        setNewRoom({photo:null, roomType:"", roomPrice:""})
        setImagePreview("")
        setErrorMessage("")
      }else {
        setErrorMessage("Error adding room")
      }
        }catch(error)
        {
            setErrorMessage(error.message)

        }
    }
  return (
    <>
    <section className="container, mt-5 mb-5">
        <div className='row justify-content-center'>
            <div className='col-md-8 col-lg-6'>

                <h2 className='mt-5 mb-3 hotel-color' ><b>Add a New Room</b></h2>
                <form onSubmit={handleSubmit}>
                  <div className='mb-1 mt-2'>
                    <label htmlFor="roomType" className='form-label hotel-label '>Room Type</label>

                  </div>
                  <div>
                    <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} 
                    newRoom={newRoom} />
                  </div>
                  <div className='mb-2 mt-3'>
                    <label htmlFor="roomPrice" className='form-label hotel-label'>Room Price</label>
                    <input className='form-control' 
                    required
                    id="roomPrice"
                    name="roomPrice"
                    type='number'
                    value={newRoom.roomPrice}
                    onChange={handleRoomInputChange}/>
                    
                  </div>
                  <div className='mb-2 mt-3'>
                    <label htmlFor="roomPhoto" className='form-label hotel-label'>Room Photo</label>
                    <input className='form-control' 
                    required
                    id="photo"
                    name="photo"
                    type='file'
                    onChange={handleImageChange}/>
                  {imagePreview && (
                    <img src={imagePreview} alt='Preview Room Photo' style={{maxWidth:"400px", maxHeight:"400px"}} className="mb-3"/>
                  )}  
                  </div>
                  <div className="d-grid d-md-flex mt-2">
                  <Link to="/existing-rooms" className="btn btn-secondary ml-1">Back</Link>
                    <span className='px-1'><button className=" newbutton ">
                        Save Room
                    </button> </span>

                  </div>
                  {successMessage && <p className='alert alert-success'>{successMessage}</p>}

                </form>
              
            </div>
        </div>
    </section>
    </>
  )
}

export default AddRoom