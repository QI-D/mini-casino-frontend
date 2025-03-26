import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  games: [],
  featuredGames: [],
  currentGame: null,
  loading: false,
  error: null,
  searchResults: [],
  visibleGames: 8, // Initial number of games to show
};

const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    fetchGamesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGamesSuccess: (state, action) => {
      state.games = action.payload;
      state.featuredGames = action.payload.slice(0, 4); // First 4 games as featured
      state.loading = false;
      state.error = null;
    },
    fetchGamesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchGameByIdStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGameByIdSuccess: (state, action) => {
      state.currentGame = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchGameByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    searchGamesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchGamesSuccess: (state, action) => {
      state.searchResults = action.payload;
      state.loading = false;
      state.error = null;
    },
    searchGamesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loadMoreGames: (state) => {
      state.visibleGames += 8;
    },
    clearGameError: (state) => {
      state.error = null;
    },
    loadMore: (state) => {
      state.visibleGames += 8;
    },
  },
});

export const {
  fetchGamesStart,
  fetchGamesSuccess,
  fetchGamesFailure,
  fetchGameByIdStart,
  fetchGameByIdSuccess,
  fetchGameByIdFailure,
  searchGamesStart,
  searchGamesSuccess,
  searchGamesFailure,
  loadMoreGames,
  clearGameError,
} = gameSlice.actions;

export default gameSlice.reducer;
