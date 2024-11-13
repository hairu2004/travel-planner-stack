const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const { Translate } = require('@google-cloud/translate').v2;
const fs = require('fs');
require('dotenv').config(); // Load environment variables

const app = express();
const authRoutes = require('./routes/auth');
const travelPlanRoutes = require('./routes/travelPlans');

// Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/travelPlans', travelPlanRoutes);

app.get('/api/distance', async (req, res) => {
    const { from, to } = req.query;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY_DISTANCE;

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
            params: {
                origins: from,
                destinations: to,
                key: apiKey
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching distance:', error.message);
        res.status(500).json({ error: 'Failed to fetch distance' });
    }
});

app.get('/api/google-maps-api-key', (req, res) => {
    res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY_MAP });
});

// Provide Amadeus access token endpoint
app.post('/api/amadeus-token', async (req, res) => {
    try {
        const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.AMADEUS_CLIENT_ID,
                client_secret: process.env.AMADEUS_CLIENT_SECRET
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

        res.json({ accessToken: response.data.access_token });
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch access token' });
    }
});

// Translation API setup
const credentialsPath = './config/exploreease-travel-app-440004-501f91977931.json';
if (!fs.existsSync(credentialsPath)) {
    console.error('Google Cloud credentials file not found');
    process.exit(1);
}

const translate = new Translate({
    keyFilename: credentialsPath
});

app.post('/api/translate', async (req, res) => {
    const { text, sourceLanguage, targetLanguage } = req.body;
    try {
        const [translation] = await translate.translate(text, { from: sourceLanguage, to: targetLanguage });
        res.json({ translation });
    } catch (error) {
        console.error('Error translating text:', error.message);
        res.status(500).json({ error: 'Failed to translate text' });
    }
});

// TripAdvisor API endpoint for hotel search by location
app.get('/api/geocode', async (req, res) => {
    const { q } = req.query;
    const apiKey = process.env.REACT_APP_OPENCAGE_API;

    try {
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                q,
                key: apiKey
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching geocode data:', error.message);
        res.status(500).json({ error: 'Failed to fetch geocode data' });
    }
});

app.get('/api/hotels', async (req, res) => {
    const { latitude, longitude, checkIn, checkOut, pageNumber, currencyCode } = req.query;
    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
    const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;

    try {
        const response = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotelsByLocation', {
            params: {
                latitude,
                longitude,
                checkIn,
                checkOut,
                pageNumber: pageNumber || 1,
                currencyCode: currencyCode || 'USD'
            },
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching hotels:', error.message);
        res.status(500).json({ error: 'Failed to fetch hotel data' });
    }
});

app.get('/api/flights', async (req, res) => {
    const { sourceAirportCode, destinationAirportCode, date } = req.query;
    try {
        const response = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights', {
            params: {
                sourceAirportCode,
                destinationAirportCode,
                date,
                itineraryType: 'ONE_WAY',
                sortOrder: 'ML_BEST_VALUE',
                numAdults: 1,
                numSeniors: 0,
                classOfService: 'ECONOMY',
                pageNumber: 1,
                nearby: 'yes',
                nonstop: 'yes',
                currencyCode: 'USD',
                region: 'USA'
            },
            headers: {
                'x-rapidapi-host': process.env.RAPIDAPI_HOST,
                'x-rapidapi-key': process.env.RAPIDAPI_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching flights:', error.message);
        res.status(500).json({ error: 'Failed to fetch flight data' });
    }
});

app.get('/api/exchange-rate', async (req, res) => {
    const { fromCurrency, toCurrency } = req.query;
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;

    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`);
        const exchangeRate = response.data.conversion_rates[toCurrency];
        res.json({ exchangeRate });
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        res.status(500).json({ error: 'Failed to fetch exchange rate' });
    }
});

// Connect to MongoDB using the URI from the environment variables
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
