import axios from 'axios';
import {
  BASE_URL,
  REGISTER_API,
  LOGIN_API
} from '../utils/constants';

const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}${REGISTER_API}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to register.';
  }
}

const login = async (userData) => {
  try{
    const response = await axios.post(`${BASE_URL}${LOGIN_API}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to login';
  }
}

const authService = {
  register,
  login
};

export default authService;
