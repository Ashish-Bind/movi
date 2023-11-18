export const setWatchlist = (movies: SingleMovie[]) => {
  localStorage.setItem('watchlist', JSON.stringify(movies))
}

export const getWatchlist = () => {
  const movies = localStorage.getItem('watchlist')!
  return movies?.length > 0 ? JSON.parse(movies) : []
}
