import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const user = { email, password };
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', user);
            if (res.data) {
                localStorage.setItem('token', res.data.token);
                console.log('Token set in local storage:', res.data.token);
                navigate('/travel-plans');
            } else {
                console.log('No data received');
            }
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative">
            <div className="background-blur absolute top-0 left-0 w-full h-full"></div>
            <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-lg max-w-md w-full z-10 backdrop-blur-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
