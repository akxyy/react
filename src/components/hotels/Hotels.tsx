import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../helpers/helperFunction";
import Header from "../common/header";
import Footer from "../common/footer";
import './hotel.css'

interface Hotel {
  id: number;
  name: string;
  price_per_night: number;
  amenities: string;
  image_url: string;
}

const Hotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loginStatus, setLoginStatus] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginStatus("Please login to view hotels.");
      return;
    }

    const fetchHotels = async () => {
      try {
        const response = await apiRequest(`${process.env.REACT_APP_API_URL}/hotels`, "GET");
        setHotels(response.data.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setLoginStatus("Error fetching hotels.");
      }
    };

    fetchHotels();
  }, []);

  const goToBooking=()=>{
    navigate("/bookingForm")
  }

  return (
    <div className="maindiv">
      <Header />
      <div className="innerdiv">
        <h1>Find the Perfect Stay</h1>
        <p>Explore Popular Hotels</p>
        {loginStatus && <div className="status-message">{loginStatus}</div>}

        <div className="image-container">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div key={hotel.id} className="hotel-item">
                <img src={hotel.image_url} alt={hotel.name} />
                <h3>{hotel.name}</h3>
                <p>{hotel.amenities}</p>
                <p>{hotel.price_per_night}$</p>
                <button onClick={goToBooking}>Book Now</button>
              </div>
            ))
          ) : (
            <p>No hotels found.</p>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Hotels;