import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ratings'; 

export const submitRating = async (storeId, rating, userId) => {
    try {
        const response = await axios.post(`${API_URL}/submit`, { storeId, rating, userId });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const modifyRating = async (ratingId, newRating) => {
    try {
        const response = await axios.put(`${API_URL}/modify/${ratingId}`, { newRating });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const getUsersByStore = async (storeId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${storeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getStoreRatings = async (storeId) => {
    try {
        const response = await axios.get(`${API_URL}/store/${storeId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getAverageRating = async (storeId) => {
    try {
        const response = await axios.get(`${API_URL}/average/${storeId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};