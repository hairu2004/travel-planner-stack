import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TravelPlanList from './components/TravelPlans/TravelPlanList';
import TravelPlanForm from './components/TravelPlans/TravelPlanForm';
import About from './components/About';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import TranslationForm from './components/TranslationForm';
import CurrencyConverter from './components/CurrencyConverter';
import HotelLoc from './components/HotelLoc'; // Import the HotelLoc component
import FlightSearchForm from './components/FlightSearchForm'; // Import the FlightSearchForm component
import './index.css'; // Ensure your Tailwind CSS is imported

const App = () => {
    return (
        <>
            <div className="background-blur"></div>
            <div className="content">
                <div className="fixed w-full z-50">
                    <Header />
                </div>
                <div className="pt-20"> {/* Adjust padding to match the height of your navbar */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path="/travel-plans" element={<PrivateRoute><TravelPlanList /></PrivateRoute>} />
                        <Route path="/add-travel-plan" element={<PrivateRoute><TravelPlanForm /></PrivateRoute>} />
                        <Route path="/translate" element={<TranslationForm />} />
                        <Route path="/currency-converter" element={<CurrencyConverter />} />
                        <Route path="/hotel-loc" element={<HotelLoc />} /> {/* Add the route for HotelLoc */}
                        <Route path="/flight-booking" element={<FlightSearchForm />} /> {/* Add the route for FlightSearchForm */}
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default App;
