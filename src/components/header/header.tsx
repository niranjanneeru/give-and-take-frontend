import React from 'react';
import './header.css';

const Header = ({ userRole }) => {
  return (
    <div className='header'>{userRole && <div className='user-greeting'>Hi , {userRole}</div>}</div>
  );
};

export default Header;
