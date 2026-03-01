//Files
import dotenv from "dotenv"
import path from "path"
import express, { Router } from "express"
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import  userRoutes  from "./routes/userRoutes.js"
import genreRoutes from "./routes/genreRoutes.js"
import moviesRoutes from "./routes/moviesRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"

// Configureation
dotenv.config()
connectDB()

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extends: true }))
app.use(cookieParser())

const PORT = process.env.PORT || 3000

// Router

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movie", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);

const _dirname = path.resolve()
app.use("/uploads", express.static(path.join(_dirname + "/uploads")))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));