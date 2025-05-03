import React, { useEffect, useState } from 'react';
import './Table.css';

const GuestsTable = () => {
  const [guests, setGuests] = useState([]);

  async function getData() {
    const url = 'http://localhost:3000/guests';
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
    async function fetchGuests() {
      const data = await getData();
      if (data) setGuests(data);
    }
    fetchGuests();
  }, []);

  return (
    <>
      <h1>All Guests</h1>
      <table className='users-table'>
        <thead>
          <tr>
            <th>id</th>
            <th>First Name  </th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {
            guests.map(guest => (
              <tr key={guest.id}>
                <td>{guest.id}</td>
                <td>{guest.first_name}</td>
                <td>{guest.last_name}</td>
                <td>{guest.email}</td>
                <td>{new Date(guest.created_at).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} </td>
              </tr>
            ))
          }
          
        </tbody>
      </table>
    </>
  )
}

export default GuestsTable