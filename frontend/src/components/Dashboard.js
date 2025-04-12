import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { fetchUser } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
    const userLoggedIn = async () => {
        const fetchedUser = await fetchUser();
        if (!fetchedUser) {
            return navigate('/login');
        } else {
            if(fetchedUser.role === "System Administrator"){
                return navigate('/admin');
            }
            else if(fetchedUser.role === 'Normal User'){
                return navigate('/normal-user');
            }
            else if(fetchedUser.role === 'Store Owner'){
                return navigate('/store-owner');
            }
        }
        return navigate('/login');
    };
    userLoggedIn();
}, [fetchUser,navigate]);
};

export default Dashboard;