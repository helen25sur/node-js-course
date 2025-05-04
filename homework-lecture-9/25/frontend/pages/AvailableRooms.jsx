import React, { useState } from "react";

import './Form.css';

const AvailableRooms = () => {
  const [date, setDate] = useState('');
  const [rooms, setRooms] = useState([]);

  const handleCheck = async () => {
    const res = await fetch(`http://localhost:3000/available-rooms?date=${date}`);
    const data = await res.json();
    setRooms(data);
  };

  return (
    <div>
      <h2>Check Available Rooms</h2>
      <div className="form-block">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button className="btn" onClick={handleCheck}>Check</button>
      </div>

      {rooms.length > 0 && (
        <table>
          <thead><tr><th>Room #</th><th>Type</th></tr></thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id}><td>{room.room_number}</td><td>{room.type}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AvailableRooms;