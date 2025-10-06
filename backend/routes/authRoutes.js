import express from "express";
import { loginUser, logoutUser, signupUser } from "../controllers/authController.js";

const router = express.Router();


router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);


export default router;


// Auth POST /api/v1/auth/signup email, password → creates user (hash password)
// Auth POST /api/v1/auth/login email, password → sets HttpOnly JWT cookie
// Auth POST /api/v1/auth/logout clears cookie