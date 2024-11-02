import React from 'react'
import I1 from "./../../assets/images/e1.jpg";
import I2 from "./../../assets/images/e2.jpg";
import I3 from "./../../assets/images/e3.jpg";
import I4 from "./../../assets/images/e4.jpg";
import IV1 from "./../../assets/images/carousel/vedeo1.mov";

import I5 from "./../../assets/images/e5.jpg";
import I6 from "./../../assets/images/e6.jpg";

import I7 from "./../../assets/images/e7.jpg";
import I8 from "./../../assets/images/e8.jpg";
import I9 from "./../../assets/images/e9.jpg";
import I10 from "./../../assets/images/e10.jpg";
//import I11 from "./../../assets/images/e11.jpg";


import "./carousel.css"
import Carousel from './Carousel';
import { Container, Row, Col } from 'react-bootstrap';
const CraouselView = () => {
    const slides = [
        {id: 1, imgSrc: I1},
        {id: 2, imgSrc: I2},
        {id: 3, imgSrc: I3},
        {id: 4, imgSrc: I4},
        {id: 5, imgSrc: I5},
        {id: 6, imgSrc: I6},
        {id: 7, imgSrc: I7},
        {id: 8, imgSrc: I8},
        {id: 9, imgSrc: I9},
        {id: 10, imgSrc: I10},
];
  return (
    
      <div className="container tw-overflow-hidden  "> 
      
      <Carousel autoSlide={true} autoSlidesInterval={3000}>
         {[...slides.map((items)=>
         <img src={items.imgSrc}    />        
         ),
         ]}
     </Carousel>
 
   </div>
      
    


  )
}

export default CraouselView