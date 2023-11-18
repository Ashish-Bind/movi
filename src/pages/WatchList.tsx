import { useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard'

const WatchList = () => {
  const state = useSelector((state) => state.watchList)

  return (
    <main>
      <div className="text-center text-white">
        {state.movies.length > 0
          ? `Found ${state.movies.length} movies in watchlist`
          : 'No movies added in watchlist'}
      </div>
      <div className="grid lg:mx-16 lg:grid-cols-3 gap-4 p-4 rounded-md">
        {state.movies.map((item) => {
          return <MovieCard {...item} key={item.imdbID} />
        })}
      </div>
    </main>
  )
}

export default WatchList
