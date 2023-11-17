import { useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard'

const Home = () => {
  const state: MovieState = useSelector((state) => state.movie)
  return (
    <main className="mx-16 my-4">
      {state.movies.length === 0 ? (
        <div className="flex justify-center align-center text-white">
          <h1>Search for Movies...</h1>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-4 justify-items-center">
          {state.movies.map((movie) => (
            <MovieCard {...movie} key={movie.imdbID} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Home
