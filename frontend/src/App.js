import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Dashboard from './components/Dashboard.js';
import AdminDashboard from './pages/AdminDashboard.js';
import NormalUserDashboard from './pages/NormalUserDashboard.js';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard.js';
import axios from 'axios';
import StoreList from './components/StoreList.js';
import StoreRating from './components/StoreRating.js';
axios.defaults.withCredentials = true;
function App() {
  return (
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/storeList" element={<StoreList/>} />
          <Route path="/storeRating" element={<StoreRating/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/normal-user" element={<NormalUserDashboard/>} />
          <Route path="/store-owner" element={<StoreOwnerDashboard/>} />
        </Routes>
  );
}

export default App;