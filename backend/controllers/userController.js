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

export const getAllUsers = async (req, res) => {
  try {
    const { _id } = req.user;
    const users = await User.find({ _id: { $ne: _id } }).select("-password").lean();
    return res.status(200).json({ message: "Users found", users });
  } catch (error) {
    console.error("Error getting users:", error.message || error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
};

// controllers/userController.js
export const updateUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name } = req.body;

    if (name) user.name = name;

    if (req.files?.avatar?.[0]) {
      user.avatar = req.files.avatar[0].path;
    }

    if (req.files?.cover?.[0]) {
      user.cover = req.files.cover[0].path;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile edited",
      user,
    });
  } catch (error) {
    console.error("Error editing profile:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
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
  } catch (error) {
    c
    console.log("Error getting follow list: ", error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};




