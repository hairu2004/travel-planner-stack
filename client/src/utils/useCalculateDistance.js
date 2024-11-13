import { useState } from 'react';
import axios from 'axios';

const useCalculateDistance = () => {
    const [distance, setDistance] = useState(null);
    const [error, setError] = useState(null);

    const calculateDistance = async (from, to) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/distance?from=${from}&to=${to}`);
            const data = response.data;
            if (data.rows[0].elements[0].status === 'OK') {
                setDistance(data.rows[0].elements[0].distance.text);
                setError(null);
            } else {
                throw new Error('Unable to calculate distance.');
            }
        } catch (error) {
            console.error('Error calculating distance:', error.message);
            setError('Error calculating distance. Please try again.');
            setDistance(null);
        }
    };

    return { distance, error, calculateDistance };
};

export default useCalculateDistance;
