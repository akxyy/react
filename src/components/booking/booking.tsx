import React, { useEffect, useState } from 'react';
import "./booking.css";
import { apiRequest } from '../helpers/helperFunction';

const Booking: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await apiRequest('/booking', "GET", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-container">
      <h2 className="title">Your Bookings</h2>
      <div className="booking-list">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul>
            {bookings.map((booking, index) => (
              <li key={booking.id} className="booking-item">
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Hotel:</strong> {booking.hotel_name}</p>
                <p><strong>Check-In:</strong> {booking.checkin}{booking.checkInTime ? ` at ${booking.checkInTime}` : ''}</p>
                <p><strong>Check-Out:</strong> {booking.checkout}{booking.checkOutTime ? ` at ${booking.checkOutTime}` : ''}</p>
                <p><strong>Duration:</strong> {booking.duration} days</p>
                <p><strong>Total:</strong> ${booking.Price}</p>
                <p><strong>Status:</strong> {booking.bookingStatus || 'Confirmed'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Booking;