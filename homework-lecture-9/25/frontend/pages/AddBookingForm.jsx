import React, { useState, useEffect } from "react";

import './Form.css';

const AddBookingForm = () => {
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    guest_id: '',
    room_id: '',
    check_in: '',
    check_out: ''
  });

  useEffect(() => {
    // Отримати гостей і кімнати
    fetch('http://localhost:3000/guests').then(res => res.json()).then(setGuests);
    fetch('http://localhost:3000/rooms').then(res => res.json()).then(setRooms);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/add-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert(data.message || 'Booking created');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book a Room</h2>
      <div className="form-block">
        <select value={form.guest_id} onChange={(e) => setForm({...form, guest_id: e.target.value})}>
          <option value="">Select Guest</option>
          {guests.map(g => <option key={g.id} value={g.id}>{g.first_name} {g.last_name}</option>)}
        </select>
        <select value={form.room_id} onChange={(e) => setForm({...form, room_id: e.target.value})}>
          <option value="">Select Room</option>
          {rooms.map(r => <option key={r.id} value={r.id}>{r.room_number} ({r.type})</option>)}
        </select>
        <input type="date" value={form.check_in} onChange={(e) => setForm({...form, check_in: e.target.value})} />
        <input type="date" value={form.check_out} onChange={(e) => setForm({...form, check_out: e.target.value})} />
        <button type="submit">Book</button>
      </div>
    </form>
  );
};

export default AddBookingForm;