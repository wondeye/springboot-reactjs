import React, { useState } from "react";

import I1 from "./../../assets/images/a1.webp";
import I2 from "./../../assets/images/a2.jpg";
import I3 from "./../../assets/images/p1.jpg";
import I4 from "./../../assets/images/a4.jpg";
import I5 from "./../../assets/images/a5.webp";
import I6 from "./../../assets/images/a6.jpg";
import { Card, Container } from "react-bootstrap";
import {  FaWindowClose } from "react-icons/fa";
import {  } from "react-icons/fa";
import CraouselView from "./CraouselView";


import "./gallery.css"
import Carousel from "./Carousel";



const images = [
  {
    id: 1,
    imgSrc: I1,
  },
  {
    id: 2,
    imgSrc: I2,
  },
  {
    id: 3,
    imgSrc: I3,
  },
  {
    id: 4,
    imgSrc: I4,
  },
  {
    id: 5,
    imgSrc: I5,
  },
  {
    id: 6,
    imgSrc: I6
  }
];


const Gallery = () => {
  const[model, setModel]=useState(false)
  const[tempImgSrc, setTempImgSrc]=useState("")

  const getImage=(imgSrc)=>{
   setTempImgSrc(imgSrc);
   setModel(true);
  }
  return (
    <>  
    
    <Container className="container mt-3 mb-4 " >
      
      
      <CraouselView/>
      <h2 className="text-center mt-5  p-2  "style={{color:"#d3a15a"}}> 
        <span className=" btn-lg p-6" style={{backgroundColor:"", color:"orange", padding:"6px"}}>Photo Gallery </span>
                                                                     </h2>
       
         
         <div className="container shadow" >


        
       <p className="text-center text-tertiary" style={{fontSize:"18px", color:"#333"}}>Discover the charm of Hotel Lake Mark through our photo gallery.</p>
        <p className="text-center" style={{fontSize:"17px", color:"#444"}}> Immerse yourself in the luxurious atmosphere and 
         experience the beauty for yourself—each image captures the elegance 
         and </p><p className="text-center"style={{fontSize:"16px", color:"#555"}}>warmth that makes our hotel a perfect getaway.</p> </div>
     

      <div className={ model ? "model open" : "model"}>
      <img src={tempImgSrc}/>
      <FaWindowClose onClick={()=>{setModel(false)}}/>
    </div>
         <div className="gallery mt-3">  


            {
              images.map((items, index)=>{
                return(
                  <div key={index} className="pics" onClick={()=>getImage(items.imgSrc)}>
                  <img src={items.imgSrc} alt="cannot be found"  
                  style={{width:"100%",  height:"auto", borderRadius:"0px"}}/></div>
                )
              })
            }
           
           </div>

     
      </Container>
  
      </>
  );
};

export default Gallery;
