import "./App.css";
import AddRoom from "./components/room/AddRoom";
import EditRoom from "./components/room/EditRoom";

import Home from "./components/home/Home.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import ExistingRooms from "./components/room/ExistingRooms.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer.jsx";
import NavBar from "./components/layout/NavBar.jsx";
import NavBar2 from "./components/layout/NavBar2.jsx";
import RoomListing from "./components/room/RoomListing.jsx";
import Admin from "./components/admin/Admin.jsx";
import Checkout from "./components/booking/Checkout.jsx";
import BookingSuccess from "./components/booking/BookingSuccess.jsx";
import Bookings from "./components/booking/Bookings.jsx";
import FindBooking from "./components/booking/FindBooking.jsx";
import Registration from "./components/auth/Registration.jsx";
import Profile from "./components/auth/Profile.jsx";
import Logout from "./components/auth/Logout.jsx";
import Login from "./components/auth/Login.jsx";

import AuthProvider from "./components/auth/AuthProvider.jsx";
import RequireAuth from "./components/auth/RequireAuth.jsx";
import Header from "./components/layout/Header.jsx";
import Gallery from "./components/gallery/Gallery.jsx";
import CraouselView from "./components/gallery/CraouselView.jsx";
import Slick from "./components/gallery/Slick.jsx";
import AboutUs from "./components/aboutus/AboutUs.jsx";




function App() {
  return (
    <AuthProvider>
     
      <main className="maincontainer">
        <Router>
          <Header/>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/browse-all-rooms" element={<RoomListing />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/book-room/:roomId"
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              }
            />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/existing-bookings" element={<Bookings />} />
            <Route path="/find-my-booking" element={<FindBooking />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/crousel" element={<CraouselView />} />
            <Route path="/slick" element={<Slick />} />

            <Route path="/about-us" element={<AboutUs/>} />
           


            
          </Routes>
         
        </Router>
        

        <Footer/>
        

      </main>
 

    </AuthProvider>
  );
}

export default App;
