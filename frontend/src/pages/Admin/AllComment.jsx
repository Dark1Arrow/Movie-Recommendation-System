import { useDeleteCommentMutation, useGetAllMoviesQuery,  } from "../../redux/api/movie"
import { toast } from "react-toastify"
const AllComment = () => {
    const {data: movie, refetch} = useGetAllMoviesQuery()
    const [deleteComment] = useDeleteCommentMutation()

    const handleDeleteComment = async (movieId , reviewId) =>{
        try {
            await deleteComment({movieId,reviewId})
            console.log("hey")
            toast.success("Comment deleted successfully ")
            refetch()
        } catch (error) {
            toast.error("Error in Deleteing comment : " , error)
        }
    }

  return (
    <div>
      {movie?.map((m)=>(
        <section key={m._id} className="flex flex-col justify-center items-center">
            {m?.reviews.map((review) => (
                <div key={review._id} className="bg-[#1A1A1A] rounded-lg p-4 w-[50%] mt-[2rem]" >
                    <div className="flex justify-between">
                        <strong className="text-[#B0B0B0]">{review.name}</strong>
                        <p className="text-[#B0B0B0]">{review.createdAt.substring(0,10)}</p>
                    </div>

                    <p className="my-4">{review.comment}</p>

                    <button onClick={() => handleDeleteComment(m._id, review._id)} className="text-red-500">Delete</button>
                </div>
            ))}
        </section>
      ))}
    </div>
  )
}

export default AllComment
