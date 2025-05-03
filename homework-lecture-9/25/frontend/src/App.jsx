import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import './App.css'
import GuestsTable from '../pages/GuestsTable';

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
          </Routes>
        </Main>
        {/* RoomsTable */}
        {/* BookingTable */}

      </div>
    </Router>

  )
}

export default App
