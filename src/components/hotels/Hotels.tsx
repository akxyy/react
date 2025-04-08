import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../helpers/helperFunction";
import Header from "../common/header";
import Footer from "../common/footer";
import './hotel.css';

interface Hotel {
  id: number;
  name: string;
  price_per_night: number;
  amenities: string;
  image_url: string;
}

interface Destination {
  id: number;
  name: string;
}

const Hotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState<number | null>(null);
  const [loginStatus, setLoginStatus] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginStatus("Please login to view hotels.");
      return;
    }

    const fetchDestinations = async () => {
      try {
        const response = await apiRequest(`${process.env.REACT_APP_API_URL}/destinations`, "GET");
        setDestinations(response.data.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    const fetchHotels = async () => {
      try {
        const url = selectedDestinationId
          ? `${process.env.REACT_APP_API_URL}/filter-hotels?destination_id=${selectedDestinationId}`
          : `${process.env.REACT_APP_API_URL}/hotels`;
        const response = await apiRequest(url, "GET");
        setHotels(response.data.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setLoginStatus("Error fetching hotels.");
      }
    };

    fetchDestinations();
    fetchHotels();
  }, [selectedDestinationId]);

  const handleDestinationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const destinationId = parseInt(event.target.value, 10);
    setSelectedDestinationId(destinationId || null);
  };

  const handleBookNow = (hotel: Hotel) => {
    navigate("/booking-form", {
      state: {
        hotelName: hotel.name,
        pricePerNight: hotel.price_per_night,
      }
    });
  };

  return (
    <div className="maindiv">
      <Header />
      <div className="innerdiv">
        <h1>Find the Perfect Stay</h1>
        <p>Explore Popular Hotels</p>
        {loginStatus && <div className="status-message">{loginStatus}</div>}

        <div className="dropdown-container">
          <select
            className="destination-dropdown"
            onChange={handleDestinationChange}
            value={selectedDestinationId || ""}
          >
            <option value="">Select Destination</option>
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.name}
              </option>
            ))}
          </select>
        </div>

        <div className="image-container">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div key={hotel.id} className="hotel-item">
                <img src={hotel.image_url} alt={hotel.name} />
                <h3>{hotel.name}</h3>
                <p>{hotel.amenities}</p>
                <p>{hotel.price_per_night}$</p>
                <button onClick={() => handleBookNow(hotel)}>Book Now</button>
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