import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./destinations.css";
import Header from '../common/header';
import Footer from '../common/footer';

interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  image_url: string;
}

const Destinations: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [loginStatus, setLoginStatus] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginStatus("Please login to view destinations.");
      return;
    }

    axios.get(`${process.env.REACT_APP_API_URL}/destinations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setDestinations(response.data.data);
        setFilteredDestinations(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
        setLoginStatus("Error fetching destinations.");
      });
  }, []);

  const handleDestinationClick = (id: number) => {
    navigate(`/destination/${id}`);
  };

  return (
    <div className="maindiv">
      <Header />
      <div className="innerdiv">
        <h1>Travel To Your Dream Place</h1>
        <p>Explore Popular Destinations</p>
        {loginStatus && <div className="status-message">{loginStatus}</div>}

        <div className="image-container">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="destination-item"
                onClick={() => handleDestinationClick(destination.id)}
              >
                <img
                  src={destination.image_url}
                  alt={destination.name}
                />
                <h3>{destination.name}</h3>
                <p>{destination.country}</p>
                <p>{destination.description}</p>
              </div>
            ))
          ) : (
            <p>No destinations found.</p>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Destinations;