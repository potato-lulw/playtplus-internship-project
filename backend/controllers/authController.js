// Auth POST /api/v1/auth/signup email, password → creates user (hash password)
// Auth POST /api/v1/auth/login email, password → sets HttpOnly JWT cookie
// Auth POST /api/v1/auth/logout clears cookie
import User from "../models/user.js";
import { createJWT } from "../utils/jwt.js";


export const signupUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name)
      return res.status(400).json({ message: "Missing fields" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = new User({ email, password, name });
    await user.save();

    // createJWT(res, user._id);
    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.log("Error Signing up new user:", error.message || error);
    res.status(500).json({ message: "Server error" });
  }
};


//TODO remove this controller 

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Missing email or password" });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User does not exist" });

    if (!(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const userForNextAuth = {
      _id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      cover: user.cover
    };


    res.status(200).json(userForNextAuth);

  } catch (error) {
    console.log("Error Logging in user: ", error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout user" });
  } catch (error) {
    console.log("Error Logging out user: ", error.message || error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }

  res.status(200).json({ message: "Logout user" });
};

export const oauthSync = async (req, res) => {
  try {
    const { email, name, avatar, password } = req.body;
    console.log(email, name, avatar);

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name, avatar, password, cover: "" });
      await user.save();
    }


    // else if (avatar && user.avatar !== avatar) {
    //   user.avatar = avatar;
    //   await user.save();
    // }

    res.status(200).json({
      message: "OAuth sync successful and JWT set",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        cover: user.cover || "",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to sync OAuth user" });
  }
};

