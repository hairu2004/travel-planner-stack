import React, { useState } from 'react';
import axios from 'axios';

const HotelLoc = () => {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [hotels, setHotels] = useState([]);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState(null);

    const fetchHotels = async () => {
        try {
            setSearched(true);
            setError(null);

            // Fetch coordinates from your backend
            const geoResponse = await axios.get('http://localhost:5000/api/geocode', {
                params: { q: `${city}, ${country}` }
            });

            // Log the entire geocode response for debugging
            console.log('Full Geocode Response:', geoResponse.data);

            if (geoResponse.data.results && geoResponse.data.results.length > 0) {
                const { lat, lng } = geoResponse.data.results[0].geometry;

                // Fetch hotels from your backend
                const response = await axios.get('http://localhost:5000/api/hotels', {
                    params: { latitude: lat, longitude: lng, checkIn: checkin, checkOut: checkout }
                });

                console.log('API Response:', response.data); // Log the entire response

                const hotelData = response.data.data?.data || [];
                setHotels(hotelData);
            } else {
                setError('Location not found');
            }
        } catch (error) {
            console.error('Error fetching hotel data:', error);
            setError('Failed to fetch hotel data.');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchHotels();
    };

    const handleHotelClick = (url) => {
        if (url) {
            window.open(url, '_blank');
        } else {
            alert('Booking URL not available');
        }
    };

    return (
        <div className="relative">
            <div className="background-blur"></div> {/* Ensure the background blur is included */}
            <div className="flex flex-col justify-center items-center min-h-screen text-center font-sans bg-transparent px-4 py-8">
                <h1 className="text-5xl font-extrabold mb-8 text-white drop-shadow-lg">Hotel Finder</h1>
                <form className="flex flex-col items-center gap-4 p-6 bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg shadow-2xl max-w-lg w-full" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        className="w-full p-3 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full p-3 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-4 w-full">
                        <input
                            type="date"
                            placeholder="Check-in"
                            value={checkin}
                            onChange={(e) => setCheckin(e.target.value)}
                            className="w-full p-3 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="date"
                            placeholder="Check-out"
                            value={checkout}
                            onChange={(e) => setCheckout(e.target.value)}
                            className="w-full p-3 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded bg-blue-600 text-white border-none cursor-pointer hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 shadow-lg"
                    >
                        Search Hotels
                    </button>
                </form>

                {searched && hotels.length === 0 && !error && <p className="mt-8 text-white">No hotels found.</p>}
                {error && <p className="mt-8 text-red-500">{error}</p>}

                {hotels.length > 0 && (
                    <ul className="mt-8 w-full max-w-4xl mx-auto overflow-auto h-96 bg-transparent">
                        {hotels.map((hotel) => (
                            <li
                                key={hotel.id}
                                className="mb-8 p-4 bg-gray-900 bg-opacity-80 rounded-lg shadow-2xl cursor-pointer hover:bg-gray-800 transition duration-300"
                                onClick={() => handleHotelClick(hotel.commerceInfo.externalUrl)} // Correct field for booking URL
                            >
                                <h3 className="text-2xl font-semibold mb-2 text-white">{hotel.title}</h3>
                                <p className="mb-2 text-gray-400">{hotel.secondaryInfo || 'No additional information available'}</p>
                                <p className="mb-2 text-blue-400 font-bold">{hotel.priceForDisplay}</p>
                                {hotel.cardPhotos && hotel.cardPhotos.length > 0 && (
                                    <img
                                        src={hotel.cardPhotos[0].sizes.urlTemplate.replace('{width}', '400').replace('{height}', '300')}
                                        alt={hotel.title}
                                        className="w-full h-72 object-cover rounded-lg shadow-md"
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default HotelLoc;
