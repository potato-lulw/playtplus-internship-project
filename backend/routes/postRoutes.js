import express from "express";
import { createPost, getPosts, likePost, createComment, replyComment, reportPost } from "../controllers/postController.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protectedRoute);

router.post('/createpost', createPost);
router.get('/posts', getPosts);
router.post('/posts/:id/like', likePost);
router.post('/posts/:id/report', reportPost);
router.post('/posts/:id/comments', createComment);
router.post('/comments/:id/replies', replyComment);

export default router;


// Posts POST /api/v1/createpost text, image → create post (example prefix retained)
// Posts GET /api/v1/posts paginated feed
// Posts POST /api/v1/posts/:id/like toggle like/dislike via payload {type: 'like'|'dislike'}
// Posts POST /api/v1/posts/:id/report reason
// Comments POST /api/v1/posts/:id/comments text → new comment
// Comments POST /api/v1/comments/:id/replies text → reply (optional/bonus)