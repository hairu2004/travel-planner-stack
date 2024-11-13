import React, { useState } from 'react';
import useCalculateDistance from './useCalculateDistance';

const DistanceCalculator = () => {
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const { distance, error, calculateDistance } = useCalculateDistance();

    const handleCalculate = () => {
        if (fromLocation && toLocation) {
            calculateDistance(fromLocation, toLocation);
        }
    };

    return (
        <div>
            <h1>Distance Calculator</h1>
            <input
                type="text"
                placeholder="From Location"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
            />
            <input
                type="text"
                placeholder="To Location"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
            />
            <button onClick={handleCalculate}>Calculate Distance</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {distance && <p>Distance: {distance}</p>}
        </div>
    );
};

export default DistanceCalculator;
