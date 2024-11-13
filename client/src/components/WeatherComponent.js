import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = ({ destination }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=f4169d9b135807841173798e7787fb45&units=metric`);
                setWeather(res.data);
            } catch (err) {
                console.error('Error fetching weather:', err.response ? err.response.data : err.message);
            }
        };
        if (destination) {
            fetchWeather();
        }
    }, [destination]);

    return weather ? (
        <div className="bg-gray-900 bg-opacity-75 p-4 rounded-md shadow-lg text-white mt-4">
            <h2 className="text-2xl font-bold mb-4">Weather in {weather.name}</h2>
            <p className="text-lg">Temperature: {weather.main.temp} °C</p>
            <p className="text-lg">Condition: {weather.weather[0].description}</p>
        </div>
    ) : (
        <p className="bg-gray-900 bg-opacity-75 p-4 rounded-md shadow-lg text-white mt-4">Loading weather...</p>
    );
};

export default WeatherComponent;
