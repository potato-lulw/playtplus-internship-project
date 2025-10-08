import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "ompatil17072",
  api_key: process.env.CLOUDINARY_API_KEY || "313275268883979",
  api_secret: process.env.CLOUDINARY_API_SECRET || "N0SD5IIXpR-H0vHhVUHgAMyJTik",
});

export default cloudinary;
