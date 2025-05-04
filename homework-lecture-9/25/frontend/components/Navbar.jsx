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
          <NavLink to="/guests" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className='bx bx-user-circle'></i>
            Guests
            <span className='arrow-icon'><i className='bx bx-chevron-right'></i></span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/rooms" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className='bx bx-home-alt-2'></i>
            Rooms
            <span className='arrow-icon'><i className='bx bx-chevron-right'></i></span>
          </NavLink>
          
        </li>
        <li>
          <NavLink to="/booking" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className='bx bx-list-ul'></i>
            Booking
            <span className='arrow-icon'><i className='bx bx-chevron-right'></i></span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-guest" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className='bx bx-user-plus'></i>
            Add New Guest
            <span className='arrow-icon'><i className='bx bx-chevron-right'></i></span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/available-rooms" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className='bx bxs-hotel'></i>
            Available Rooms
            <span className='arrow-icon'><i className='bx bx-chevron-right'></i></span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-booking" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className='bx bx-hotel'></i>
            Add New Booking
            <span className='arrow-icon'><i className='bx bx-chevron-right'></i></span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/monthly-income" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className='bx bx-money'></i>
            Count Monthly Income
            <span className='arrow-icon'><i className='bx bx-chevron-right'></i></span>
          </NavLink>
        </li>
      </menu>
    </aside>
  )
}

export default Navbar