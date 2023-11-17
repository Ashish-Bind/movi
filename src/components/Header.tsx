import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getMoviesSuccess } from '../redux/slice'

const Header = () => {
  const [search, setSearch] = useState<string>('')
  const dispatch = useDispatch()

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!search) {
      return
    }

    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?s=${search}&apikey=${
          import.meta.env.VITE_API_KEY
        }`
      )
      dispatch(getMoviesSuccess(data.Search))
      setSearch('')
    } catch (err) {
      alert('Something went wrong')
    }
  }

  return (
    <div className="bg-violet-500 text-white flex p-4 items-center justify-between">
      <Link
        className="text-3xl transition-colors cursor-pointer font-semibold"
        to="/"
      >
        🎞️ Movi
      </Link>

      <form className="flex items-center gap-1" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Movies..."
          className="p-2 rounded-md outline-none bg-black bg-opacity-10 placeholder:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-violet-700 rounded-md hover:bg-violet-800"
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="text-white">
        <Link to="/watchlist">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default Header
