import axios from 'axios';

// Function to get access token
const getAccessToken = async () => {
    try {
        // Fetch the Amadeus credentials from the backend
        const response = await axios.get('/api/amadeus-credentials');
        const { client_id, client_secret } = response.data;

        const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: client_id,
                client_secret: client_secret
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

        return tokenResponse.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export default getAccessToken;
