import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5500/api/", // Set the base URL for all requests
    timeout: 10000, // Set a timeout for requests in milliseconds
    headers: {},
});

export default axiosInstance;
