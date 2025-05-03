import React from 'react';
import  logo  from '../constants/img/image_2025-04-10_11-31-33.png';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeItem } from '../helpers/persistance-storage';
import { logoutUser} from '../slice/auth';
import logout from "../constants/img/logouts.svg";
import user from "../constants/img/user.svg";

const Navbar = () => {
  const {isloggedIn, user} = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(user);

  const handleRemove = () => {
     removeItem("user")
     dispatch(logoutUser());
     navigate("/login")
  }

  const removehandle = () => {
     localStorage.removeItem("user")
  }
  
  return (
    <div className="navbar container">
      <Link className='logo' to="/"><img width={100} src={logo} alt="logo" /></Link>
      <div className="navbar__menu">
        <ul>
          {isloggedIn ? (
            <>
            <p className='username'>
            <img src={user} alt="" />
              {user.username}
            </p>
            <button onClick={handleRemove} className='user_btn'>
              Chiqish
              <img src={logout} alt="logout" />
            </button>
            </>
          )
          : (
            <>
            <Link to="/">Home</Link>
            <Link onClick={removehandle} to="/login">Login</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar