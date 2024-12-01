import './App.css';
import '@fontsource/inter';
import React, { useState } from 'react';
import Signup from './components/signupPage/signup.js';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/landingPage/landing.js';
import LoginModal from './components/loginModal/login.js';
import Header from './components/header/header.js';

function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
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
      </Routes>
      {isLoginModalOpen && <LoginModal onClose={handleCloseModal} />}
    </div>

  );
}

export default App;
