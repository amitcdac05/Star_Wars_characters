import axios from "axios";

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: "https://swapi.dev/api",
  timeout: 10000, // Optional: set a timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch data from a given endpoint
export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export default api;
