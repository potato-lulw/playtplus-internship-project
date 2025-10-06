// Users GET /api/v1/users/me profile of logged-in user
// Users PATCH /api/v1/users/me name, avatar, cover
// Users POST /api/v1/users/:id/follow follow user
// Users DELETE /api/v1/users/:id/follow unfollow user

export const getUser = (req, res) => {
    res.status(200).json({ message: "Get user" });
};

export const updateUser = (req, res) => {
    res.status(200).json({ message: "Update user" });
};

export const followUser = (req, res) => {
    res.status(200).json({ message: "Follow user" });
};

export const unfollowUser = (req, res) => {
    res.status(200).json({ message: "Unfollow user" });
};