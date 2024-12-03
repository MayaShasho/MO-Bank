import './App.css';
import '@fontsource/inter';
import React from 'react';
import Signup from './components/signupPage/signup.js';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landingPage/landing.js';
import Login from './components/loginPage/login.js';
import Header from './components/header/header.js';
import Confirmation from './components/confirmation/confirmation.js';
import User from './components/dashboardPage/dashboard.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>

  );
}

export default App;
