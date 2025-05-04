import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import './App.css'
import GuestsTable from '../pages/GuestsTable';
import RoomsTable from '../pages/RoomsTable';
import BookingsTable from '../pages/BookingsTable';
import AddGuestForm from '../pages/AddGuestForm';
import AvailableRooms from '../pages/AvailableRooms';
import AddBookingForm from '../pages/AddBookingForm';
import MonthlyIncome from '../pages/MonthlyIncome';

function App() {

  return (
    <Router>
      <div className='grid'>
        <Navbar />
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Navigate to="/guests" />} />
            <Route path="/guests" element={<GuestsTable />} />
            <Route path="/rooms" element={<RoomsTable />} />
            <Route path="/booking" element={<BookingsTable />} />
            <Route path="/add-guest" element={<AddGuestForm />} />
            <Route path="/available-rooms" element={<AvailableRooms />} />
            <Route path="/add-booking" element={<AddBookingForm />} />
            <Route path="/monthly-income" element={<MonthlyIncome />} />
          </Routes>
        </Main>

      </div>
    </Router>

  )
}

export default App
