// import jwt from 'jsonwebtoken';
// import { useReducer } from 'react';
// import User from '../models/user.js';

// import { getToken } from "next-auth/jwt";

// const protectedRoute = async (req, res, next) => {
//   try {
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });


//     if (!token) return res.status(401).json({ message: "Unauthorized - No token" });

//     const user = await User.findById(token.user?._id || token.userID);
//     if (!user) return res.status(401).json({ message: "Unauthorized - User not found" });

//     req.user = {
//       email: user.email,
//       name: user.name,
//       _id: user._id,
//       avatar: user.avatar,
//       cover: user.cover,
//     };

//     next();
//   } catch (err) {
//     console.error("Middleware error:", err);
//     res.status(401).json({ message: "Unauthorized - Invalid token" });
//   }
// };


// export { protectedRoute };



import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectedRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verify error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

export { protectedRoute };