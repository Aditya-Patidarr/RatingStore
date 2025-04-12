import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import StoreList  from '../components/StoreList.js';
import updatePassword from '../utils/updatePassword.js';
const NormalUserDashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <h2>Your Stores</h2>
            <StoreList/>
            <button onClick={updatePassword}>Update Password</button>
        </div>
    );
};

export default NormalUserDashboard;