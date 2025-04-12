import React, { useEffect, useState } from 'react';
import { getStoreRatings, getAverageRating } from '../services/ratingService.js';
import { getUsersByStore } from '../services/ratingService.js';
import { AuthContext } from '../context/AuthContext.js';
import { useContext } from 'react';
import updatePassword from '../utils/updatePassword.js';
const StoreOwnerDashboard = () => {
    const [ratings, setRatings] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [users, setUsers] = useState([]);
    const [storeId, setStoreId] = useState(null);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const storeId = async () => {
            const store = await getStoreByUserId(user.id);
            setStoreId((prevState)=>store.id);
        }
        const fetchRatings = async () => {
            const fetchedRatings = await getStoreRatings(storeId);
            setRatings(fetchedRatings);
        };

        const fetchAverageRating = async () => {
            const avgRating = await getAverageRating(storeId);
            setAverageRating(avgRating);
        };

        const fetchUsers = async () => {
            const userList = await getUsersByStore(storeId);
            setUsers(userList);
        };

        fetchRatings();
        fetchAverageRating();
        fetchUsers();
    }, [storeId]);

    return (
        <div>
            <h1>Store Owner Dashboard</h1>
            <h2>Average Rating: {averageRating}</h2>
            <h3>Users who rated your store:</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - Rating: {user.rating}</li>
                ))}
            </ul>
            <h3>Your Store Ratings:</h3>
            <ul>
                {ratings.map(rating => (
                    <li key={rating.id}>User: {rating.userName} - Rating: {rating.value}</li>
                ))}
            </ul>
            <button onClick={updatePassword}>Update Password</button>
        </div>
    );
};

export default StoreOwnerDashboard;