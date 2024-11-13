/* global google */
import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../components/axiosInstance';
import { Loader } from "@googlemaps/js-api-loader";
import { getCoordinates } from '../utils/utils';

const MapComponent = ({ destination }) => {
    const mapRef = useRef(null);
    const [position, setPosition] = useState({ lat: 37.7749, lng: -122.4194 });  // Default position
    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const coords = await getCoordinates(destination);
                console.log("Setting position:", coords);
                setPosition(coords);
            } catch (err) {
                console.error('Error fetching coordinates:', err);
            }
        };

        if (destination) {
            fetchCoordinates();
        }
    }, [destination]);

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await axiosInstance.get('/api/google-maps-api-key');
                setApiKey(response.data.apiKey);
            } catch (err) {
                console.error('Error fetching API key:', err);
            }
        };

        fetchApiKey();
    }, []);

    useEffect(() => {
        if (apiKey) {
            const loader = new Loader({
                apiKey: apiKey,
                version: "weekly",
                libraries: ["marker"]
            });

            loader.load().then(() => {
                try {
                    const { AdvancedMarkerElement } = google.maps.marker;
                    const map = new google.maps.Map(mapRef.current, {
                        center: position,
                        zoom: 10,
                        mapId: "e7d9b99f73a835b8"
                    });

                    console.log("Map position:", position);
                    new AdvancedMarkerElement({
                        map: map,
                        position: position,
                        title: destination
                    });
                } catch (error) {
                    console.error('Error initializing map:', error);
                }
            });
        }
    }, [apiKey, position]);

    return (
        <div className="bg-gray-900 bg-opacity-75 p-4 rounded-md shadow-lg text-white mt-4">
            <h2 className="text-2xl font-bold mb-4">Map for {destination}</h2>
            <div id="map" ref={mapRef} style={{ height: "400px", width: "100%" }}></div>
        </div>
    );
};

export default MapComponent;
