import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService.js';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (name.length < 20 || name.length > 60) {
            setError('Name must be between 20 and 60 characters.');
            return;
        }

        if (address.length > 400) {
            setError('Address must not exceed 400 characters.');
            return;
        }

        if (password.length < 8 || password.length > 16 || !/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password)) {
            setError('Password must be 8-16 characters long and include at least one uppercase letter and one special character.');
            return;
        }
        if (role.length === 0) {
            setError('Role must be selected for a user.');
            return;
        }
        try {
            const response = await authService.registerUser({ name, email, address, password,role });
            console.log(response);
            navigate('/login');
        } catch (err) {
            console.log(err);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Role:</label>
                    <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} required >
                        <option value="">Select Role</option>
                        <option value="Normal User">Normal User</option>
                        <option value="System Administrator">Admin</option>
                        <option value="Store Owner">Store Owner</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;