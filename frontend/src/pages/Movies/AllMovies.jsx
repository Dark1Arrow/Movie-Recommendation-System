import { useGetAllMoviesQuery, useGetRandomMoviesQuery, useGetNewMoviesQuery, useGetTopMoviesQuery } from "../../redux/api/movie"
import { useFetchGenreQuery } from "../../redux/api/genre"
import MovieCard from "./MovieCard"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import banner from "../../asstes/banner.jpg"
import { setFilterdMovie, setMoviesFilter, setMoviesYears, setUniqueYears } from "../../redux/features/movies/movieSlice"

const AllMovies = () => {
    const dispatch = useDispatch()
    const { data } = useGetAllMoviesQuery()
    const { data: newMovies } = useGetNewMoviesQuery()
    const { data: genres } = useFetchGenreQuery()
    const { data: randomMovies } = useGetRandomMoviesQuery()
    const { data: topMovies } = useGetTopMoviesQuery()

    const { moviesFilter, filterdMovies } = useSelector((state) => state.movies)
    console.log(moviesFilter)

    const movieYears = data?.map((movie) => movie.year)
    const uniqueYear = Array.from(new Set(movieYears))

    useEffect(() => {
        dispatch(setFilterdMovie(data || []));
        dispatch(setMoviesYears(movieYears))
        dispatch(setUniqueYears(uniqueYear))
    }, [data, dispatch])

    const handleGenreClick = (genreId) => {
        const filterByGenre = data.filter((movie) => movie.genre === genreId)
        dispatch(setFilterdMovie(filterByGenre))
    }

    const handleSarchChange = (e) => {
        dispatch(setMoviesFilter({ searchTerm: e.target.value }));

        const filterdMovies = data.filter((movie) => movie.name.toLowerCase().includes(e.target.value.toLowerCase()))

        dispatch(setFilterdMovie(filterdMovies))
    }
    const handleYearChange = (year) => {
        const filterByYear = data.filter(movie => movie.year === +year)
        dispatch(setFilterdMovie(filterByYear))
    }
    const handleSortChange = (sortOption) => {
        switch (sortOption) {
            case "newMovies":
                dispatch(setFilterdMovie(newMovies))
                break;
            case "topMovies":
                dispatch(setFilterdMovie(topMovies))
                break;
            case "randomMovies":
                dispatch(setFilterdMovie(randomMovies))
                break;

            default:
                dispatch(setFilterdMovie([]))
                break;
        }
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]">
            <section>
                <div className="relative h-[43rem] w-[99vw] mb-10 flex items-center justify-center bg-cover"
                    style={{ backgroundImage: `url(${banner})` }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>

                    <div className="relative z-10 text-center text-white mt-[10rem]">
                        <h1 className="text-8xl font-bold mb-4">The Movies Hub</h1>
                        <p className="text-2xl">Cinematic Odyssey: Unveiling the Magic of Movies</p>
                    </div>
                    <section className="absolute bottom-[1rem]">
                        <input type="text" className="w-[100%] h-[5rem] border px-10 outline-none rounded" placeholder="Search Movie" value={moviesFilter.searchTerm} onChange={handleSarchChange} />

                        <section className="sorts-container mt-[2rem] ml-[10rem] w-[30rem]">
                            <select className="border p-2 rounded text-black bg-white" value={moviesFilter.selectedGenre} onChange={(e) => handleGenreClick(e.target.value)}>
                                <option value="">Genres</option>
                                {genres?.map((genre) => (
                                    <option value={genre._id} key={genre._id}>{genre.name}</option>
                                ))}
                            </select>

                            <select className="rounded ml-5 p-2 text-black bg-white border" value={moviesFilter.selectedYear} onChange={(e) => handleYearChange(e.target.value)}>
                                <option value="">Year</option>
                                {uniqueYear?.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>

                            <select className="rounded ml-5 p-2 text-black bg-white border" value={moviesFilter.selectedSorts} onChange={(e) => handleSortChange(e.target.value)}>
                                <option value="">Sort By</option>
                                <option value="newMovies">New Movies</option>
                                <option value="topMovies">Top Movies</option>
                                <option value="randomMovies">Random Movies</option>
                            </select>
                        </section>
                    </section>
                </div>
                <section className="mt-[10rem] w-screen flex justify-center items-center flex-wrap">
                    {filterdMovies?.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </section>
            </section>
        </div>
    )
}

export default AllMovies
