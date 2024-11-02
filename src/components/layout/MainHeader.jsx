import React from "react";
import { Link, NavLink } from "react-router-dom";

const MainHeader = () => {
  return (
    <header className="header-banner">
      <div className="overlay">
        <div className="animated-texts overlay-content">
          <h1>
            Welcome to <span className="hotel-label">Lake Mark </span>
            <span>Hotel</span>
          </h1>
          <h4>Experience the Best Hospitality in Town</h4>

          <div>
        <ul className="navbar-nav nav-pills nav-fill ">
            <li className="nav-item ">
              <NavLink
                className="nav-link active text-white p-2 mt-2"
                style={{backgroundColor:"orange", }}
                aria-current="page"
                to={"/browse-all-rooms"}
              >
              
                 <h5> Book Now </h5> 
              </NavLink>{" "}
            </li>{" "}
          </ul>
        </div>
        </div>
        
      </div>
    </header>
  );
};

export default MainHeader;
