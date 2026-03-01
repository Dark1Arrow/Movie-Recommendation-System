import expres from "express"
const router = expres.Router()

// Controllers
import { createMovie,getAllMovies,getSpecificMovie,updateMoveie,movieReview,deleteMovie,deleteComment,getNewMovie,getTopMovies,getRandomMovie } from "../controllers/moviecontrollers.js"
// Middlewares
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js"
import checkId from "../middleware/checkId.js"
import Movie from "../models/Movie.js"

// Public routes
router.get("/all-movie",getAllMovies)
router.get("/specific-movie/:id",getSpecificMovie)
router.get("/new-movies",getNewMovie)
router.get("/top-movies",getTopMovies)
router.get("/random-movies",getRandomMovie)

// Restricted routes
router.post("/:id/reviews",authenticate,checkId,movieReview)

// Admin routes
router.post("/create-movie", authenticate, authorizeAdmin, createMovie)
router.put("/update-movie/:id", authenticate, authorizeAdmin, updateMoveie)
router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie)
router.delete("/delete-comment",authenticate,authorizeAdmin,deleteComment)

export default router