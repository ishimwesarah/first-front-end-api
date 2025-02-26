import express from "express";
import { createBlog, deleteBlogById, getAllBlog, getBlogById, updateBlogById, uploadMiddleware } from "../controllers/blogController.js";

const router = express.Router();

router.post("/createBlog", uploadMiddleware, createBlog);
router.post("/getBlogById/:id", getBlogById);
router.post("/getAllBlog", getAllBlog);
router.post("/deleteBlogById/:id", deleteBlogById);
router.post("/updateBlogById", uploadMiddleware, updateBlogById);

export default router;