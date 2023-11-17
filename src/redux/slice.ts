import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'

const moviesState: MovieState = {
  loading: false,
  movies: [],
  error: false,
  singleMovie: {},
}

const watchlistState: WatchlistState = {
  loading: false,
  movies: [],
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
      state.error = true
    },
    getSingleMovieRequest: (state) => {
      state.loading = true
    },
    getSingleMovieSuccess: (state, action: PayloadAction<SingleMovie>) => {
      state.loading = false
      state.singleMovie = action.payload
    },
    getSingleMovieFail: (state) => {
      state.error = true
    },
  },
})

const watchListSlice = createSlice({
  name: 'watchlist',
  initialState: watchlistState,
  reducers: {},
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
  getSingleMovieFail,
  getSingleMovieRequest,
  getSingleMovieSuccess,
} = movieSlice.actions
