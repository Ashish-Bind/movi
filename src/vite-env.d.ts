/// <reference types="vite/client" />

interface Movies {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface MovieState {
  loading: boolean
  movies: Movies[]
  singleMovie?: SingleMovie
  error?: boolean
}

interface SingleMovie {
  Title?: string
  Year?: string
  Rated?: string
  Released?: string
  Runtime?: string
  Genre?: string
  Director?: string
  Writer?: string
  Actors?: string
  Plot?: string
  Language?: string
  Country?: string
  Poster?: string
  imdbRating?: string
  imdbID?: string
  Type?: string
}

interface WatchlistState {
  loading: boolean
  movies: SingleMovie[]
  error?: boolean
}
