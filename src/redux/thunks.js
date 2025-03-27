import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
} from './slices/authSlice';
import {
  getBalanceStart,
  getBalanceSuccess,
  getBalanceFailure,
  depositStart,
  depositSuccess,
  depositFailure,
} from './slices/playerSlice';
import {
  fetchGamesStart,
  fetchGamesSuccess,
  fetchGamesFailure,
  fetchGameByIdStart,
  fetchGameByIdSuccess,
  fetchGameByIdFailure,
  searchGamesStart,
  searchGamesSuccess,
  searchGamesFailure,
} from './slices/gameSlice';
import {
  placeBetStart,
  placeBetSuccess,
  placeBetFailure,
  fetchBetSummaryStart,
  fetchBetSummarySuccess,
  fetchBetSummaryFailure,
} from './slices/betSlice';
import authService from '../api/auth';
import playerService from '../api/player';
import gameService from '../api/game';
import betService from '../api/bet';

// Auth Thunks
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await authService.login(credentials);

    localStorage.setItem('authToken', response.token);
    localStorage.setItem('authUser', JSON.stringify(response.player));

    dispatch(loginSuccess(response));
    // After successful login, fetch user balance
    dispatch(fetchBalance(response.token));
    return response;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : 
                        error.response?.data?.message || 
                        error.message || 
                        'Login failed';
    dispatch(loginFailure(errorMessage));
    throw error;
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const response = await authService.register(userData);
    dispatch(registerSuccess(response));

    const token = response.token;
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(response.player));

    dispatch(fetchBalance(token));
    return response;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : 
                        error.response?.data?.message || 
                        error.message || 
                        'Register failed';
    dispatch(registerFailure(errorMessage));
    throw error;
  }
};

// Player Thunks
export const fetchBalance = (token) => async (dispatch) => {
  try {
    dispatch(getBalanceStart());
    const response = await playerService.getBalance(token);
    dispatch(getBalanceSuccess(response.balance));
    return response;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : 
                        error.response?.data?.message || 
                        error.message || 
                        'Get Balance failed';
    dispatch(getBalanceFailure(errorMessage));
    throw error;
  }
};

export const depositFunds = (token, amount) => async (dispatch) => {
  try {
    dispatch(depositStart());
    const response = await playerService.deposit(token, amount);
    dispatch(depositSuccess(response.balance));
    return response;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : 
                        error.response?.data?.message || 
                        error.message || 
                        'Deposit failed';
    dispatch(depositFailure(errorMessage));
    throw error;
  }
};

// Game Thunks
export const fetchAllGames = () => async (dispatch) => {
  try {
    dispatch(fetchGamesStart());
    const response = await gameService.getAllGames();
    dispatch(fetchGamesSuccess(response.gameList));
    return response;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : 
                        error.response?.data?.message || 
                        error.message || 
                        'Get all games failed';
    dispatch(fetchGamesFailure(errorMessage));
    throw error;
  }
};

export const fetchGameById = (id) => async (dispatch) => {
  try {
    dispatch(fetchGameByIdStart());
    const response = await gameService.getGameById(id);
    dispatch(fetchGameByIdSuccess(response.game));
    return response;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : 
                        error.response?.data?.message || 
                        error.message || 
                        'Get game by ID failed';
    dispatch(fetchGameByIdFailure(errorMessage));
    throw error;
  }
};

export const searchGames = (name) => async (dispatch) => {
  try {
    dispatch(searchGamesStart());
    const response = await gameService.searchGamesByName(name);
    dispatch(searchGamesSuccess(response.gameList));
    return response;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : 
                        error.response?.data?.message || 
                        error.message || 
                        'Search game failed';
    dispatch(searchGamesFailure(errorMessage));
    throw error;
  }
};

export const loadMoreGames = () => (dispatch) => {
  dispatch({ type: 'games/loadMore' });
};

// Bet Thunks
export const placeBet = (token, gameId, betAmount) => async (dispatch) => {
  try {
    dispatch(placeBetStart());
    const response = await betService.placeBet(token, gameId, betAmount);
    dispatch(placeBetSuccess(response.bet));
    // Update balance after bet
    dispatch(fetchBalance(token));
    return response;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : 
                        error.response?.data?.message || 
                        error.message || 
                        'Place bet failed';
    dispatch(placeBetFailure(errorMessage));
    throw error;
  }
};

export const fetchSummary = (token) => async (dispatch) => {
  try {
    dispatch(fetchBetSummaryStart());
    const response = await betService.getBetSummary(token);
    dispatch(fetchBetSummarySuccess(response.betSummary));
    return response;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : 
                        error.response?.data?.message || 
                        error.message || 
                        'Get bet summary failed';
    dispatch(fetchBetSummaryFailure(errorMessage));
    throw error;
  }
};
