import axios from 'axios';

const API_URL =
  'https://restaurant-be-400174736012.asia-southeast2.run.app/api';

export const registerUser = async (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  return res.data;
};
