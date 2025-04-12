import React, { useEffect, useState } from 'react';
import { getUsers, getStores, getRatings } from '../services/adminService.js';
import StoreList from '../components/StoreList.js';
import updatePassword from '../utils/updatePassword.js';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getUsers();
                const storesData = await getStores();
                const ratingsData = await getRatings();
                
                setUsers(usersData);
                setStores(storesData);
                setRatings(ratingsData);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Total Users: {users.length}</h2>
                <h2>Total Stores: {stores.length}</h2>
                <h2>Total Ratings: {ratings.length}</h2>
            </div>
            <div>
                <h3>User List</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name} - {user.email}</li>
                    ))}
                </ul>
            </div>
            <div>
                <StoreList/>
            </div>
            <button onClick={updatePassword}>Update Password</button>
        </div>
    );
};

export default AdminDashboard;