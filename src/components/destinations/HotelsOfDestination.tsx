import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiRequest } from "../helpers/helperFunction";
import "./HotelsOfDestination.css";

interface Hotel {
  id: number;
  name: string;
  image_url: string;
}

const HotelsOfDestination: React.FC = () => {
  const destinationId = useSelector((state: any) => state.destination.destination_id);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const fetchHotels = async () => {
    try {
      const url = `/filter-hotels?destination_id=${destinationId}`;
      const response = await apiRequest(url, "GET");
      setHotels(response.data.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    if (destinationId) {
      fetchHotels();
    }
  }, [destinationId]);

  return (
    <div className="hotels-destination">
      <h2>Hotels</h2>
      {hotels.length > 0 ? (
        <div className="hotel-list">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-item">
              <img src={hotel.image_url} alt={hotel.name} />
              <h3>{hotel.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No hotels found.</p>
      )}
    </div>
  );
};

export default HotelsOfDestination;