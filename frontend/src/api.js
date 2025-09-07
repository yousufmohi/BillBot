import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL; 

export const getCosts = async ({ service, start, end } = {}) => {
  try {

    const params = {};
    if (service) params.service = service;
    if (start) params.start = start;
    if (end) params.end = end;

    const response = await axios.get(`${API_BASE_URL}/costs`, { params });
    return response.data; 
  } catch (error) {
    console.error("Error fetching costs:", error);
    throw error;
  }
};
