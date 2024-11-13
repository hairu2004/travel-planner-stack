import React, { useState, useEffect } from 'react';
import axiosInstance from '../components/axiosInstance';

const CurrencyConverter = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [error, setError] = useState(null);

    const fetchExchangeRate = async () => {
        try {
            const response = await axiosInstance.get('/api/exchange-rate', {
                params: { fromCurrency, toCurrency }
            });
            setExchangeRate(response.data.exchangeRate);
            setError(null);
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            setError('Failed to fetch exchange rate');
        }
    };

    useEffect(() => {
        fetchExchangeRate();
    }, [fromCurrency, toCurrency]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 rounded-lg shadow-lg text-gray-900 max-w-md w-full bg-white">
                <h1 className="text-3xl font-bold mb-6 text-center">Currency Converter</h1>
                <div className="mb-4">
                    <label className="block text-lg mb-2">From:</label>
                    <input
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-lg mb-2">To:</label>
                    <input
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                    />
                </div>
                {exchangeRate !== null ? (
                    <p className="text-xl mb-4">Exchange Rate: {exchangeRate}</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <p className="text-gray-400">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default CurrencyConverter;
