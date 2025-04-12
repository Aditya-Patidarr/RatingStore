import React, { useEffect, useState } from 'react';
import { getStores } from '../services/storeService.js';
import { useNavigate } from 'react-router-dom';
const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await getStores();
                console.log(response);
                setStores(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const handleRating = (storeId)=>{
        return navigate('/storeRating', { state: { storeId } });
    }
    return (
        <div>
            <h2>Store List</h2>
            <ul>
                {stores && stores.map(store => (
                    
                    <li key={store.id}>
                        <h3>{store.name}</h3>
                        <p>Address: {store.address}</p>
                        <p>Overall Rating: {store.rating}</p>
                        <button onClick={()=>handleRating(store.id)}>Rating</button>
                    </li>
                    
                ))}
            </ul>
        </div>
    );
};

export default StoreList;