import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleMovieSuccess } from '../redux/slice'
import { Star } from '../components/Icons'

const SingleMovie = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const state: SingleMovie = useSelector((state) => state.movie.singleMovie)

  const getSingleMovie = async () => {
    try {
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

  useEffect(() => {
    getSingleMovie()
  }, [])

  return (
    <section className="text-white body-font overflow-hidden m-12 rounded-md flex justify-center">
      <div className="lg:w-4/5 flex bg-gray-700 justify-center p-6 rounded-lg gap-4">
        <img
          alt="ecommerce"
          className="w-2/5 object-cover object-center rounded-md"
          src={state.Poster}
        />
        <div className="mt-6 flex flex-col gap-2">
          <h1 className="text-4xl font-bold mb-1">{state.Title}</h1>

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
