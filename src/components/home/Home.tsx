import React, { useEffect,useState } from 'react';
import './Home.css';
import image2 from '../assets/Services.svg';
import image from "../assets/Hero Content.svg";
import image3 from "../assets/Book a trip.svg";
import { useNavigate } from "react-router-dom";
import Header from '../common/header';
import Footer from '../common/footer'

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token,navigate]);

  return (
    <div className="home-container">
      <Header />
      <div className='middle-container'>
        <img src={image} alt="img" className='mainImg' />
        <img src={image2} alt="img2" className='img2' />
        <img src={image3} alt="img3" className='img3' />
      </div>
      <Footer />
    </div>
  );
};

export default Home;