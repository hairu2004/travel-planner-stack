import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logout } from '../utils/utils'; // Import the logout function from utils.js

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        location: '',
        favoriteDestination: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/api/auth/profile', {
                        headers: { 'x-auth-token': token }
                    });
                    setFormData(res.data);
                } catch (err) {
                    console.error('Error fetching profile:', err.response ? err.response.data : err.message);
                }
            }
        };
        fetchProfile();
    }, []);

    const { name, email, bio, location, favoriteDestination } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await axios.put('http://localhost:5000/api/auth/profile', formData, {
                    headers: { 'x-auth-token': token }
                });
                setFormData(res.data);
            } catch (err) {
                console.error('Error updating profile:', err.response ? err.response.data : err.message);
            }
        }
    };

    return (
        <div className="container mx-auto mt-8 p-6 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg text-white">
            <h2 className="text-center text-3xl font-bold mb-6">Profile</h2>
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" htmlFor="email">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        readOnly
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" htmlFor="bio">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        rows="3"
                        value={bio}
                        onChange={onChange}
                        placeholder="Tell us about yourself"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" htmlFor="location">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={onChange}
                        placeholder="Enter your location"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" htmlFor="favoriteDestination">
                        Favorite Destination
                    </label>
                    <input
                        type="text"
                        name="favoriteDestination"
                        value={favoriteDestination}
                        onChange={onChange}
                        placeholder="Enter your favorite destination"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Update Profile
                    </button>

                    <button
                        onClick={logout}
                        className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
