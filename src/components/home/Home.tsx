import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from '../common/header';
import Footer from '../common/footer';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { token, username } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token, navigate, username]);

  return (
    <div className="home-container">
      <Header />
      <div className='middle-container'>
        <img src={process.env.PUBLIC_URL + '/images/Hero Content.svg'} alt="img" className='mainImg' />
        <img src={process.env.PUBLIC_URL + '/images/Services.svg'} alt="img2" className='img2' />
        <img src={process.env.PUBLIC_URL + '/images/Book a trip.svg'} alt="img3" className='img3' />
      </div>
      <Footer />
    </div>
  );
};

export default Home;