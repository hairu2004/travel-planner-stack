import axiosInstance from '../components/axiosInstance';

export const getGoogleMapsApiKey = async () => {
    try {
        const response = await axiosInstance.get('/api/google-maps-api-key');
        return response.data.apiKey;
    } catch (error) {
        console.error('Error fetching Google Maps API key:', error.message);
        throw error;
    }
};

export const getCoordinates = async (destination) => {
    try {
        const apiKey = await getGoogleMapsApiKey();

        const response = await axiosInstance.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: destination,
                key: apiKey
            }
        });

        console.log("Geocode response:", response.data);
        if (response.data.status === "OK") {
            const { lat, lng } = response.data.results[0].geometry.location;
            console.log("Coordinates found:", lat, lng);
            return { lat, lng };
        } else {
            throw new Error("Failed to get coordinates");
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};
