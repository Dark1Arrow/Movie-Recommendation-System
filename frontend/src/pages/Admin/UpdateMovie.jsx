import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useUpdatedMovieMutation, useGetSpecificMovieQuery, useUploadImageMutation, useDeleteMovieMutation } from "../../redux/api/movie.js"
import { toast } from "react-toastify"

const UpdateMovie = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [movieData, setMovieData] = useState({
        name: "",
        year: 0,
        detail: '',
        cast: [],
        rating: 0,
        image: null,
        genre: ""
    })

    const [selectedImage, setSelectedImage] = useState(null)
    const { data: initialMovieData } = useGetSpecificMovieQuery(id)

    useEffect(() => {
        if (initialMovieData) {
            setMovieData(initialMovieData)
        }
    }, [initialMovieData])

    const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdatedMovieMutation()
    const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation()

    const [deleteMovie] = useDeleteMovieMutation()

    const handleChange = (e) => {
        const { name, value } = e.target
        setMovieData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setSelectedImage(file)
    }
    const handleUpdateMovie = async () => {
        try {
            if (
                !movieData.name ||
                !movieData.year ||
                !movieData.detail ||
                !movieData.cast
            ) {
                toast.error("Please enter all required fields")
                return;
            }

            let uploadedImagePath = movieData.image

            if (selectedImage) {
                const formData = new FormData()
                formData.append('image', selectedImage)

                const uploadImageResponse = await uploadImage(formData)

                if (uploadImageResponse.data) {
                    uploadedImagePath = uploadImageResponse.data.image
                } else {
                    console.error("Failed to upload Image: ", uploadImageErrorDetails)
                    toast.error("Failed to upload image")
                    return
                }
            }

            await updateMovie({
                id: id,
                updatedMovie: {
                    ...movieData,
                    image: uploadedImagePath
                }
            })
            navigate("/movies")
        } catch (error) {
            console.error("Failed to update movie : ", error)
            toast.error("Failed to update movie ", error?.message)
        }
    }
    const handleDeleteMovie = async () => {
        try {
            await deleteMovie(id)
            toast.success("Movie deleted succesfully") 
            navigate("/movies")
        } catch (error) {
            console.error("Failed to update movie : ", error)
            toast.error("Failed to update movie ", error?.message)
        }
    }

    return (
        <div className="container flex justify-center item-center mt-4">
            <form >
                <p className="text-gray-200 w-[50rem] text-2xl mb-4">Update Movie</p>
                <div className="mb-4">
                    <label className="block">
                        Label:
                        <input type="text" name="name" value={movieData.name} onChange={handleChange} className="px-2 py-1 border w-full" />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block">
                        Year:
                        <input type="number" name="year" value={movieData.year} onChange={handleChange} className="px-2 py-1 border w-full" />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block">
                        Detail:
                        <textarea type="text" name="detail" value={movieData.detail} onChange={handleChange} className="px-2 py-1 border w-full" />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block">
                        Cast (coma-separated):
                        <input type="text" name="cast" value={movieData.cast.join(", ")} onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(", ") })} className="px-2 py-1 border w-full" />
                    </label>
                </div>
                <div className="mb-4">
                    <label style={!selectedImage ? { border: "1px solid #888", borderRadius: "5px", padding: "8px" } : {
                        border: 0,
                        borderRadius: 0,
                        padding: 0
                    }}>
                        {!selectedImage && "Upload Image"}
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: !selectedImage ? "none" : "block" }} />
                    </label>
                </div>
                <button type="button" onClick={handleUpdateMovie} className="bg-teal-500 text-white px-4 py-2 rounded" disabled={isUpdatingMovie || isUploadingImage}>
                    {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
                </button>
                <button type="button" onClick={handleDeleteMovie} className="bg-red-500 text-white mx-4 px-4 py-2 rounded" disabled={isUpdatingMovie || isUploadingImage}>
                    {isUpdatingMovie || isUploadingImage ? "Deleting..." : "Delete Movie"}
                </button>
            </form>
        </div>
    )
}

export default UpdateMovie
