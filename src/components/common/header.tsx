import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

function Header() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username] = useState(localStorage.getItem("username") ?? "User");

  const path = window.location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/auth/login");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div>
      <header className="header">
        <nav>
          <ul>
            {path !== '/home' && (
              <li className='first_link'><Link to="/home">Home</Link></li>
            )}
            {path !== '/destinations' && (
              <li><Link to="/destinations">Destinations</Link></li>
            )}
            {path !== '/hotels' && (
              <li><Link to="/hotels">Hotels</Link></li>
            )}
            {path !== '/bookings' && (
              <li><Link to="/bookings">Bookings</Link></li>
            )}
            <li>
              <div className="user-info" onClick={toggleDropdown}>
                <img src={process.env.PUBLIC_URL + '/images/pfp.png'} alt="User Icon" className="user-icon" />
                <span>{username}</span>
                {dropdownVisible && (
                  <div className="logout-dropdown">
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;