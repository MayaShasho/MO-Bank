import './App.css';
import '@fontsource/inter';
import React from 'react';
import Signup from './components/signupPage/signup.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/landingPage/landing.js';
import Login from './components/loginPage/login.js';
import Header from './components/header/header.js';

function App() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCloseClick = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <Header onLoginClick={handleLoginClick} />
      <Routes>
        <Route
          path="/"
          element={<LandingPage onGetStartedClick={handleGetStartedClick} />}
        />
        <Route
          path="/signup"
          element={<Signup />} />
        <Route
          path="/login"
          element={<Login onClose={handleCloseClick} />} />
      </Routes>
    </div>

  );
}

export default App;
