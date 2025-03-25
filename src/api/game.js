import axios from 'axios';
import {
    BASE_URL,
    GET_GAMES_API,
    SEARCH_GAMES_API
} from '../utils/constants';

const getAllGames = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${GET_GAMES_API}`);
      return response.data;
    }  catch (error) {
      throw error.response?.data?.message || error.message;
    }
};

const getGameById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}${GET_GAMES_API}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to get game by ID.';
  }
};

const searchGamesByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}${SEARCH_GAMES_API}`, {
      params: {
          name: name
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to search game by name.';
  }
};

const gamesService = {
  getAllGames,
  getGameById,
  searchGamesByName
};

export default gamesService;
