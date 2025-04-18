import React from 'react';
import { logo } from '../constants';

const Navbar = () => {
  return (
    <div className="navbar container">
      <a className='logo' href="/"><img src={logo} alt="logo" /></a>
      <div className="navbar__menu">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar