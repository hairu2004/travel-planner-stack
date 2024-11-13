import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white shadow-lg fixed w-full top-0 left-0 z-50">
            <div className="container mx-auto flex justify-between items-center p-5">
                <Link to="/" className="text-3xl font-bold tracking-wide hover:text-accent transition duration-300 ease-in-out transform hover:-translate-y-1">
                    Travel Planner
                </Link>
                <nav className="flex space-x-4 items-center">
                    <Link to="/" className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110">Home</Link>
                    <Link to="/about" className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110">About</Link>
                    <Link to="/profile" className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110">Profile</Link>
                    <Link to="/login" className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110">Login</Link>
                    <Link to="/register" className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110">Register</Link>
                    <Link to="/translate" className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110">Translator</Link>
                    <Link to="/travel-plans" className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110">Travel Plan</Link>
                    <Link to="/currency-converter" className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110">Currency Converter</Link>
                    <Link to="/hotel-loc" className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110">Hotel Finder</Link> {/* Added Hotel Finder link */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
