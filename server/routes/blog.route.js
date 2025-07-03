import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { createBlog } from "../controllers/blog.controller.js";
import { fetchAllBlogs } from "../controllers/blog.controller.js";
import { getBlogWithId } from "../controllers/blog.controller.js";
// import { updateBlog } from "../controllers/blog.controller.js";
// import { deleteBlog } from "../controllers/blog.controller.js";
// import upload from "../middlewares/multer.js";

const blogRouter = express.Router();

blogRouter.get("/fetchAllBlogs", fetchAllBlogs);
blogRouter.get("/:id", getBlogWithId);
// blogRouter.put("/:id", updateBlog);
// blogRouter.delete("/:id", verifyToken, deleteBlog);

export { blogRouter };
