import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decode.userID).select('isAdmin email');
            req.user = {
                email: user.email,
                isAdmin: user.isAdmin,
                userID: decode.userID,
            }
            next();
        }
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized - This is a protected route' });
    }
}


export { protectedRoute };