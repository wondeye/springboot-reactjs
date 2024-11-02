import axios from "axios";
export const api=axios.create({
    baseURL:"http://localhost:8080"
})

export async function bookRoom2(roomId, booking){
        
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