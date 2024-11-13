import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const { name, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
        } else {
            const newUser = { name, email, password };
            try {
                const res = await axios.post('http://localhost:5000/api/auth/register', newUser);
                if (res.data) {
                    console.log(res.data);
                    navigate('/login');
                } else {
                    console.log("No data received");
                }
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-gray-800 bg-opacity-75 p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-center text-3xl font-bold mb-6 text-white">Register</h2>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2 text-white" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={onChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2 text-white" htmlFor="email">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={onChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2 text-white" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2 text-white" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={onChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 w-full"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
