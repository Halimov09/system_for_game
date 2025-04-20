import React from 'react';
import { logo } from '../constants';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const {isloggedIn, user} = useSelector(state => state.auth)

  console.log(user);
  
  return (
    <div className="navbar container">
      <a className='logo' href="/"><img src={logo} alt="logo" /></a>
      <div className="navbar__menu">
        <ul>
          {isloggedIn ? (
            <>
            <p className='username'>{user.username}</p>
            <button className='user_btn'>Chiqish</button>
            </>
          )
          : (
            <>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar