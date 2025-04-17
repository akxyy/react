import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../login/Login';
import Home from '../home/Home';
import Destinations from "../destinations/Destinations";
import Hotels from '../hotels/Hotels';
import Booking from '../booking/booking';
import NotFound from '../NotFound/NotFound';
import BookingForm from '../booking/BookingForm';
import HotelsOfDestination from '../destinations/HotelsOfDestination';

function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="*" element={<NotFound/>}/>
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path='/hotel-details' element={<HotelsOfDestination/>}/>
      </Routes>
    </Router>
  );
}

export default Routers;