import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Destinations from "./components/destinations/Destinations"
import Hotels from './components/hotels/Hotels';
import Booking from './components/booking/booking'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/destinations' element={<Destinations/>}/>
        <Route path='/hotels' element={<Hotels/>}/>
        <Route path='/bookings' element={<Booking/>}/>
      </Routes>
    </Router>
  );
};

export default App;