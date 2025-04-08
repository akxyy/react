import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../common/header';
import Footer from '../common/footer';

const Booking: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(savedBookings);
  }, []);

  const location = useLocation();
  const {
    name,
    phone,
    hotelName,
    checkInDate,
    checkInTime,
    checkOutDate,
    checkOutTime,
    totalPrice,
    duration,
    bookingStatus
  } = location.state || {};

  return (
    <div>
      <Header />
      <div className="maindiv">
        <h1>Booking Confirmation</h1>
        {location.state && (
          <div className="booking-details">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Hotel Name:</strong> {hotelName}</p>
            <p><strong>Check-In:</strong> {checkInDate} at {checkInTime}</p>
            <p><strong>Check-Out:</strong> {checkOutDate} at {checkOutTime}</p>
            <p><strong>Duration:</strong> {duration} day{duration > 1 ? 's' : ''}</p>
            <p><strong>Total Price:</strong> ${totalPrice}</p>
            <p>Your booking status is: <strong>{bookingStatus}</strong></p>
          </div>
        )}

        <h2>Previous Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <ul>
            {bookings.map((booking, index) => (
              <li key={index}>
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Hotel Name:</strong> {booking.hotelName}</p>
                <p><strong>Check-In:</strong> {booking.checkInDate} at {booking.checkInTime}</p>
                <p><strong>Check-Out:</strong> {booking.checkOutDate} at {booking.checkOutTime}</p>
                <p><strong>Duration:</strong> {booking.duration} day{booking.duration > 1 ? 's' : ''}</p>
                <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                <p>Your booking status is: <strong>{booking.bookingStatus}</strong></p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Booking;