import express from "express";
import { createPost, getPosts, likePost, createComment, replyComment, reportPost, getPostsByUserId, dislikePost } from "../controllers/postController.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

router.use(protectedRoute);

router.post('/createpost', upload.single("image"), createPost);
router.get('/all', getPosts);
router.get('/:id', getPostsByUserId);
router.put('/like/:id', likePost);
router.put('/dislike/:id', dislikePost);
router.post('/:id/report', reportPost);
router.post('/:id/comments', createComment);
router.post('/comments/:id/replies', replyComment);

export default router;


// Posts POST /api/v1/createpost text, image → create post (example prefix retained)
// Posts GET /api/v1/posts paginated feed
// Posts POST /api/v1/posts/:id/like toggle like/dislike via payload {type: 'like'|'dislike'}
// Posts POST /api/v1/posts/:id/report reason
// Comments POST /api/v1/posts/:id/comments text → new comment
// Comments POST /api/v1/comments/:id/replies text → reply (optional/bonus)