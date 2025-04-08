import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../helpers/helperFunction";
import "./destinations.css";
import Header from "../common/header";
import Footer from "../common/footer";

interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  image_url: string;
}

const Destinations: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loginStatus, setLoginStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginStatus("Please login to view destinations.");
      return;
    }

    const fetchDestinations = async () => {
      try {
        const response = await apiRequest(`${process.env.REACT_APP_API_URL}/destinations`,"GET");
        setDestinations(response.data.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setLoginStatus("Error fetching destinations.");
      }
    };

    fetchDestinations();
  }, []);

  const handleDestinationClick = (id: number) => {
    navigate(`/destination/${id}`);
  };

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="maindiv">
      <Header />
      <div className="search-bar-container">
        <input type="text" className="search-bar" placeholder="Search destinations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
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
                <img src={destination.image_url} alt={destination.name} />
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