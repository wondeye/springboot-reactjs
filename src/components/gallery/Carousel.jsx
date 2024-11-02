import React, { useEffect, useState } from 'react'
import {  FaArrowLeft, FaArrowCircleRight, FaArrowRight, FaChevronLeft, FaChevronRight, FaArrowCircleLeft } from "react-icons/fa";
const Carousel = ({children : slides, autoSlide=false ,autoSlidesInterval=5000}) => {
  const[curr, setCurr]=useState(0)
 
  const prev=()=>{
    setCurr((curr)=>(curr===0 ? slides.length-1 : curr-1))
  }

  const next=()=>{
    setCurr((curr)=>(curr===slides.length-1 ? 0 : curr+1))
  } 

  useEffect(()=>{
    if(!autoSlide) return
    const slideInterval=setInterval(next, autoSlidesInterval)
    return ()=>clearInterval(slideInterval)
  },[])
  return (
    <div className=' tw-relative tw-overflow-hidden ' >
   
        <div className='tw-flex tw-transition-transform tw-ease-out tw-duration-500' style={{transform:`translateX(-${curr*100}%)`}}>{slides}</div>
        <div className='tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-between tw-p-4'>
            <button onClick={prev}className='tw-p-2 tw-rounded-full   tw-border-inherit tw-border-none tw-text-gray-800 tw-hover:tw-bg-white' ><FaArrowLeft    /></button>
            <button onClick={next} className='tw-p-2 tw-rounded-full tw-border-none tw-bg-white/80 tw-text-gray-800 tw-hover:tw-bg-white'><FaArrowRight  /></button>
        </div>
        <div className='tw-absolute tw-bottom-4 tw-left-0 tw-right-0'>
          <div className='tw-flex tw-justify-center tw-gap-2 tw-items-center'>
           {slides.map((_, i)=>(
            <div className={`tw-transition-all tw-w-3 tw-h-3 tw-bg-white tw-rounded-full ${curr===i ? "tw-p-2" : "tw-bg-opacity-50"}`}/>
           ))}
          </div>
        </div>
    </div>
  )
}

export default Carousel