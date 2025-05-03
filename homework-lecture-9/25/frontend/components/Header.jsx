import React from 'react';

import './Header.css';

const Header = () => {
  return (
    <header>
      <h3 className='header-title'>
        Hello Olena 👋🏼,
      </h3>

      <div className="header-block">
        <div className="header-block_item">
          <span className='header-block_icon'>
            <box-icon name='user-circle' color="#00AC4F" size="md"></box-icon>
          </span>
          <div className="header-block_text">
            <h4>Total Guests</h4>
            <span>40</span>
          </div>
        </div>
        <div className="header-block_item">
          <span className='header-block_icon'>
            <box-icon name='home-alt-2' color="#00AC4F" size="md"></box-icon>
          </span>
          <div className="header-block_text">
            <h4>Total Rooms</h4>
            <span>30</span>
          </div>
        </div>
        <div className="header-block_item">
          <span className='header-block_icon'>
            <box-icon name='list-ul' color="#00AC4F" size="md"></box-icon>
          </span>
          <div className="header-block_text">
            <h4>Total Booking</h4>
            <span>38</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header