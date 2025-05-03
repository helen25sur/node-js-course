import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import './App.css'
import GuestsTable from '../pages/GuestsTable';
import RoomsTable from '../pages/RoomsTable';
import BookingsTable from '../pages/BookingsTable';

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
          </Routes>
        </Main>

      </div>
    </Router>

  )
}

export default App
