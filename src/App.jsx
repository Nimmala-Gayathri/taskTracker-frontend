import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css'; // <<< Import CSS

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
