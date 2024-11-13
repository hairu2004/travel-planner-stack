import React, { useState } from 'react';
import axios from 'axios';

const FlightSearchForm = () => {
    const [sourceCity, setSourceCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [date, setDate] = useState('');
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState('');

    const getAirportCode = async (cityName) => {
        try {
            const response = await axios.get('/api/flight-search', {
                params: { query: cityName }
            });

            if (response.data && response.data.data && response.data.data.length > 0) {
                const airport = response.data.data.find(location => location.type === 'AIRPORT');
                if (airport) {
                    return airport.code;
                }
            }
            return null;
        } catch (error) {
            console.error('Error fetching airport code:', error);
            return null;
        }
    };

    const handleSearch = async () => {
        try {
            setError('');

            const originSkyId = await getAirportCode(sourceCity);
            const destinationSkyId = await getAirportCode(destinationCity);

            if (!originSkyId || !destinationSkyId) {
                setError('Invalid city name provided.');
                return;
            }

            const response = await axios.get('/api/flights', {
                params: {
                    originSkyId: originSkyId,
                    destinationSkyId: destinationSkyId,
                    date: date,
                    cabinClass: 'economy',
                    adults: 1,
                    sortBy: 'best',
                    currency: 'USD',
                    market: 'en-US',
                    countryCode: 'US'
                }
            });

            console.log('API response:', response.data);

            if (response.data && response.data.data && response.data.data.itineraries) {
                setFlights(response.data.data.itineraries);
            } else {
                setError('Unexpected response structure');
            }
        } catch (error) {
            console.error('Error fetching flight prices:', error);
            setError('Failed to fetch flight prices');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', paddingTop: '80px' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Flight Search</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label>
                            Departure City:
                            <input type="text" value={sourceCity} onChange={(e) => setSourceCity(e.target.value)} required />
                        </label>
                    </div>
                    <div>
                        <label>
                            Arrival City:
                            <input type="text" value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} required />
                        </label>
                    </div>
                    <div>
                        <label>
                            Departure Date:
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </label>
                    </div>
                    <div>
                        <button type="button" onClick={handleSearch}>Search Flights</button>
                    </div>
                </form>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {flights.length > 0 && (
                    <table border="1" style={{ margin: 'auto', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Departure</th>
                                <th>Arrival</th>
                                <th>Price</th>
                                <th>Duration (minutes)</th>
                                <th>Carrier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map((flight, index) => (
                                <tr key={index}>
                                    <td>
                                        <a href={`https://booking-com15.p.rapidapi.com/api/v1/flights/booking/${flight.id}`} target="_blank" rel="noopener noreferrer">
                                            {flight.legs[0].origin.cityName} to {flight.legs[0].destination.cityName}
                                        </a>
                                    </td>
                                    <td>{flight.legs[0].departure}</td>
                                    <td>{flight.legs[0].arrival}</td>
                                    <td>{flight.price.formatted}</td>
                                    <td>{flight.legs[0].durationInMinutes}</td>
                                    <td>{flight.legs[0].carriers.marketing[0].name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default FlightSearchForm;
