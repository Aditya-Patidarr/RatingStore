import React, { useState, useEffect,useContext } from 'react';
import { submitRating, getStoreRatings } from '../services/ratingService.js';
import { AuthContext } from '../context/AuthContext.js';
import { useLocation } from 'react-router-dom';

const StoreRating = () => {
    const { user } = useContext(AuthContext);
    const [rating, setRating] = useState(0);
    const [userRating, setUserRating] = useState(null);
    const [ratings, setRatings] = useState([]);
    const { state } = useLocation();
    const storeId = state?.storeId;
    useEffect(() => {
        const fetchRatings = async () => {
            const response = await getStoreRatings(storeId);
            console.log("In fetchRatings",response);
            setRatings(response);
            const userRating = response.find(r => r.userId === user.id);
            if (userRating) {
                setUserRating(userRating.rating);
            }
        };
        fetchRatings();
    }, [storeId,user.id]);

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleSubmitRating = async (e) => {
        e.preventDefault();
        await submitRating(storeId, rating);
        setUserRating(rating);

    };

    return (
        <div>
            <h2>Rate this Store</h2>
            <form onSubmit={handleSubmitRating}>
                <select value={rating} onChange={handleRatingChange}>
                    <option value="0">Select Rating</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
                <button type="submit">Submit Rating</button>
            </form>
            <h3>Your Rating: {userRating ? userRating : 'Not rated yet'}</h3>
            <h3>All Ratings:</h3>
            <ul>
                {ratings.map((r) => (
                    <li key={r.id}>{r.userName}: {r.rating}</li>
                ))}
            </ul>
        </div>
    );
};

export default StoreRating;