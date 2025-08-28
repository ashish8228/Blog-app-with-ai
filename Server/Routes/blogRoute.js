import express from "express";
import { addBlog, addComment, deleteBlogbyId, getAllBlogs, getBlogById, getBlogComment, togglePublish } from "../Controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'), auth, addBlog)
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:blogId", getBlogById);
blogRouter.post("/delete", auth, deleteBlogbyId);
blogRouter.post("/toggle-publish", auth, togglePublish);
blogRouter.post("/add-comments", addComment);
blogRouter.get("/comments", getBlogComment);


export default blogRouter