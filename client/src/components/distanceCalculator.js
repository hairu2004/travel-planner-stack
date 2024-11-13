import axios from 'axios';

const calculateDistance = async (from, to) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/distance?from=${from}&to=${to}`);
        const data = response.data;
        if (data.rows[0].elements[0].status === 'OK') {
            return data.rows[0].elements[0].distance.text;
        } else {
            throw new Error('Unable to calculate distance.');
        }
    } catch (error) {
        console.error('Error calculating distance:', error.message);
        return null;
    }
};

export default calculateDistance;
