import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import {
  getMoviesFail,
  getMoviesRequest,
  getMoviesSuccess,
} from '../redux/slice'

const Header = () => {
  const [search, setSearch] = useState<string>('')
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!search) {
      return
    }

    try {
      dispatch(getMoviesRequest())
      const { data } = await axios.get(
        `https://www.omdbapi.com/?s=${search}&apikey=${
          import.meta.env.VITE_API_KEY
        }`
      )

      if (data.Error) {
        throw new Error(data.Error)
      }

      dispatch(getMoviesSuccess(data.Search))
      setSearch('')
    } catch (err) {
      dispatch(getMoviesFail())
      alert(err)
    }
  }

  return (
    <div className="bg-violet-500 text-white flex p-4 items-center justify-between">
      <Link
        className="text-xl transition-colors cursor-pointer font-semibold"
        to="/"
      >
        🎞️ Movi
      </Link>

      {pathname === '/' && (
        <form className="flex items-center gap-1" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Movies..."
            className="p-2 rounded-md outline-none bg-black bg-opacity-10 placeholder:text-white text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-violet-700 rounded-md hover:bg-violet-800"
            type="submit"
            title="search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </form>
      )}

      <div className="text-white">
        <Link to="/watchlist">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default Header
