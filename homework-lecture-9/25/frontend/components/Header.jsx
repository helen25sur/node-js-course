import React, { useEffect, useState } from 'react';

import './Header.css';

const Header = () => {
  const [counts, setCounts] = useState({
    guests: 0,
    rooms: 0,
    bookings: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [guestsRes, roomsRes, bookingsRes] = await Promise.all([
          fetch('http://localhost:3000/guests'),
          fetch('http://localhost:3000/rooms'),
          fetch('http://localhost:3000/bookings'),
        ]);

        const [guests, rooms, bookings] = await Promise.all([
          guestsRes.json(),
          roomsRes.json(),
          bookingsRes.json(),
        ]);

        setCounts({
          guests: guests.length,
          rooms: rooms.length,
          bookings: bookings.length
        });
      } catch (err) {
        console.error('Error fetching counts:', err);
      }
    };

    fetchCounts();
  }, []);

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
            <span>{counts.guests}</span>
          </div>
        </div>
        <div className="header-block_item">
          <span className='header-block_icon'>
            <box-icon name='home-alt-2' color="#00AC4F" size="md"></box-icon>
          </span>
          <div className="header-block_text">
            <h4>Total Rooms</h4>
            <span>{counts.rooms}</span>
          </div>
        </div>
        <div className="header-block_item">
          <span className='header-block_icon'>
            <box-icon name='list-ul' color="#00AC4F" size="md"></box-icon>
          </span>
          <div className="header-block_text">
            <h4>Total Booking</h4>
            <span>{counts.bookings}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header