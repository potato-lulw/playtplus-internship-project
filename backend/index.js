import express from "express";
import dotenv from 'dotenv'
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config()
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./utils/db.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
    credentials: true
}));
app.use(cookieParser());

connectDB();



app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/health', (req, res) => {
    res.status(200).send('OK');
})
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    
});