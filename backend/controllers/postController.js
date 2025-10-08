// Posts POST /api/v1/createpost text, image → create post (example prefix retained)
// Posts GET /api/v1/posts paginated feed
// Posts POST /api/v1/posts/:id/like toggle like/dislike via payload {type: 'like'|'dislike'}
// Posts POST /api/v1/posts/:id/report reason
// Comments POST /api/v1/posts/:id/comments text → new comment
// Comments POST /api/v1/comments/:id/replies text → reply (optional/bonus)


import { Post } from "../models/post.js";

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

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {

    console.error("Error creating post:", JSON.stringify(error, Object.getOwnPropertyNames(error)) || error);
    res.status(500).json({ message: "Server error while creating post" });
  }
};


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("author", "name avatar email _id").populate("likes", "_id name avatar email").populate("dislikes", "_id");
    if (!posts) return res.status(404).json({ message: "No posts found" });
  res.status(200).json({ message: "Get posts", posts });
  } catch (error) {
    console.log("Error getting posts: ", error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }

}
export const getPostsByUserId = async (req, res) => {
  try {
    const {id} = req.params
    
    const posts = await Post.find({author: id}).sort({ createdAt: -1 }).populate("author", "name avatar email _id").populate("likes", "_id name avatar email").populate("dislikes", "_id name");
    if (!posts) return res.status(404).json({ message: "No posts found" });
  res.status(200).json({ message: "Get posts", posts });
  } catch (error) {
    console.log("Error getting posts: ", error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
}

export const likePost = async (req, res) => {
  try{
    const { id } = req.params;
    
    const { likerId } = req.body;
    const post = await Post.findById(id).populate("likes", "_id");
    if (!post) return res.status(404).json({ message: "Post not found" });
    if(post.likes.includes(likerId)) {
      post.likes.pull(likerId);
      await post.save();
      res.status(200).json({ message: "Post unliked", post });
    }
    else {
      if(post.dislikes.includes(likerId)) {
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
    const {id} = req.params;
    const {likerId} = req.body;
    const post = await Post.findById(id).populate("dislikes", "_id");
    if (!post) return res.status(404).json({ message: "Post not found" });
    if(post.dislikes.includes(likerId)) {
      post.dislikes.pull(likerId);
      await post.save();
      res.status(200).json({ message: "Post undisliked", post });
    } else {
      if(post.likes.includes(likerId)) {
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




export const reportPost = (req, res) => {
  res.status(200).json({ message: "Report post" });
}

export const createComment = (req, res) => {
  res.status(200).json({ message: "Create comment" });
}

export const replyComment = (req, res) => {
  res.status(200).json({ message: "Reply comment" });
}