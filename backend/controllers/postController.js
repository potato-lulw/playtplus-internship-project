// Posts POST /api/v1/createpost text, image → create post (example prefix retained)
// Posts GET /api/v1/posts paginated feed
// Posts POST /api/v1/posts/:id/like toggle like/dislike via payload {type: 'like'|'dislike'}
// Posts POST /api/v1/posts/:id/report reason
// Comments POST /api/v1/posts/:id/comments text → new comment
// Comments POST /api/v1/comments/:id/replies text → reply (optional/bonus)


import mongoose from "mongoose";
import { Comment } from "../models/comment.js";
import { Post } from "../models/post.js";
import { Report } from "../models/report.js";

export const createPost = async (req, res) => {
  try {
    const { text, author } = req.body;

    if (!text || !author) {
      return res.status(400).json({ message: "Missing text or author" });
    }

    // If image uploaded, multer-cloudinary puts info in req.file
    const imageUrl = req.file ? req.file.path : null;

    const post = new Post({
      author,
      text,
      image: imageUrl,
    });

    await post.save();
    const savedPost = await Post.findById(post._id).populate("author", "name avatar email _id").populate("likes", "_id name avatar email").populate("dislikes", "_id name avatar email").populate("comments", "_id postId author text createdAt name");

    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {

    console.error("Error creating post:", JSON.stringify(error, Object.getOwnPropertyNames(error)) || error);
    res.status(500).json({ message: "Server error while creating post" });
  }
};


export const getPosts = async (req, res) => {
  try {
    const { _id } = req.user;

    // find all posts the current user has reported
    const reportedPostIds = await Report.find({
      targetType: "post",
      reporter: _id,
    }).distinct("targetId");

    // exclude posts authored by current user and those reported by current user
    const posts = await Post.find({
      author: { $ne: _id },
      _id: { $nin: reportedPostIds },
    })
      .sort({ createdAt: -1 })
      .populate("author", "name avatar email _id")
      .populate("likes", "_id name avatar email")
      .populate("dislikes", "_id name")
      .populate("comments", "_id postId author text createdAt name");

    if (!posts || posts.length === 0)
      return res.status(404).json({ message: "No posts found" });

    res.status(200).json({ message: "Fetched all posts", posts });
  } catch (error) {
    console.error("Error getting posts:", error.message || error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
};
export const getPostsByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // find all posts the current user has reported
    const reportedPostIds = await Report.find({
      targetType: "post",
      reporter: userId,
    }).distinct("targetId");

    // exclude reported posts from this user's list
    const posts = await Post.find({
      author: id,
      _id: { $nin: reportedPostIds },
    })
      .sort({ createdAt: -1 })
      .populate("author", "name avatar email _id")
      .populate("likes", "_id name avatar email")
      .populate("dislikes", "_id name")
      .populate("comments", "_id postId author text createdAt name");

    if (!posts || posts.length === 0)
      return res.status(404).json({ message: "No posts found" });

    res.status(200).json({ message: "Get posts", posts });
  } catch (error) {
    console.error("Error getting posts:", error.message || error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
};


export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    const { likerId } = req.body;
    const post = await Post.findById(id).populate("likes", "_id");
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.likes.includes(likerId)) {
      post.likes.pull(likerId);
      await post.save();
      res.status(200).json({ message: "Post unliked", post });
    }
    else {
      if (post.dislikes.includes(likerId)) {
        post.dislikes.pull(likerId);
      }
      post.likes.push(likerId);
      await post.save();
      res.status(200).json({ message: "Post liked", post });
    }

  } catch (error) {
    console.log("Error liking post: ", error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
}
export const dislikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { likerId } = req.body;
    const post = await Post.findById(id).populate("dislikes", "_id");
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.dislikes.includes(likerId)) {
      post.dislikes.pull(likerId);
      await post.save();
      res.status(200).json({ message: "Post undisliked", post });
    } else {
      if (post.likes.includes(likerId)) {
        post.likes.pull(likerId);
      }
      post.dislikes.push(likerId);
      await post.save();
      res.status(200).json({ message: "Post disliked", post });
    }
  } catch (error) {
    console.log("Error disliking post: ", error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
}


export const reportPost = async (req, res) => {
  try {
    const reporterId = req.user._id;
    const { id } = req.params; // reported post id
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: "Reason is required" });
    }

    // check if post exists
    const targetPost = await Post.findById(id);
    if (!targetPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const report = new Report({
      targetType: "post",
      targetId: id,
      reason,
      reporter: reporterId,
    });

    await report.save();

    res.status(201).json({
      message: "Post reported successfully",
      report,
    });
  } catch (error) {
    console.error("Error reporting post:", error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};


export const createComment = async (req, res) => {
  try {
    const { id: postId } = req.params; 
    const { text, parentId  } = req.body;
    const { _id: userId, name } = req.user;

    console.log(userId)

    if (!text || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid comment or post ID" });
    }

    

    // Create new comment
    const newComment = new Comment({
      postId,
      author: userId,
      text,
      name,
      parentId: parentId || null,
    });

    await newComment.save();

    // Push comment to the post's comments array
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push(newComment._id);
    await post.save();

    // Populate author info for frontend
    await newComment.populate("author", "name avatar email");

    return res.status(201).json({ message: "Comment created", comment: newComment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const replyComment = (req, res) => {
  res.status(200).json({ message: "Reply comment" });
}