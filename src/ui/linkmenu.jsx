import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const LinkMenu = ({ name, img, onClick }) => {
  const location = useLocation();

  const isActive = location.pathname === `/${name}`;

  return (
    <div className='link_container'>
      <Link
        to={`/${name}`}
        className={`link_menu ${isActive ? 'active_link' : ''}`}
        onClick={onClick}
      >
        <img src={img} alt="" />
        {name}
      </Link>
    </div>
  );
};

export default LinkMenu;
