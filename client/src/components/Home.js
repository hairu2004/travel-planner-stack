import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="hero h-screen flex items-center justify-center">
            <div className="hero-overlay"></div>
            <Container className="mt-4 relative z-10 text-center">
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <h1 className="text-5xl font-bold mb-4 text-white">Welcome to the Travel Planner</h1>
                        <p className="text-lg mb-8 text-white">Plan your trips effortlessly!</p>
                        <button
                            onClick={handleLogin}
                            className="bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 m-2"
                        >
                            Login
                        </button>
                        <button
                            onClick={handleRegister}
                            className="bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 m-2"
                        >
                            Register
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
