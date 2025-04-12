import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getStores = async () => {
    try {
        const response = await axios.get(`${API_URL}/stores`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRatings = async () => {
    try {
        const response = await axios.get(`${API_URL}/ratings`);
        return response.data;
    } catch (error) {
        throw error;
    }
};