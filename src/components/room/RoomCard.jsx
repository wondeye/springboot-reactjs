import React from 'react'
import { Col, Card } from 'react-bootstrap'
import {Link}  from "react-router-dom";


const RoomCard = ({room}) => {
  return (
    <Col key={room.id} className='mb-4' xs={12}>
    <Card className='container'>
        <Card.Body className='d-flex flex-wrap aligh-items-center  '>
         <div className='flex-shrink-0 mr-3 mb-3 mb-md-0'>

         <Link to ={`/book-room/${room.id}`}>

           <Card.Img
            variant='top'
            src={`data:image/png;base64, ${room.photo}`}
            alt="Room Photo"
            style={{width:"100%", maxWidth:"250px", height:"auto", borderRadius:"0px"}}/>
                 </Link>

            </div>

            <div className='flex-grow-1 ml-3 px-5'>
                <Card.Title ><span className="hotel-color"> {room.roomType}</span></Card.Title>
                <Card.Title><span className="room-price">${room.price}/night</span></Card.Title>
                <Card.Text>Some room information goes her for the guest to read through</Card.Text>

            </div>
            <div className='flex-shrink-0 mt-3'>
           <Link to ={`/book-room/${room.id}`} className=" newbutton "  type='button'>
             View/Book Now
          </Link>            
          </div>
        </Card.Body>
    </Card>
    </Col>
  )
}

export default RoomCard