import React, { useEffect, useState } from 'react';

import './Table.css';

const BookingsTable = () => {

  const [bookings, setBookings] = useState([]);
  
    async function getData() {
      const url = 'http://localhost:3000/bookings';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        return json;
      } catch (error) {
        console.error(error.message);
      }
    }
  
    useEffect(() => {
      async function fetchBookings() {
        const data = await getData();
        if (data) setBookings(data);
      }
      fetchBookings();
    }, []);

  return (
    <>
      <h1>All Bookings</h1>
      <table className='users-table'>
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Check in</th>
            <th>Check out</th>
            <th>Total Price</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {
            bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.first_name}</td>
                <td>{booking.last_name}</td>
                <td>{booking.room_number}</td>
                <td>{booking.room_type}</td>
                <td>{new Date(booking.check_in).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                <td>{new Date(booking.check_out).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                <td>{booking.total_price}₴ </td>
                <td>{new Date(booking.created_at).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} </td>
              </tr>
            ))
          }
          
        </tbody>
      </table>
    </>
  )
}

export default BookingsTable