import { useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard'

const Home = () => {
  const state: MovieState = useSelector((state: State) => state.movie)

  if (state.loading) {
    return (
      <div className="text-white text-xl flex items-center justify-center mt-4">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <main className="lg:mx-16 m-4">
      {state.movies?.length < 1 ? (
        <div className="flex justify-center align-center text-white">
          <h1>Search for Movies...</h1>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-4 justify-items-center">
          {state.movies?.map((movie) => (
            <MovieCard {...movie} key={movie.imdbID} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Home
