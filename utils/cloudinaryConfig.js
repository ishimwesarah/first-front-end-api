import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY|| '937777328999617',
    api_secret: process.env.CLOUD_API_SECRET|| '_cQ-4SrYsY90uKDaJRYCPo5LU-0',
});

export default cloudinary;