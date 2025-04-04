import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function Header() {
   const navigate=useNavigate(); 
   const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/auth/login");
    };

  return (
    <div>
      <header className="header">
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/hotels">Hotels</Link></li>
            <li><Link to="/bookings">Bookings</Link></li>
            <li><button onClick={handleLogout}>Log Out</button></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header