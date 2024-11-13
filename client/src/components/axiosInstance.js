import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Set your backend base URL here
});

export default axiosInstance;
