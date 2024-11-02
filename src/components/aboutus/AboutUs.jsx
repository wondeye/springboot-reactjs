import React from 'react';
import I1 from "./../../assets/images/a1.webp";
import I2 from "./../../assets/images/e2.jpg";
import I3 from "./../../assets/images/e3.jpg";



import './AboutUs.css'; // Import custom CSS

const AboutUs = () => {

   const headerStyle={
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '700',
    fontSize: '2.5rem',
    color: '#555',
    marginBottom: '1rem',
    textAlign: 'center'
   };

  return (
    <div className="about-us-section py-5">
      <div className="container">
        <p style={headerStyle}>About Us</p>
        <div className="row align-items-center">
          <div className="col-md-6">
            <img 
              src={I1} 
              alt="Hotel" 
              className="img-fluid rounded shadow" 
            />
          </div>
          <div className="col-md-6 text-gray   border-0">
            <h3 style={{color:'orange'}}>Welcome to Lake Mark Hotel</h3>
            <p className=' rounded p-2  wrap text-secondary fts'>
              Located in the heart of the city, our hotel offers a perfect blend of comfort and luxury.
              With beautifully designed rooms, modern amenities, and exceptional service, we aim to make
              your stay unforgettable.
            </p>
            <h4 style={{color:'orange'}}>Our Mission</h4>
            <p className=' p-2  wrap text-secondary'>
              Our mission is to provide our guests with a unique experience that combines elegance and
              comfort. We strive to create a home away from home for all our visitors.
            </p>
            <h4 style={{color:'orange'}}>Why Choose Us?</h4>
            <ul className=' p-2 text-secondary'>
              <li>Luxurious Accommodations</li>
              <li>Friendly and Professional Staff</li>
              <li>Prime Location</li>
              <li>Exceptional Dining Options</li>
              <li>World-Class Amenities</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <a href="/contact" className="btn btn-sm border border-dark">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

