// Posts POST /api/v1/createpost text, image → create post (example prefix retained)
// Posts GET /api/v1/posts paginated feed
// Posts POST /api/v1/posts/:id/like toggle like/dislike via payload {type: 'like'|'dislike'}
// Posts POST /api/v1/posts/:id/report reason
// Comments POST /api/v1/posts/:id/comments text → new comment
// Comments POST /api/v1/comments/:id/replies text → reply (optional/bonus)


export const createPost = (req, res) => {
    res.status(200).json({ message: "Create post" });
};

export const getPosts = (req, res) => {
    res.status(200).json({ message: "Get posts" });
}

export const likePost = (req, res) => {
    res.status(200).json({ message: "Like post" });
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