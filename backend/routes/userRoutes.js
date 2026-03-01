import express from "express";

const router = express.Router()

// Controllers
// Middlewares
import { createUser, loginUser, logoutCurrentUser, getAllUser, getCurrentUserProfile, updateCurrentUserProfile } from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";


router.route("/").post(createUser).get(authenticate, authorizeAdmin, getAllUser);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router.route("/profile").get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile)

export default router;