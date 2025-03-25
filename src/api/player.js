import axios from 'axios';
import {
  BASE_URL,
  GET_BALANCE_API,
  DEPOSIT_API
} from '../utils/constants';

const getBalance = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const response = await axios.get(`${BASE_URL}${GET_BALANCE_API}`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to get balance.';
  }
}

const deposit = async (token, amount) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const response = await axios.post(`${BASE_URL}${DEPOSIT_API}`, { amount }, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to deposit.';
  }
}

const playerService = {
  getBalance,
  deposit
}

export default playerService;
