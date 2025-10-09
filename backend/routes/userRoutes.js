import express from "express";
import { followUser, getAllUsers, getFollowList, getUser, updateUser } from "../controllers/userController.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";
import upload  from "../config/multer.js";
const router = express.Router();

router.use(protectedRoute)

router.get("/following", getFollowList);
router.get("/all", getAllUsers);
router.get("/:id", getUser);
router.patch("/me", upload.fields([{ name: "avatar", maxCount: 1 }, {name: "cover", maxCount: 1}]), updateUser);
router.post("/:id/follow", followUser);



export default router;


// Users GET /api/v1/users/me profile of logged-in user
// Users PATCH /api/v1/users/me name, avatar, cover
// Users POST /api/v1/users/:id/follow follow user
// Users DELETE /api/v1/users/:id/follow unfollow user