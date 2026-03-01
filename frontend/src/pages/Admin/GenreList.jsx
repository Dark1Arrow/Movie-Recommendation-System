import { useState } from "react"
import { useCreateGenreMutation, useDeleteGenreMutation, useFetchGenreQuery, useUpdateGenreMutation } from "../../redux/api/genre.js"

import { toast } from "react-toastify"
import GenreForm from "../../component/GenreForm.jsx"
import Model from "../../component/Model.jsx"

const GenreList = () => {

  const { data: genres, refetch } = useFetchGenreQuery()
  const [name, setName] = useState("")
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [updatingName, setUpdatingName] = useState("")
  const [modelVisisble, setModelVisisble] = useState(false)

  const [createGenre] = useCreateGenreMutation()
  const [updateGenre] = useUpdateGenreMutation()
  const [deleteGenre] = useDeleteGenreMutation()

  const handleCreateGenre = async (e) => {
    e.preventDefault()

    if (!name) {
      toast.error("Name is required")
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap()

      if (result.error) {
        toast.error("We get some Error")
      } else {
        setName("")
        toast.success(`${result.name} is created`)
        refetch()
      }

    } catch (error) {
      console.log(error)
      toast.error("Creating genre failed try agian")
    }
  }

  const handleUpdateGenre = async (e) => {
    e.preventDefault()

    if (!updateGenre) {
      toast.error("Genre name is required")
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName
        }
      }).unwrap()

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`${result.name} is updated`)
        refetch()
        setModelVisisble(false)
        setSelectedGenre(null)
        setUpdatingName("")
      }
    } catch (error) {
      console.log(error)
      toast.error("Creating genre failed try agian")
    }
  }

  const handleDeleteGenre = async() => {
    try {
        const result = await deleteGenre(selectedGenre._id).unwrap()
        if(result.error){
          toast.error(result.error)
        }else{
          toast.success(`${result.name} is deleted`)
          refetch()
          setModelVisisble(false)
          setSelectedGenre(null)
        }
    } catch (error) {
      console.log(error)
      toast.error("Creating genre failed try agian")
    }
  }

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h1 className="h-12">
          Manage Genre
        </h1>

        <GenreForm value={name} setValue={setName} handleSubmit={handleCreateGenre} />

        <br />

        <div className="flex flex-wrap">
          {genres?.map((genre) => (
            <div key={genre._id}>
              <button className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50" onClick={() => {
                {
                  setModelVisisble(true)
                  setSelectedGenre(genre)
                  setUpdatingName(genre.name)
                }
              }}>{genre.name}</button>
            </div>
          ))}
        </div>

        <Model isOpen={modelVisisble} onClose={() => setModelVisisble(false)}>
          <GenreForm value={updatingName} setValue={(value) => setUpdatingName(value)} handleSubmit={handleUpdateGenre} button="Update" handleDelete={handleDeleteGenre} />
        </Model>
      </div>
    </div>
  )
}

export default GenreList
