import React, {useState, useEffect} from 'react';

import './Table.css';

const RoomsTable = () => {
  const [rooms, setRooms] = useState([]);
  
    async function getData() {
      const url = 'http://localhost:3000/rooms';
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
      async function fetchRooms() {
        const data = await getData();
        if (data) setRooms(data);
      }
      fetchRooms();
    }, []);

  return (
    <>
      <h1>All Rooms</h1>
      <table className='users-table'>
        <thead>
          <tr>
            <th>id</th>
            <th>Room Number </th>
            <th>Type</th>
            <th>Price per night</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {
            rooms.map(room => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>#{room.room_number}</td>
                <td>{room.type}</td>
                <td>{room.price_per_night}₴</td>
                <td>{room.capacity} </td>
              </tr>
            ))
          }
          
        </tbody>
      </table>
    </>
  )
}

export default RoomsTable