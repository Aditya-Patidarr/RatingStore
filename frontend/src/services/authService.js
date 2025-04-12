import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const registerUser = async ({name, email, address, password,role}) => {
    const response = await axios.post(API_URL + 'signup', {
        name,
        email,
        address,
        password,
        role
    });
    return response.data;
};

const handlePassword = async (email, oldPassword, newPassword) => {
    const response = await axios.put(API_URL + 'update-password', {
        email,
        oldPassword,
        newPassword
    });
    console.log(response.data);
    return response.data;
}
const loginUser = async ({email, password}) => {
    const response = await axios.post(API_URL + 'login', {
        email,
        password
    });
    return response.data.user;
};

const logoutUser = async () => {
    const response = await axios.post(API_URL + 'logout');
    return response.data;
};


const getCurrentUser = async () => {
    const response = await axios.get(API_URL + 'current-user');
    return response.data;
};


const authService = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    handlePassword
};

export default authService;