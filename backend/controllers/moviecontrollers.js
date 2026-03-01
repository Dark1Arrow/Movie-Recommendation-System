import Movie from "../models/Movie.js"

const createMovie = async (req, res) => {
    try {
        const newMovie = await Movie(req.body)
        const savedMovie = await newMovie.save()
        res.json(savedMovie)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

const getSpecificMovie = async (req, res) => {
    try {
        const { id } = req.params
        const specificMovie = await Movie.findById(id)
        if (!specificMovie) {
            res.status(404).json({ message: "Movie not found" })
        }
        res.json(specificMovie)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateMoveie = async (req, res) => {
    try {
        const { id } = req.params
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedMovie) {
            res.status(404).json({ message: "Movie not found" })
        }
        res.json(updatedMovie)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const movieReview = async (req, res) => {
    try {
        const { rating, comment } = req.body
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            const alreadyReviesd = movie.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            )
            if (alreadyReviesd) {
                res.status(404).json({ message: "Movie is already reviewe" })
            } else {

                const review = {
                    name: req.user.username,
                    rating: Number(rating),
                    comment,
                    user: req.user._id
                }
                movie.reviews.push(review)
                movie.numReviews = movie.reviews.length
                movie.rating = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length
                await movie.save()
                res.status(201).json({ message: "Review added" })
            }
        } else {
            res.status(404)
            throw new Error("Movie not found")
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params
        const deleteMovie = await Movie.findByIdAndDelete(id)
        if (!deleteMovie) {
            res.status(404).json({ message: "Movie not found" })
        } else {
            res.json({ message: "Movie delete successfully" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteComment = async (req, res) => {
    try {
        const { movieId, reviewId } = req.body
        const movie = await Movie.findById(movieId)

        if (!movieId) {
            res.status(404).json({ message: "Movie not found" })
        }
        const reviewIndex = movie.reviews.findIndex((r) => r._id.toString() === reviewId)
        if (reviewIndex === -1) {
            res.status(401).json({ message: "comment not found" })
        }
        movie.reviews.splice(reviewIndex, 1)
        movie.numReviews = movie.reviews.length
        movie.rating = movie.reviews.length > 0 ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length : 0

        await movie.save()
        res.json({ message: "Comment delete successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getNewMovie = async (req, res) => {
    try {
        const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10)
        res.json(newMovies)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getTopMovies = async (req, res) => {
    try {
        const topRatedMovie = await Movie.find().sort({ numReviews: -1 }).limit(10)
        res.json(topRatedMovie)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getRandomMovie = async (req, res) => {
    try {
        const randomMovie = await Movie.aggregate([{ $sample: { size: 10 } }])
        res.json(randomMovie)
    } catch (error) {
        res.json({ error: error.message })
    }
}

export { createMovie, getAllMovies, getSpecificMovie, updateMoveie, movieReview, deleteMovie, deleteComment, getNewMovie, getTopMovies, getRandomMovie }