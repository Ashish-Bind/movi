import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  addToWatchlist,
  getMoviesRequest,
  getSingleMovieSuccess,
} from '../redux/slice'
import { Star } from '../components/Icons'
import { setWatchlist } from '../utils/localstorage'

const SingleMovie = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const state: SingleMovie = useSelector(
    (state: State) => state.movie.singleMovie!
  )
  const loading: MovieState['loading'] = useSelector(
    (state: State) => state.movie.loading!
  )
  const watchlist: SingleMovie[] = useSelector(
    (state: State) => state.watchList.movies
  )

  const getSingleMovie = async () => {
    try {
      dispatch(getMoviesRequest())
      const { data } = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=${
          import.meta.env.VITE_API_KEY
        }`
      )
      dispatch(getSingleMovieSuccess(data))
    } catch (err) {
      alert('Something went wrong')
    }
  }

  const checkAddedToWatchlist = (id: string) => {
    return watchlist.some((movie) => movie.imdbID === id)
  }

  const handleWatchlist = (movie: SingleMovie) => {
    dispatch(addToWatchlist(movie))
  }

  useEffect(() => {
    getSingleMovie()
  }, [])

  useEffect(() => {
    setWatchlist(watchlist)
  }, [watchlist])

  if (loading) {
    return (
      <div className="text-white text-xl flex items-center justify-center mt-12">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <section className="text-white body-font overflow-hidden lg:mx-12 m-2 rounded-md flex justify-center">
      <div className="lg:w-4/5 flex lg:flex-row flex-col bg-gray-700 justify-center p-6 rounded-lg gap-4">
        <img
          alt="ecommerce"
          className="lg:w-2/5 object-cover object-center rounded-md mx-auto"
          src={state.Poster}
        />
        <div className="mt-6 flex flex-col gap-2">
          <h1 className="text-4xl font-bold flex justify-between items-center">
            {state.Title}{' '}
            <div
              onClick={() => handleWatchlist(state)}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={checkAddedToWatchlist(state.imdbID!) ? 'red' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={0.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
          </h1>

          <p className="leading-relaxed text-gray-400 text-sm">{state.Plot}</p>

          <p className="bg-pink-500 w-fit py-1 px-2 rounded-md text-white font-medium">
            {state.Type}
          </p>

          <div className="flex gap-2 p-2 border border-gray-600 rounded-md w-fit text-sm text-gray-400">
            <p>Year - {state.Year}</p>
            <p>|</p>
            <p>Rated - {state.Rated}</p>
            <p>|</p>
            <p>Released - {state.Released}</p>
          </div>
          <p>Runtime - {state.Runtime}</p>
          <p>Genre - {state.Genre}</p>
          <p>Director - {state.Director}</p>
          <p>Writer - {state?.Writer?.split(', ').slice(0, 3).toString()}</p>
          <p>Actors - {state.Actors}</p>
          <p>languages - {state.Language}</p>
          <p>Country - {state.Country}</p>
          <p className="flex gap-2 items-center">
            <p>Imdb:</p>
            <Star /> {state.imdbRating} / 10
          </p>

          <div className="flex justify-between"></div>
        </div>
      </div>
    </section>
  )
}

export default SingleMovie
