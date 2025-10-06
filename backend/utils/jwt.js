import jwt from "jsonwebtoken";

export const createJWT = (res, id) => {
    const token = jwt.sign({userID:id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge:  7 * 24 * 60 * 60 * 1000, // 7 day
    });
    
}