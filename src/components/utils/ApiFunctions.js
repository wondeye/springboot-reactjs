import axios from "axios";
export const api=axios.create({
    baseURL:"http://localhost:8080"
})

export function getHeader(){
    const token=localStorage.getItem("token")
    return {
        Authorization : `Bearer ${token}`,
        "Content_Type" : "application/json"
    }
}

export async function addRoom(photo, roomType, roomPrice){
    const formData=new FormData();
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice) 
    const response =await api.post("/rooms/addNewRoom", formData, {
        headers:getHeader()
    })

    return response.status===201 ? true : false;
}

export async function getRoomTypes(){
    try{
const response=await api.get("/rooms/getAllRoomTypes")
return response.data
    }catch(error){
   throw new Error("Error fetching Room Types")
    }
}
export async function getAllRooms(){
    try{
const response=await api.get("/rooms/getAllRooms")      
return response.data
    }catch(error){
   throw new Error("Error fetching Rooms ")
    }
}
 export async function deleteRoom(roomId){
    try{
        const result= await api.delete(`/rooms/deleteRoom/${roomId}`, {headers: getHeader()})
        return result.data
    }catch(error)
    {
        throw new Error(`Error deleting room ${error.message}`)
    }
 }

 export async function updateRoom(roomId, roomData)
 {
    const formData=new FormData();
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice",roomData.price)
    formData.append("photo",roomData.photo)
    const response =await api.put(`/rooms/update/${roomId}`,formData, {headers: getHeader()});
    return response; 
    
 }
 export async function getRoomById(roomId){
    try{
    const result =await api.get(`/rooms/getSingleRoom/${roomId}`)
    return result.data;
    }catch(error){
        throw new Error(`Error fetching room ${error.message}`)
    }}





    
    export async function bookRoom(roomId, booking){
      
       try{
        const response= await api.post(`/bookings/room/${roomId}/booking`, booking)
        console.log(response.data)
        return response.data
        
       }catch(error)
       {
         if(error.response && error.response.data)
            {
                throw new Error(error.response.data)
            } 
            else{
                throw new Error(`Error booking this room ${error.message}`)
            }
       }

    }
    export async function getAllBookings()
    {
        try{
            const result =await api.get("/bookings/all-bookings")
            return result.data;
        }catch(error)
        {
            throw new Error(`Error fetching bookings ${error.message}`)
        }
    }
    export async function getBookingByConfirmationCode(confirmationCode){
        try{
      const result =await api.get(`/bookings/confirmation/${confirmationCode}`) 
      return result.data
        }catch(error)
        {
            if(error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
            throw new Error(`Error finding booking ${error.message}`)
        }
    }
}
 export async function cancelBooking(bookingId)
 {
    try{
        const result=await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    }
    catch(error)
    {
        
            throw new Error(error.message)
      
    }
 }

 export async function getAvailableRooms
 (checkInDate, checkOutDate, roomType) {
    const result=await api.get(`rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
    return result;
    
 }
 export async function registrationUser(registration) {
    try{
        const response= await api.post("/auth/register-user", registration)
        return response.data
    }catch(error)
    {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`User registration error :${error.message}`)
        }
    }
    
 }

 export async function loginUser(login){
    try{
        const response= await api.post("/auth/login", login)
        if(response.status >=200 && response.status<300){
        return response.data}
        else{
           return null}
    }catch(error)
    {
        //console.error(error.message)
        return null
    }
 }
  export async function getUserProfile(userId, token){
    try{
          const response =await api.get(`/users/profile/${userId}`, { headers: getHeader()})
          return response.data


    }catch(error){
        throw error
    }
  }

  export async function deleteUser(userId){
    try{
 const response=await api.delete(`/users/delete/${userId}`, {headers: getHeader() })
 return response.data
 

    }catch(error){
      console.error(error.message)
    }
  }

  export async function getUser(userId, token)
  {
    try{

        const response= await api.get(`/users/${userId}`, {headers: getHeader() })
        return response.data

    } catch(error){
        throw error
    }
  }


  export async function getBookinsByUserId(userId, token)
  {
    try{
        const response =await api.get(`/bookings/user/${userId}/bookings`, {headers: getHeader()}) 
        return response.data
          }catch(error)
          {
              console.error("Error fetching bookings",error.message)
              throw new Error("Failed to fetch bookings")
          }
          
      
    }