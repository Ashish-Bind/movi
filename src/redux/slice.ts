import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'
import { getWatchlist } from '../utils/localstorage'

const moviesState: MovieState = {
  loading: false,
  movies: [],
  error: false,
  singleMovie: {},
}

const watchlistState: WatchlistState = {
  loading: false,
  movies: getWatchlist(),
  error: false,
}

const movieSlice = createSlice({
  name: 'movies',
  initialState: moviesState,
  reducers: {
    getMoviesRequest: (state) => {
      state.loading = true
    },
    getMoviesSuccess: (state, action: PayloadAction<Movies[]>) => {
      state.loading = false
      state.movies = action.payload
    },
    getMoviesFail: (state) => {
      state.loading = false
    },
    getSingleMovieSuccess: (state, action: PayloadAction<SingleMovie>) => {
      state.loading = false
      state.singleMovie = action.payload
    },
  },
})

const watchListSlice = createSlice({
  name: 'watchlist',
  initialState: watchlistState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<SingleMovie>) => {
      if (state.movies.some((i) => i.imdbID === action.payload.imdbID)) {
        state.movies = state.movies.filter(
          (i) => i.imdbID !== action.payload.imdbID
        )
      } else {
        state.movies = [...state.movies, action.payload]
      }
    },
  },
})

export const store = configureStore({
  reducer: {
    movie: movieSlice.reducer,
    watchList: watchListSlice.reducer,
  },
})

export const {
  getMoviesSuccess,
  getMoviesFail,
  getMoviesRequest,
  getSingleMovieSuccess,
} = movieSlice.actions

export const { addToWatchlist } = watchListSlice.actions
