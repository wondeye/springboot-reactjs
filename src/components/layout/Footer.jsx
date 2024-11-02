import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './footer.css'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className='footer2 shadow'  style={{ backgroundColor: '#2f4f4f', color:"white",padding: '20px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Discover luxury accommodations and world-class services at our hotel.</p>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Email: info@hotel.com</li>
              <li>Phone: +1 (234) 567-890</li>
              <li>Address: 123 Hotel St, City, Country</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#" className='text-white p-2'><FaFacebook/>Facebook</a>
              </li>
              <li className="list-inline-item">
                <a href="#"  className='text-white p-2'><FaTwitter/>Twitter</a>
              </li>
              <li className="list-inline-item">
                <a href="#"  className='text-white p-2' ><FaInstagram/>Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; {new Date().getFullYear()} Hotel Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


