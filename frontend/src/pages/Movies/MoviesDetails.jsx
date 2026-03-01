import { useState } from "react"
import { Link, parsePath, useParams } from "react-router"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useGetSpecificMovieQuery, useAddMovieReviewsMutation } from "../../redux/api/movie"
import MovieTabs from "./MovieTabs"

const MoviesDetails = () => {
  const { id: movieId } = useParams()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId)
  const { userInfo } = useSelector((state) => state.auth)
  const [createReview, { isLoading: loadingMovieReview }] = useAddMovieReviewsMutation()

  const submitHandler = async(e) =>{
    e.preventDefault()

    try {
      await createReview({
        id: movieId,
        rating,
        comment
      }).unwrap()

      refetch()
     
      toast.success("Review created successfully")

    } catch (error) {
      console.log(error.data.mes)
      toast.error(error.data.message || error.data )
    }
  }

  return (
    <>
      <div>
        <Link to='/' className="text-white font-semibold hover:underline ml-[10rem]">
          Go Back
        </Link>
      </div>

      <div className="mt-[2rem]">
        <div className="flex justify-center items-center">
          <img src={movie?.image} alt={movie?.name} className=" rounded" />
        </div>

        {/* Container one  */}
        <div className="container max-w-[70%] flex justify-between ml-[10rem] mt-[3rem]">
          <section>
            <h2 className="text-5xl my-4 font-extrabold">{movie?.name}</h2>
            <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0] ">{movie?.detail}</p>
          </section>

          <div className="mr-[5rem]">
            <p className="text-2xl font-semibold">
              {movie?.year}
            </p>

            <div>
              {movie?.cast.map((e) => (
                <ul key={e._id} className={e._id}>
                  <li className="mt-[1rem]">{e}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="container max-w[60%] ml-[10rem]">
          <MovieTabs loadingMovieReview = {loadingMovieReview} userInfo = {userInfo} submitHandler = {submitHandler} rating={ rating} setRating = {setRating} comment={comment} setComment = {setComment} movie={movie} />
        </div>
      </div>

    </>
  )
}

export default MoviesDetails
