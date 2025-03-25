import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,
  loading: false,
  error: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    getBalanceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBalanceSuccess: (state, action) => {
      state.balance = action.payload;
      state.loading = false;
      state.error = null;
    },
    getBalanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    depositStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    depositSuccess: (state, action) => {
      state.balance = action.payload;
      state.loading = false;
      state.error = null;
    },
    depositFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    },
    clearPlayerError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getBalanceStart,
  getBalanceSuccess,
  getBalanceFailure,
  depositStart,
  depositSuccess,
  depositFailure,
  updateBalance,
  clearPlayerError,
} = playerSlice.actions;

export default playerSlice.reducer;
