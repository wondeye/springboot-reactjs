import React from 'react'
import { FaClock, FaCocktail, FaGlobe, FaFacebook, FaGoogle, FaInstagram, FaParking, FaPhone, FaSnowflake, FaTshirt, FaTwitter, FaUtensils, FaWifi } from "react-icons/fa";


const Header = () => {
  return (
    <div className='nav  mt-2 mb-2  p-2 text-white bg-opacity-25 justify-content-center ' style={{backgroundColor:"#2f4f4f"}}>

      <span>   <FaPhone />&nbsp;&nbsp;+251965231478   &nbsp;&nbsp;&nbsp;
      <FaGlobe/>&nbsp; www.lakemarkhotel.com &nbsp;&nbsp;&nbsp;
     
      <FaTwitter/> Twitter &nbsp;&nbsp;&nbsp; <FaFacebook/> &nbsp;Facebook &nbsp;&nbsp;&nbsp; <FaGoogle/>&nbsp;&nbsp;lakemarkhotel@gmail.com</span>






    </div>
  )
}

export default Header