import SecondaryCard from "./SecondaryCard"
import RealTimeCard from "./RealTimeCard"
import VideoCard from "./VideoCard"
import { useGetAllMoviesQuery, useGetTopMoviesQuery } from "../../../../redux/api/movie"
import { useGetUsersQuery } from "../../../../redux/api/users"

const Main = () => {
    const { data: topMovies } = useGetTopMoviesQuery()
    const { data: allMovies } = useGetAllMoviesQuery()
    const { data: visitor } = useGetUsersQuery()

    const totalCommentLength = allMovies?.map((m) => m.numReviews)
    const sumOfCommentLength = totalCommentLength?.reduce((acc, length) => acc + length, 0)

    return (
        <div>
            <section className="flex justify-around">
                <div className="ml-[14rem] mt-10">
                    <div className="-translate-x-4 flex">
                        <SecondaryCard pill="Users" content={visitor?.length} info="30.3k more than usual" gradient="from-teal-500 to-lime-400" />

                        <SecondaryCard pill="Comment" content={sumOfCommentLength} info="742.8 more than usual" gradient="from-[#CCC514] to-[#CDCBEE]" />

                        <SecondaryCard pill="Movies" content={allMovies?.length} info="372+ more than usual" gradient="from-green-500 to-lime-400" />
                    </div>

                    <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
                        <div>Top Content</div>
                        <div>Comment</div>
                    </div>

                    {topMovies?.map((movie) => (
                    <VideoCard key={movie._id} image={movie.image} title={movie.name} date={movie.year} comment={movie.numReviews} />
                ))}

                </div>

                <div>
                    <RealTimeCard /> 
                </div>

            </section>
        </div>
    )
}

export default Main
