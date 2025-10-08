// Users GET /api/v1/users/me profile of logged-in user
// Users PATCH /api/v1/users/me name, avatar, cover
// Users POST /api/v1/users/:id/follow follow user
// Users DELETE /api/v1/users/:id/follow unfollow user

import User from "../models/user.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) return res.status(400).json({ message: "User ID is required" });

        const user = await User.findById(id)
            .select("-password")
            .lean();

        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ message: "User found", user });
    } catch (error) {
        console.error("Error getting user:", error.message || error);
        return res
            .status(500)
            .json({ message: "Server error", error: error.message || error });
    }
};

export const updateUser = (req, res) => {
    res.status(200).json({ message: "Update user" });
};

export const followUser = async (req, res) => {
  try {
    const { id } = req.params;  
    const { _id } = req.user;  

    if (!id) return res.status(400).json({ message: "User ID is required" });
    if (id === _id.toString())
      return res.status(400).json({ message: "You cannot follow yourself" });

    const currentUser = await User.findById(_id);
    const targetUser = await User.findById(id);

    if (!currentUser || !targetUser)
      return res.status(404).json({ message: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      //  UNFOLLOW
      await Promise.all([
        User.findByIdAndUpdate(_id, { $pull: { following: id } }),
        User.findByIdAndUpdate(id, { $pull: { followers: _id } }),
      ]);
      return res.status(200).json({ message: "User unfollowed", following: false });
    } else {
      //  FOLLOW
      await Promise.all([
        User.findByIdAndUpdate(_id, { $addToSet: { following: id } }),
        User.findByIdAndUpdate(id, { $addToSet: { followers: _id } }),
      ]);
      return res.status(200).json({ message: "User followed", following: true });
    }
  } catch (error) {
    console.error("Error following/unfollowing user:", error.message || error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
};

export const getFollowList = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password").lean();

        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ message: "Follow list", following: user.following });
    } catch (error) {c
        console.log("Error getting follow list: ", error.message || error);
        res.status(500).json({ message: "Server error", error: error.message || error });
    }
};


export const unfollowUser = (req, res) => {
    res.status(200).json({ message: "Unfollow user" });
};