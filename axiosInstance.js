import axios from 'axios';

// Create a new Axios instance with default configuration
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Replace this with your API base URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json', // Set default content type
    // You can add more default headers here if needed
  },
});

export default instance;
