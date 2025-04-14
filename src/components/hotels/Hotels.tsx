import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../helpers/helperFunction";
import Header from "../common/header";
import Footer from "../common/footer";
import "./hotel.css";
import withAuthProtection from "../login/withAuthProtection";

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
  const [state, setState] = useState<{
    hotels: Hotel[];
    destinations: Destination[];
    selectedDestinationId: number | null;
    loginStatus: string;
  }>({
    hotels: [],
    destinations: [],
    selectedDestinationId: null,
    loginStatus: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await apiRequest("/destinations", "GET");
        setState((prev) => ({ ...prev, destinations: response.data.data }));
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    const fetchHotels = async () => {
      try {
        const url = state.selectedDestinationId
          ? `/filter-hotels?destination_id=${state.selectedDestinationId}`
          : "/hotels";
        const response = await apiRequest(url, "GET");
        setState((prev) => ({ ...prev, hotels: response.data.data }));
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setState((prev) => ({
          ...prev,
          loginStatus: "Error fetching hotels.",
        }));
      }
    };

    fetchDestinations();
    fetchHotels();
  }, [state.selectedDestinationId]);

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const destinationId = parseInt(event.target.value, 10);
    setState((prev) => ({
      ...prev,
      selectedDestinationId: destinationId || null,
    }));
  };

  const handleBookNow = (hotel: Hotel) => {
    navigate("/booking-form", {
      state: {
        hotelName: hotel.name,
        pricePerNight: hotel.price_per_night,
      },
    });
  };

  return (
    <div className="hotelsdiv">
      <Header />
      <div className="innerdiv">
        <h1>Find the Perfect Stay</h1>
        <p>Explore Popular Hotels</p>
        {state.loginStatus && (
          <div className="status-message">{state.loginStatus}</div>
        )}
        <div className="dropdown-container">
          <select
            className="destination-dropdown"
            onChange={handleDestinationChange}
            value={state.selectedDestinationId || ""}
          >
            <option value="">Select Destination</option>
            {state.destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.name}
              </option>
            ))}
          </select>
        </div>
        <div className="image-container">
          {state.hotels.length > 0 ? (
            state.hotels.map((hotel) => (
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
      </div>
      <Footer />
    </div>
  );
};

export default withAuthProtection(Hotels);