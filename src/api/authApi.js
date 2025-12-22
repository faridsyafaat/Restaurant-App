import axios from 'axios';
const API_URL = 'https://restaurant-be-400174736012.asia-southeast2.run.app/api';
export const registerUser = async (data) => {
    const res = await axios.post(`${API_URL}/auth/register`, data);
    return res.data;
};
export const loginUser = async (data) => {
    const res = await axios.post(`${API_URL}/auth/login`, data);
    return res.data;
};
