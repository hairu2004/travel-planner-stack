import React from 'react';

const About = () => (
    <div className="container mx-auto mt-8 p-6 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg text-white">
        <div className="text-center mb-6">
            <h1 className="text-4xl font-bold">About Us</h1>
        </div>
        <div className="text-lg space-y-4">
            <p><strong>Effortless Travel Planning:</strong> Allows users to create, view, and manage their travel plans easily with an intuitive UI.</p>
            <p><strong>Smooth Navigation:</strong> Seamlessly transitions between login, registration, and travel plan views.</p>

            <p><strong>Interactive Map:</strong> Displays destinations on a map with integrated weather updates, enhancing user experience.</p>
            <p><strong>User Authentication:</strong> Securely manages user data with registration and login functionalities, ensuring personalized access.</p>
        </div>
    </div>
);

export default About;
