import axios from 'axios';

const API_URL = 'http://localhost:5000/api/stores'; 

export const getUserStores = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getStores = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getStoreById = async (storeId) => {
    try {
        const response = await axios.get(`${API_URL}/${storeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createStore = async (storeData) => {
    try {
        const response = await axios.post(API_URL, storeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateStore = async (storeId, storeData) => {
    try {
        const response = await axios.put(`${API_URL}/${storeId}`, storeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getStoreByUserId= async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteStore = async (storeId) => {
    try {
        const response = await axios.delete(`${API_URL}/${storeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

