import { Link } from 'react-router-dom'

const MovieCard = ({ Title, Year, Type, Poster, imdbID }: Movies) => {
  return (
    <div className=" w-full lg:flex justify-start rounded-md">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l-md text-center overflow-hidden lg:rounded-r-md bg-no-repeat"
        style={{
          backgroundImage: `url(${Poster})`,
        }}
      ></div>
      <div className="  bg-gray-700 rounded-b p-3 flex flex-col justify-between gap-2 lg:rounded-r-md flex-grow">
        <div className="text-white font-bold text-xl">{Title}</div>
        <p className="text-sm text-gray-200">
          Year-<span className="font-medium text-white">{Year}</span>
        </p>
        <p className="font-medium py-1 px-2 bg-pink-500 text-white rounded-md text-sm w-fit">
          {Type}
        </p>
        <Link
          className="px-4 py-2 bg-violet-600 text-white rounded-md font-bold text-center hover:bg-violet-700"
          to={`/movie/${imdbID}`}
        >
          Read More
        </Link>
      </div>
    </div>
  )
}

export default MovieCard
