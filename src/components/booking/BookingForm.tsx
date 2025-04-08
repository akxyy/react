import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BookingForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hotelName = location.state?.hotelName || '';
  const pricePerNight = location.state?.pricePerNight || 0;

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [checkInTime, setCheckInTime] = useState<string>("");
  const [checkOutTime, setCheckOutTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateDurationAndPrice = () => {
    const checkIn = new Date(`${checkInDate}T${checkInTime}`);
    const checkOut = new Date(`${checkOutDate}T${checkOutTime}`);
    const durationInMillis = checkOut.getTime() - checkIn.getTime();
    const durationInDays = Math.ceil(durationInMillis / (1000 * 3600 * 24));

    if (durationInDays > 0) {
      setDuration(durationInDays);
      setTotalPrice(durationInDays * pricePerNight);
    } else {
      setDuration(0);
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    if (checkInDate && checkOutDate && checkInTime && checkOutTime) {
      calculateDurationAndPrice();
    }
  }, [checkInDate, checkOutDate, checkInTime, checkOutTime]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newBooking = {
      name,
      phone,
      hotelName,
      checkInDate,
      checkInTime,
      checkOutDate,
      checkOutTime,
      totalPrice,
      duration,
      bookingStatus: "Completed",
    };

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    navigate("/bookings", { state: newBooking });
  };

  return (
    <div className="maindiv">
      <h1>Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Hotel Name:</label>
          <input type="text" value={hotelName} disabled />
        </div>

        <div>
          <label>Check-In Date:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Check-In Time:</label>
          <input
            type="time"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Check-Out Date:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Check-Out Time:</label>
          <input
            type="time"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Duration (Days):</label>
          <input type="number" value={duration} disabled />
        </div>

        <div>
          <label>Total Price:</label>
          <input type="number" value={totalPrice} disabled />
        </div>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;