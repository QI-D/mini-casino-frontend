import axios from 'axios';
import {
  BASE_URL,
  PLACE_BET_API,
  BET_SUMMARY_API
} from '../utils/constants';

const getBetSummary = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const response = await axios.get(`${BASE_URL}${BET_SUMMARY_API}`, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to get bet summary.';
  }
}

const placeBet = async (token, gameId, betAmount) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  try {
    const response = await axios.post(`${BASE_URL}${PLACE_BET_API}`, { gameId, betAmount }, config);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to place a bet.';
  }
}

const betService = {
  getBetSummary,
  placeBet
}

export default betService;
