import express from "express";
import { followUser, getUser, unfollowUser, updateUser } from "../controllers/userController.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protectedRoute)

router.get("/me", getUser);
router.patch("/me", updateUser);
router.post("/:id/follow", followUser);
router.delete("/:id/follow", unfollowUser);


export default router;


// Users GET /api/v1/users/me profile of logged-in user
// Users PATCH /api/v1/users/me name, avatar, cover
// Users POST /api/v1/users/:id/follow follow user
// Users DELETE /api/v1/users/:id/follow unfollow user