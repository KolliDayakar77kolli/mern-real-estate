import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://ratna-real-estate.onrender.com/api'
    : 'http://localhost:5000/api'
});

export default axiosInstance;
