import React from 'react';
import { NavLink } from 'react-router-dom';

import 'boxicons';

import './Navbar.css';

const Navbar = () => {
  return (
    <aside>
      <h2 className='navbar-title'>
        <box-icon name='cog' size="md" color="#000000"></box-icon>
        Dashboard</h2>

      <menu className='navbar-menu'>
        <li>
          <NavLink to="/guests" activeClassName="active">
            <i class='bx bx-user-circle'></i>
            Guests
            <span className='arrow-icon'><i class='bx bx-chevron-right'></i></span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/rooms" activeClassName="active-link">
            <i class='bx bx-home-alt-2'></i>
            Rooms
            <span className='arrow-icon'><i class='bx bx-chevron-right'></i></span>
          </NavLink>
          
        </li>
        <li>
          <NavLink to="/booking" activeClassName="active-link">
            <i class='bx bx-list-ul'></i>
            Booking
            <span className='arrow-icon'><i class='bx bx-chevron-right'></i></span>
          </NavLink>
          {/* <box-icon name='list-ul' color="#9197B3"></box-icon> */}
        </li>
      </menu>
    </aside>
  )
}

export default Navbar