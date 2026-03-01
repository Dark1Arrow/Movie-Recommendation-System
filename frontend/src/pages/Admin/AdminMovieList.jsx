import { Link } from "react-router-dom"
import { useGetAllMoviesQuery } from "../../redux/api/movie"

const AdminMovieList = () => {
    const { data: movies } = useGetAllMoviesQuery()
    return (
        <div className="container px-[9rem]">
            <div className="flex flex-col md:flex-row">
                <div className="p-3">
                    <div className="ml-[2rem] text-xl font-bold h-12 ">
                         All Movies ({movies?.length})
                    </div>

                    <div className="flex flex-wrap justify-around items-center p-[2rem]">
                        {movies?.map((movie) => (
                            <Link to={ `/admin/movies/update/${movie._id}`} className="bg-black mb-4 overflow-hidden">
                                <div className="flex flex-col">
                                    <div className="max-w-sw m-[2rem] rounded overflow-hidden shadow-lg" key={movie._id}>
                                        <img src={movie.image} alt={movie.name} className=" max-w-[40rem] max-h-[50rem] object-cover m-auto" />
                                        <div className="px-6 py-4 border border-gray-400">
                                        <div className="font-bold text-xl mb-2 max-w-70">{movie.name}</div>
                                    </div>
                                    <p className="text-gray-700 max-w-70 text-base">
                                        {movie.detail}
                                    </p>
                                    <div className="mt-[2rem] mb-[1rem]">
                                        <Link to={`/admin/movies/update/${movie._id}`} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                                        Update Movie
                                         </Link>
                                    </div>
                                    
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMovieList
