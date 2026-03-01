import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFetchGenreQuery } from "../../redux/api/genre.js"
import { toast } from "react-toastify"
import { useCreateMovieMutation, useUploadImageMutation } from "../../redux/api/movie.js"

const CreateMovie = () => {

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

    const [createMovie, { isLoading: isCreatingMovie, error: createMovieErrorDetails }] = useCreateMovieMutation()

    const [uploadingImage, { isLoading: isUploadingMovie, error: uploadingImageErrorDetails }] = useUploadImageMutation()

    const { data: genres, isLoading: isLoadingGenres } = useFetchGenreQuery()

    useEffect(() => {
        if (genres) {
            setMovieData((prevData) => ({
                ...prevData, genre: genres[0]?._id || ""
            }))
        }
    }, [genres])

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "genre") {
            const selectGenre = genres.find((genre) => genre.name === value)
            setMovieData((prevData) => ({
                ...prevData,
                genre: selectGenre ? selectGenre._id : " "
            }))
        } else {
            setMovieData((prevData) => ({
                ...prevData,
                [name]: value
            }))
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setSelectedImage(file)
    }

    const handleCreateMovie = async () => {
        try {
            if (
                !movieData.name ||
                !movieData.year ||
                !movieData.detail ||
                !movieData.cast ||
                !selectedImage
            ) {
                toast.error("Plese fill all required fields")
                return
            }

            let uploadImagePath = null

            if (selectedImage) {
                const formData = new FormData()
                formData.append("image", selectedImage)

                const uploadImageResponse = await uploadingImage(formData)

                if (uploadImageResponse.data) {
                    uploadImagePath = uploadImageResponse.data.image
                } else {
                    console.log("Failed to upload image", uploadingImageErrorDetails)
                    toast.error("Failed to upload image")
                    return;
                }
                const data  = await createMovie({
                    ...movieData,
                    image: uploadImagePath,
                })
                
                navigate("/admin/movies-list")

                setMovieData({
                    name: "",
                    year: 0,
                    detail: '',
                    cast: [],
                    rating: 0,
                    image: null,
                    genre: ""
                })
                toast.success("Movie added to database")
            }
        } catch (error) {
           console.error("Failed to create movie : ",createMovieErrorDetails)
           toast.error(`Failed to create movie : ${createMovieErrorDetails?.message}`);
        }
    }

    return (
        <div className="container flex justify-center items-center mt-4">
            <form action="">
                <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
                <div className="mb-4">
                    <label className="block">
                        Name:
                        <input type="text" name="name" value={movieData.name} placeholder="Enter movie name" onChange={handleChange} className="border w-full px-2 py-1" />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block">
                        Year:
                        <input type="number" name="year" value={movieData.year} placeholder="Enter movie year" onChange={handleChange} className="border w-full px-2 py-1" />
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block">
                        Detail:
                        <textarea name="detail" value={movieData.detail} onChange={handleChange} className="border w-full px-2 py-1" placeholder="Enter movie details"></textarea>
                    </label>
                </div>

                <div className="mb-4">
                    <label className="block">
                        Cast (coma-separated):
                        <input type="text" name="cast" value={movieData.cast.join(", ")} placeholder="Enter movie cast" onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split((", ")) })} className="border w-full px-2 py-1" />
                    </label>
                </div>  

                <div className="mb-4">
                    <label className="block">
                        Genre:
                        <select name="genre" value={movieData.genre} onChange={handleChange} className="border bg-white text-black w-full px-2 py-1">
                            {isLoadingGenres ? (<option>Loading genres...</option>) : (genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            )))}
                        </select>
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
                <button type="button" onClick={handleCreateMovie} className="bg-teal-500 text-white px-4 py-2 rounded" disabled={isCreatingMovie || isUploadingMovie}>
                    {isCreatingMovie || isUploadingMovie ? "Creating..." : "Create Movie "}
                </button>
            </form>
        </div>
    )
}

export default CreateMovie
