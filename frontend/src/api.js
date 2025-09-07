import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getCosts = async (service) => {
  let url = `${API_BASE_URL}/costs`;
  if (service) url += `?service=${service}`;
  const response = await axios.get(url);
  return response.data;
};
