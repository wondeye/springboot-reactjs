import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logout from "../auth/Logout";
import { AuthContext } from "../auth/AuthProvider";
import logo from "./../../assets/images/logo2.jpg"
import { Avatar } from "react-bootstrap";

const NavBar = () => {



  const currentUser= localStorage.getItem("userId")
  const curretnUserFirstletter= currentUser.charAt(0).toUpperCase()
 
  const [showAccount, setShowAccount] = useState(false);

  const { user } = useContext(AuthContext);


const avatarStyle={
  
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#563d7c',
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
};


  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  const isLoggedIn = user !== null;
  const userRole = localStorage.getItem("userRole");

  return (
    <nav className="navbar navbar-expand-lg  bg-body-tertiary bg-gradient p-2 text-white bg-opacity-20 px-5 shadow mt-2 sticky-top">
      <div className="container-fluid">
       <span>   <img src={logo} alt="logo" style={{width:"100px", height:"60px", paddingRight:"10px", alignItems:"center"}}/> </span>
        <Link to={"/"} className="navbar-brand">
          <span className="hotel-color">Lake Mark Hotel</span>
        </Link>
        <button
          className=" navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        

        <div className="collapse navbar-collapse " id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">

           

            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={"/browse-all-rooms"}
              >
                Browse  Rooms
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={"/gallery"}
              >
                Gallery
              </NavLink>
            </li>
         


           
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={"/about-us"}
              >
                AboutUs
              </NavLink>
            </li>
            {isLoggedIn && userRole === "ROLE_ADMIN" && (
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="d-flex navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/find-my-booking"}>
                My Booking
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${
                  showAccount ? "show" : ""
                } `}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={handleAccountClick}
              >
                Account
              </a>
              <ul
                className={`dropdown-menu ${showAccount ? "show" : ""} `}
                aria-labelledby="navbarDropdown"
              >
                {!isLoggedIn ? (
                  <li>
                    <Link to={"/login"} className="dropdown-item">
                      Login
                    </Link>
                  </li>
                ) : (
                  <li>
                    
                    <Logout />
                  </li>
                )}

                {
                  //<li>
                  //<Link to={"/profile"} className="dropdown-item">
                  //Profile
                  //</Link>
                  //</li>
                  //<li>
                  //<Link to={"/logout"} className="dropdown-item">
                  //Logout
                  //</Link>
                }
              </ul>
            </li>
             {currentUser &&  
            <li className="nav-item">
              <NavLink className="nav-link"
               style={avatarStyle}>
                {curretnUserFirstletter} 
              </NavLink>
              </li>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
