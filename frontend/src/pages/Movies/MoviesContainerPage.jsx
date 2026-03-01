import { useState } from "react"
import { useGetNewMoviesQuery, useGetTopMoviesQuery, useGetRandomMoviesQuery } from "../../redux/api/movie.js"
import { useFetchGenreQuery } from "../../redux/api/genre.js"
import SliderUtils from "../../component/SliderUtils"

const MoviesContainerPage = () => {
    const { data } = useGetRandomMoviesQuery()
    const { data: topMovies } = useGetTopMoviesQuery()
    const { data: randomMovies } = useGetRandomMoviesQuery()
    const { data: genres } = useFetchGenreQuery()

    console.log( "top movie: ",topMovies)
    console.log("random movie: ",randomMovies)
    console.log("genres : ",genres)
    console.log("data: ",data)

    const [selectedGenre, setSelectedGenre] = useState(null)

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId)
    }

    const filterdMovies = data?.filter((movie) => selectedGenre === null || movie.genre === selectedGenre);

    return (
        <div className="flex flex-col lg:flex-row lg:justify-around items-center">
            <nav className=" ml-[4rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row">
                {genres?.map((genre) => (
                    <button key={genre._id} className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-[1rem] text-lg ${selectedGenre === genre._id ? "bg-gray-200" : ""
                        }`} onClick={() => handleGenreClick(genre._id)}>{genre.name}</button>
                ))}
            </nav>
            <section className="flex flex-col justify-center items-center w-[full] lg:w-auto">
                <div className=" w-full lg:w-[70rem] mr-0 md:mr-2">
                    <h1 className="mb-5">Choose For You</h1>
                    <SliderUtils data={randomMovies} />
                </div>
                <div className=" w-full lg:w-[70rem] mr-0 md:mr-2">
                    <h1 className="mb-5">Top Movie</h1>
                    <SliderUtils data={topMovies} />
                </div>

                <div className=" w-full lg:w-[70rem] mr-0 md:mr-2">
                    <h1 className="mb-5">Choose Movie</h1>
                    <SliderUtils data={filterdMovies} />
                </div>
            </section>
        </div>
    )
}

export default MoviesContainerPage
