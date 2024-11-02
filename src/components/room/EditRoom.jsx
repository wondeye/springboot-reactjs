import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions'
import { useParams } from 'react-router'
import RoomTypeSelector from '../common/RoomTypeSelector'
import {Link} from "react-router-dom"



const EditRoom = () => {

  const[room, setRoom]=useState({
    photo:"", 
        roomType:"", 
        price:""
   
})
  const[imagePreview, setImagePreview]=useState("")
    const[successMessage, setSuccessMessage]=useState("")
    const[errorMessage, setErrorMessage]=useState("")
    
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
    
    
   

   

    const handleImageChange=(e)=>{
      const selectedImage=e.target.files[0];
      setRoom({ ...room, photo: selectedImage });
      //console.log("Selected image:", selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage));
      
  }

    const handleInputChange= (e)=>{
       const{name, value}=e.target;
       //const name=e.target.name;
       //const value=e.target.value;
       
        setRoom({...room, [name]: value})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
    try{
      const response=await updateRoom(roomId, room);

      if(response.status===200){
        setSuccessMessage("Room updated successfuly");
        const updatedRoomData=await getRoomById(roomId)
        setRoom(updatedRoomData);
        setImagePreview(updatedRoomData.photo)
        setErrorMessage("")
      }else {
        setErrorMessage("Error updating  room")
      }
        }catch(error)
        {   console.error(error)
            setErrorMessage(error.message)

        }
    }

    return (
        <>
        <section className="container, mt-5 mb-5">
            <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                    <h2 className='mt-5 mb-2'>Edit Room</h2>
                    {successMessage &&(
                      <div className='alert alert-success' role='alert'>{successMessage}</div>
                    )}
                     {errorMessage &&(
                      <div className='alert alert-danger' role='alert'>{errorMessage}</div>
                    )}
                    <form onSubmit={handleSubmit}>
                      <div className='mb-3'>
                        <label htmlFor="roomType" className='form-label'>Room Type</label>
    
                      </div>
                      <div>
                        <RoomTypeSelector handleRoomInputChange={handleInputChange} 
                        newRoom={room} />
                      </div>
                      <div className='mb-3'>
                        <label htmlFor="roomPrice" className='form-label'>Room Price</label>
                        <input className='form-control' 
                        required
                        id="price"
                        name="price"
                        type='number'
                        value={room.price}
                        onChange={handleInputChange}/>
                        

                       


                      </div>
                      <div className='mb-3'>
                        <label htmlFor="roomPhoto" className='form-label'>Room Photo</label>
                        <input 
                        className='form-control' 
                        required
                        id="photo"
                        name="photo"
                        type='file'
                        onChange={handleImageChange}/>
                        {imagePreview && (
                        <img 
                           src={`data:image/jpeg;base64,${imagePreview}`} 
                           alt='Preview Room Photo'
                           style={{maxWidth:"400px", maxHeight:"400px"}}
                           className="mb-3"/>
                      )}  
                      </div>
                      <div className="d-grid gap-2 d-md-flex mt-2">
                      <Link to={"/existing-rooms"} className="btn btn-secondary ml-5"> 
                      back
                      </Link>
                     
                        <button type="submit" className="btn btn-primary">
                            Edit Room
                        </button>
                      </div>
                    </form>
                </div>
            </div>
        </section>
        </>
      )
    }


export default EditRoom