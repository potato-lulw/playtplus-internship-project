import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protectedRoute = async (req, res, next) => {
  try {
    // Use the NextAuth cookie name
    const token = req.cookies["next-auth.session-token"] || req.cookies["__Secure-next-auth.session-token"];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token found" });
    }

    // Verify token using the same secret as NextAuth
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

    const user = await User.findById(decoded.user?.id || decoded.userID);

    if (!user) return res.status(401).json({ message: "Unauthorized - User not found" });

    req.user = {
      email: user.email,
      name: user.name,
      userID: user._id,
    };

    next();
  } catch (err) {
    console.error("Middleware error:", err);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};


export { protectedRoute };