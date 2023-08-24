import React from 'react';
import './homepage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/Login');
  };

  return (
    <div className='container'>
      <h1 className='project-name'>GIVE AND TAKE</h1>
      <button className='login-button' onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default HomePage;
