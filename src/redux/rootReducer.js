import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import playerReducer from './slices/playerSlice';
import gameReducer from './slices/gameSlice';
import betReducer from './slices/betSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
  games: gameReducer,
  bets: betReducer,
});

export default rootReducer;
