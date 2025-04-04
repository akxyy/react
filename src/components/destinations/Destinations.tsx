import React from 'react'
import "./destinations.css"
import sample1 from "../assets/Big hero lft 1.svg"
import rectangle1 from "../assets/Rectangle 11.svg"
import rectangle2 from "../assets/Rectangle 12.svg"
import rectangle3 from "../assets/Rectangle 13.svg"

function Destinations() {
  return (
    <div className='maindiv'>
      <img src={sample1} alt="sample" className='img1' />
      <div className='innerdiv'>
        <h1>Travel To Your Dream Place</h1>
        <p>Explore Popular Destinations</p>
        <div className='image-container'>
          <img src={rectangle1} alt="Paris" />
          <img src={rectangle2} alt="New York" />
          <img src={rectangle3} alt="Tokyo" />
        </div>
      </div>
    </div>
  )
}

export default Destinations