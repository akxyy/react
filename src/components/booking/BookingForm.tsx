import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../helpers/helperFunction";
import "./BookingForm.css";

const BookingForm: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { hotelName = "", pricePerNight = 0 } = location.state

  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    checkInTime: "",
    checkOutTime: "",
    duration: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    if (
      formData.checkInDate &&
      formData.checkOutDate &&
      formData.checkInTime &&
      formData.checkOutTime &&
      pricePerNight > 0
    ) {
      const checkIn = new Date(
        `${formData.checkInDate}T${formData.checkInTime}`
      );
      const checkOut = new Date(
        `${formData.checkOutDate}T${formData.checkOutTime}`
      );

      const durationInMillis = checkOut.getTime() - checkIn.getTime();
      const durationInDays = Math.ceil(durationInMillis / (1000 * 3600 * 24));

      if (durationInDays > 0) {
        setFormData((prev) => ({
          ...prev,
          duration: durationInDays,
          totalPrice: durationInDays * pricePerNight,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          duration: 0,
          totalPrice: 0,
        }));
      }
    }
  }, [
    formData.checkInDate,
    formData.checkOutDate,
    formData.checkInTime,
    formData.checkOutTime,
    pricePerNight,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.trimStart(),
      }));
    } else if (name === "phone") {
      if (value.length <= 10 && /^\d*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (
      !formData.name.trim() ||
      !formData.phone ||
      !formData.checkInDate ||
      !formData.checkOutDate ||
      !formData.checkInTime ||
      !formData.checkOutTime ||
      formData.duration <= 0
    ) {
      return;
    }

    const newBooking = {
      name: formData.name.trim(),
      checkin: formData.checkInDate,
      checkout: formData.checkOutDate,
      duration: formData.duration.toString(),
      Price: formData.totalPrice.toString(),
      hotel_name: hotelName,
      phone: formData.phone,
    };

    try {
      await apiRequest("/booking", "POST", newBooking);
      navigate("/bookings");
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  return (
    <div className="formdiv">
      <h1>Booking Form</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {formSubmitted && !formData.name.trim() && (
            <span className="error">Name is required</span>
          )}
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {formSubmitted && !formData.phone && (
            <span className="error">Phone is required</span>
          )}
        </div>
        <div>
          <label>Hotel Name:</label>
          <input type="text" value={hotelName} disabled />
        </div>
        <div>
          <label>Check-In Date:</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
          />
          {formSubmitted && !formData.checkInDate && (
            <span className="error">Check-in date is required</span>
          )}
        </div>
        <div>
          <label>Check-In Time:</label>
          <input
            type="time"
            name="checkInTime"
            value={formData.checkInTime}
            onChange={handleChange}
            required
          />
          {formSubmitted && !formData.checkInTime && (
            <span className="error">Check-in time is required</span>
          )}
        </div>
        <div>
          <label>Check-Out Date:</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
          />
          {formSubmitted && !formData.checkOutDate && (
            <span className="error">Check-out date is required</span>
          )}
        </div>
        <div>
          <label>Check-Out Time:</label>
          <input
            type="time"
            name="checkOutTime"
            value={formData.checkOutTime}
            onChange={handleChange}
            required
          />
          {formSubmitted && !formData.checkOutTime && (
            <span className="error">Check-out time is required</span>
          )}
        </div>
        <div>
          <label>Duration (Days):</label>
          <input type="number" value={formData.duration} disabled />
          {formSubmitted && formData.duration <= 0 && (
            <span className="error">Duration must be greater than 0</span>
          )}
        </div>
        <div>
          <label>Total Price:</label>
          <input type="number" value={formData.totalPrice} disabled />
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;