import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentBet: null,
  betHistory: [],
  loading: false,
  error: null,
  betSummary: null,
};

const betSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    placeBetStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    placeBetSuccess: (state, action) => {
      state.currentBet = action.payload;
      state.betHistory.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
    placeBetFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchBetSummaryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBetSummarySuccess: (state, action) => {
      state.betSummary = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchBetSummaryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearBetError: (state) => {
      state.error = null;
    },
  },
});

export const {
  placeBetStart,
  placeBetSuccess,
  placeBetFailure,
  fetchBetSummaryStart,
  fetchBetSummarySuccess,
  fetchBetSummaryFailure,
  clearBetError,
} = betSlice.actions;

export default betSlice.reducer;
