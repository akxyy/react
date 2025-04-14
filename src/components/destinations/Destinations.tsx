import React, { useEffect, useState } from "react";
import "./destinations.css";
import Header from "../common/header";
import Footer from "../common/footer";
import { apiRequest } from "../helpers/helperFunction";

interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  image_url: string;
}

interface DestinationState {
  destinations: Destination[];
  allDestinations: Destination[];
  loginStatus: string;
  searchQuery: string;
  searchResult: Destination[];
}

const Destinations: React.FC = () => {
  const [state, setState] = useState<DestinationState>({
    destinations: [],
    allDestinations: [],
    loginStatus: "",
    searchQuery: "",
    searchResult: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setState((prev) => ({
        ...prev,
        loginStatus: "Please login to view destinations.",
      }));
      return;
    }

    const fetchDestinations = async () => {
      try {
        const response = await apiRequest("/destinations", "get");
        setState((prev) => ({
          ...prev,
          destinations: response.data.data,
          allDestinations: response.data.data,
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          loginStatus: "Error fetching destinations.",
        }));
      }
    };

    fetchDestinations();
  }, []);

  const handleSearchChange = async (query: string) => {
    setState((prev) => ({
      ...prev,
      searchQuery: query,
      searchResult: [],
    }));

    if (query.trim() === "") {
      setState((prev) => ({
        ...prev,
        destinations: prev.allDestinations,
        searchResult: [],
      }));
      return;
    }

    const matched = state.allDestinations.find(
      (d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase())
    );

    if (matched) {
      try {
        const response = await apiRequest(`/destinations/${matched.id}`, "get");
        setState((prev) => ({
          ...prev,
          searchResult: response.data.data,
          destinations: [],
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          searchResult: [],
          destinations: [],
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        searchResult: [],
        destinations: [],
      }));
    }
  };

  return (
    <div className="maindiv">
      <Header/>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search destinations..."
          value={state.searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      <div className="innerdiv">
        <h1>Travel To Your Dream Place</h1>
        <p>Explore Popular Destinations</p>
        {state.loginStatus && (
          <div className="status-message">{state.loginStatus}</div>
        )}

        <div className="image-container">
          {state.searchResult.length > 0 ? (
            state.searchResult.map((destination) => (
              <div key={destination.id} className="destination-item">
                <img src={destination.image_url} alt={destination.name} />
                <h3>{destination.name}</h3>
                <p>{destination.country}</p>
                <p>{destination.description}</p>
              </div>
            ))
          ) : state.destinations.length > 0 ? (
            state.destinations.map((destination) => (
              <div key={destination.id} className="destination-item">
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
      </div>
      <Footer/>
    </div>
  );
};

export default Destinations;